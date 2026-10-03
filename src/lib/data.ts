import { cache } from "react";
import { groq } from "next-sanity";
import {
  checkGroupIconKeys,
  conditionIconKeys,
  defaultHome,
  defaultInstallation,
  defaultMaintenance,
  defaultRepair,
  defaultServiceContent,
  fallbackFaqs,
  homeIconKeys,
  servicePageTypes,
  type HomeContent,
  type InstallationContent,
  type MaintenanceContent,
  type Photo,
  type RepairContent,
  type ServiceBaseContent,
  type ServiceSlug,
  type Step,
} from "@/lib/content";
import { defaultSettings, fillPrices, type SiteSettings } from "@/lib/site";
import { client, SANITY_TAG } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { toPhoto, type SanityImage } from "@/sanity/image";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

// Tag for on-demand revalidation (webhook); the hourly revalidate is a safety net.
// In development the webhook can't reach localhost, so always fetch fresh.
const fetchOptions = {
  next: {
    tags: [SANITY_TAG],
    revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
  },
};

const settingsQuery = groq`*[_type == "siteSettings"][0]{
  phone, email, address, orgNr, isAvailable, availableText, offshoreText,
  footerTagline, installPrice, servicePrice, serviceDiscountPercent
}`;

const faqQuery = groq`*[_type == "faqItem" && published != false] | order(orderRank asc){
  "id": _id, question, answer
}`;

const singletonQuery = groq`*[_type == $type][0]`;

const summariesQuery = groq`*[_type in $types]{ _type, summary }`;

type SettingsDoc = Partial<{
  phone: string;
  email: string;
  address: string;
  orgNr: string;
  isAvailable: boolean;
  availableText: string;
  offshoreText: string;
  footerTagline: string;
  installPrice: number;
  servicePrice: number;
  serviceDiscountPercent: number;
}> | null;

/** Loose shape of a document from Sanity: any field may be missing. */
type Doc = Record<string, unknown> | null;

async function fetchSafe<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, fetchOptions);
  } catch {
    return null;
  }
}

// --- Field helpers: every value falls back to the default when empty ---

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function strings(value: unknown, fallback: string[]) {
  const items = Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && !!item.trim())
    : [];
  return items.length ? items : fallback;
}

function objects<T>(value: unknown, fallback: T[], map: (item: Record<string, unknown>) => T | null) {
  const items = Array.isArray(value)
    ? value.flatMap((item) => {
        const mapped = item && typeof item === "object" ? map(item) : null;
        return mapped ? [mapped] : [];
      })
    : [];
  return items.length ? items : fallback;
}

function icon<K extends string>(value: unknown, keys: readonly K[]): K {
  return keys.includes(value as K) ? (value as K) : keys[0];
}

function step(item: Record<string, unknown>): Step | null {
  const { title, body } = item;
  return typeof title === "string" && title.trim() && typeof body === "string" && body.trim()
    ? { title, body }
    : null;
}

function photo(value: unknown, fallback: Photo) {
  return toPhoto(value as SanityImage, fallback);
}

function photos(value: unknown, fallback: Photo[]) {
  const items = Array.isArray(value)
    ? value.filter((item: SanityImage) => item?.asset?._ref)
    : [];
  if (!items.length) return fallback;
  return items.map((item, index) => photo(item, fallback[index] ?? fallback[0]));
}

// --- Settings and FAQ ---

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const doc = await fetchSafe<SettingsDoc>(settingsQuery);
  if (!doc) return defaultSettings;
  return {
    phone: doc.phone ?? defaultSettings.phone,
    email: doc.email ?? defaultSettings.email,
    address: doc.address ?? defaultSettings.address,
    org_nr: doc.orgNr ?? defaultSettings.org_nr,
    is_available: doc.isAvailable ?? defaultSettings.is_available,
    available_text: text(doc.availableText, defaultSettings.available_text),
    offshore_text: text(doc.offshoreText, defaultSettings.offshore_text),
    footer_tagline: text(doc.footerTagline, defaultSettings.footer_tagline),
    install_price: doc.installPrice ?? defaultSettings.install_price,
    service_price: doc.servicePrice ?? defaultSettings.service_price,
    service_discount_percent:
      doc.serviceDiscountPercent ?? defaultSettings.service_discount_percent,
  };
});

export async function getFaqs(): Promise<FaqItem[]> {
  const [items, settings] = await Promise.all([
    fetchSafe<FaqItem[]>(faqQuery),
    getSiteSettings(),
  ]);
  return (items?.length ? items : fallbackFaqs).map((item) => ({
    ...item,
    answer: fillPrices(item.answer, settings),
  }));
}

