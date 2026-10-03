import { Award, Clock, Layers, ReceiptText, type LucideIcon } from "lucide-react";
import type { HomeIcon } from "@/lib/content";

export const homeIcons: Record<HomeIcon, LucideIcon> = {
  price: ReceiptText,
  range: Layers,
  time: Clock,
  experience: Award,
};
