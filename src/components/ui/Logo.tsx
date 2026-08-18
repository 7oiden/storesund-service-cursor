import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const word = inverted ? "text-cream" : "text-ink";
  const mark = inverted ? "text-cream/70" : "text-forest";

  return (
    <Link href="/" className="group inline-flex items-baseline leading-none">
      <span className={`display text-xl tracking-tight lg:text-3xl ${word}`}>
        Stores
      </span>
      <span className="flex flex-col items-start">
        <span className={`display text-xl tracking-tight lg:text-3xl ${word}`}>
          und
        </span>
        <span
          className={`-mt-1 text-[11px] font-bold uppercase leading-none tracking-[0.22em] lg:text-xs ${mark}`}
        >
          Service
        </span>
      </span>
    </Link>
  );
}
