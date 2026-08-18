import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="group flex items-baseline gap-2">
      <span
        className={`display text-xl tracking-tight ${inverted ? "text-cream" : "text-ink"}`}
      >
        Storesund
      </span>
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${inverted ? "text-cream/70" : "text-forest"}`}
      >
        Service
      </span>
    </Link>
  );
}
