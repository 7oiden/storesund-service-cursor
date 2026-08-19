import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const publicPaths = [
  "/",
  "/tjenester",
  "/tjenester/montering",
  "/tjenester/service",
  "/tjenester/reparasjon",
  "/kontakt",
  "/serviceavtale",
  "/personvern",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, `${siteUrl}/`).href,
  }));
}
