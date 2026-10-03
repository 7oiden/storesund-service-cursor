import { Drill, Gauge, Wrench, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/lib/content";

export type { ServiceSlug };

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  montering: Drill,
  service: Gauge,
  reparasjon: Wrench,
};