// --- Forside ---

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const doc = await fetchSafe<Doc>(singletonQuery, { type: "homePage" });
  const d = defaultHome;
  if (!doc) return d;
  return {
    heroHeadingLead: text(doc.heroHeadingLead, d.heroHeadingLead),
    heroHeadingMain: text(doc.heroHeadingMain, d.heroHeadingMain),
    heroIntro: text(doc.heroIntro, d.heroIntro),
    trustPoints: objects(doc.trustPoints, d.trustPoints, ({ label, icon: key }) =>
      typeof label === "string" && label.trim()
        ? { label, icon: icon(key, homeIconKeys) }
        : null,
    ),
    heroPhoto: photo(doc.heroPhoto, d.heroPhoto),
    aboutHeading: text(doc.aboutHeading, d.aboutHeading),
    aboutBody: text(doc.aboutBody, d.aboutBody),
    aboutPhoto: photo(doc.aboutPhoto, d.aboutPhoto),
    whyMe: objects(doc.whyMe, d.whyMe, (item) => {
      const s = step(item);
      return s ? { ...s, icon: icon(item.icon, homeIconKeys) } : null;
    }),
    otherIntro: text(doc.otherIntro, d.otherIntro),
    otherTags: strings(doc.otherTags, d.otherTags),
    otherPhotos: photos(doc.otherPhotos, d.otherPhotos),
    ctaEyebrow: text(doc.ctaEyebrow, d.ctaEyebrow),
    ctaHeading: text(doc.ctaHeading, d.ctaHeading),
  };
});

// --- Tjenester ---

function serviceBase(doc: NonNullable<Doc>, d: ServiceBaseContent): ServiceBaseContent {
  return {
    summary: text(doc.summary, d.summary),
    heroHeading: text(doc.heroHeading, d.heroHeading),
    heroPoints: strings(doc.heroPoints, d.heroPoints),
    heroPhoto: photo(doc.heroPhoto, d.heroPhoto),
    stepsTitle: text(doc.stepsTitle, d.stepsTitle),
    steps: objects(doc.steps, d.steps, step),
  };
}

const fetchServiceDoc = (slug: ServiceSlug) =>
  fetchSafe<Doc>(singletonQuery, { type: servicePageTypes[slug] });

export const getInstallationContent = cache(async (): Promise<InstallationContent> => {
  const doc = await fetchServiceDoc("montering");
  const d = defaultInstallation;
  if (!doc) return d;
  return {
    ...serviceBase(doc, d),
    included: strings(doc.included, d.included),
    parts: strings(doc.parts, d.parts),
    excluded: strings(doc.excluded, d.excluded),
    conditions: objects(doc.conditions, d.conditions, (item) => {
      const s = step(item);
      return s ? { ...s, icon: icon(item.icon, conditionIconKeys) } : null;
    }),
  };
});

export const getMaintenanceContent = cache(async (): Promise<MaintenanceContent> => {
  const doc = await fetchServiceDoc("service");
  const d = defaultMaintenance;
  if (!doc) return d;
  const tip = (value: unknown, fallback: Step): Step =>
    (value && typeof value === "object"
      ? step(value as Record<string, unknown>)
      : null) ?? fallback;
  return {
    ...serviceBase(doc, d),
    checkGroups: objects(doc.checkGroups, d.checkGroups, ({ title, icon: key, items }) => {
      const points = strings(items, []);
      return typeof title === "string" && title.trim() && points.length
        ? { title, icon: icon(key, checkGroupIconKeys), items: points }
        : null;
    }),
    tipIndoor: tip(doc.tipIndoor, d.tipIndoor),
    tipOutdoor: tip(doc.tipOutdoor, d.tipOutdoor),
  };
});

export const getRepairContent = cache(async (): Promise<RepairContent> => {
  const doc = await fetchServiceDoc("reparasjon");
  const d = defaultRepair;
  if (!doc) return d;
  return {
    ...serviceBase(doc, d),
    repairPoints: strings(doc.repairPoints, d.repairPoints),
    replacePoints: strings(doc.replacePoints, d.replacePoints),
    examples: strings(doc.examples, d.examples),
  };
});

/** Short descriptions for the service cards (Forside, Tjenester, related services). */
export const getServiceSummaries = cache(
  async (): Promise<Record<ServiceSlug, string>> => {
    const docs = await fetchSafe<{ _type: string; summary?: string }[]>(
      summariesQuery,
      { types: Object.values(servicePageTypes) },
    );
    const slugs = Object.keys(servicePageTypes) as ServiceSlug[];
    return Object.fromEntries(
      slugs.map((slug) => {
        const doc = docs?.find((item) => item._type === servicePageTypes[slug]);
        return [slug, text(doc?.summary, defaultServiceContent[slug].summary)];
      }),
    ) as Record<ServiceSlug, string>;
  },
);
