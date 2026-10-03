import { formatNok } from "./utils";

export type SiteSettings = {
  phone: string;
  email: string;
  address: string;
  org_nr: string;
  is_available: boolean;
  available_text: string;
  offshore_text: string;
  footer_tagline: string;
  install_price: number;
  service_price: number;
  service_discount_percent: number;
};

/** Public origin for sitemap and robots. Set NEXT_PUBLIC_SITE_URL at launch. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Status copy shown in the public header. */
export const availabilityStatusText = {
  available: "Tilgjengelig for oppdrag",
  unavailable: "Offshore – svarer på e-post/kontaktskjema",
} as const;

export function availabilityStatusLabel(available: boolean) {
  return available
    ? availabilityStatusText.available
    : availabilityStatusText.unavailable;
}

export function availabilityNote(settings: SiteSettings) {
  return settings.is_available ? settings.available_text : settings.offshore_text;
}

/** Replaces {monteringspris}, {servicepris} and {rabatt} with current prices. */
export function fillPrices(text: string, settings: SiteSettings) {
  return text
    .replaceAll("{monteringspris}", formatNok(settings.install_price))
    .replaceAll("{servicepris}", formatNok(settings.service_price))
    .replaceAll("{rabatt}", `${settings.service_discount_percent} %`);
}

export const defaultSettings: SiteSettings = {
  phone: "90659303",
  email: "hugo.storesund@gmail.com",
  address: "Lyngvegen 4a, 5382 Skogsvåg",
  org_nr: "977314194",
  is_available: true,
  available_text:
    "På grunn av turnusarbeid offshore vil jeg ikke alltid være tilgjengelig på telefon. Jeg er for tiden i land og vil være tilgjengelig på telefon i tillegg til e-post og kontaktskjema.",
  offshore_text:
    "På grunn av turnusarbeid offshore vil jeg ikke alltid være tilgjengelig på telefon. Jeg er for tiden offshore og vil kun være tilgjengelig via e-post og kontaktskjema.",
  footer_tagline:
    "Montering, service og reparasjon av varmepumper og klimaanlegg i Bergen og omegn.",
  install_price: 3750,
  service_price: 1300,
  service_discount_percent: 10,
};
