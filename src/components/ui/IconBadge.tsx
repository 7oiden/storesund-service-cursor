import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  forest: "bg-forest/10 text-forest",
  copper: "bg-copper/10 text-copper",
  dark: "bg-white/10 text-cream ring-1 ring-white/10",
} as const;

const sizes = {
  sm: { box: "size-7 rounded-full", icon: 14 },
  md: { box: "size-11 rounded-2xl", icon: 20 },
  lg: { box: "size-14 rounded-2xl", icon: 24 },
} as const;

export function IconBadge({
  icon: Icon,
  tone = "forest",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        tones[tone],
        sizes[size].box,
        className,
      )}
    >
      <Icon size={sizes[size].icon} strokeWidth={1.75} />
    </span>
  );
}
