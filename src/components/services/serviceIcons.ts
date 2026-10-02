import { Drill, Gauge, Wrench, type LucideIcon } from "lucide-react";
import type { serviceNav } from "@/lib/content";

export type ServiceSlug = (typeof serviceNav)[number]["slug"];

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  montering: Drill,
  service: Gauge,
  reparasjon: Wrench,
};
