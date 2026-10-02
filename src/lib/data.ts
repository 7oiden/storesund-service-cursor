import { groq } from "next-sanity";
import { fallbackFaqs } from "@/lib/content";
import { defaultSettings, type SiteSettings } from "@/lib/site";
import { client, SANITY_TAG } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

// Tag for on-demand revalidation (webhook); the hourly revalidate is a safety net.
const fetchOptions = { next: { tags: [SANITY_TAG], revalidate: 3600 } };

const settingsQuery = groq`*[_type == "siteSettings"][0]{
  phone, email, address, orgNr, isAvailable, availabilityNote,
  installPrice, servicePrice, serviceDiscountPercent
}`;

const faqQuery = groq`*[_type == "faqItem" && published != false] | order(orderRank asc){
  "id": _id, question, answer
}`;

type SettingsDoc = Partial<{
  phone: string;
  email: string;
  address: string;
  orgNr: string;
  isAvailable: boolean;
  availabilityNote: string;
  installPrice: number;
  servicePrice: number;
  serviceDiscountPercent: number;
}> | null;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return defaultSettings;
  try {
    const doc = await client.fetch<SettingsDoc>(settingsQuery, {}, fetchOptions);
    if (!doc) return defaultSettings;
    return {
      phone: doc.phone ?? defaultSettings.phone,
      email: doc.email ?? defaultSettings.email,
      address: doc.address ?? defaultSettings.address,
      org_nr: doc.orgNr ?? defaultSettings.org_nr,
      is_available: doc.isAvailable ?? defaultSettings.is_available,
      availability_note: doc.availabilityNote ?? defaultSettings.availability_note,
      install_price: doc.installPrice ?? defaultSettings.install_price,
      service_price: doc.servicePrice ?? defaultSettings.service_price,
      service_discount_percent:
        doc.serviceDiscountPercent ?? defaultSettings.service_discount_percent,
    };
  } catch {
    return defaultSettings;
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  if (!sanityConfigured) return fallbackFaqs;
  try {
    const items = await client.fetch<FaqItem[]>(faqQuery, {}, fetchOptions);
    return items?.length ? items : fallbackFaqs;
  } catch {
    return fallbackFaqs;
  }
}
