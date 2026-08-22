import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const word = inverted ? "text-cream" : "text-ink";
  const mark = inverted ? "text-cream/70" : "text-forest";

  return (
    <Link href="/" className="group inline-flex items-center gap-1.5 leading-none">
      <Image
        src={inverted ? "/logo-mark-inverted.png" : "/logo-mark.png"}
        alt=""
        width={195}
        height={130}
        className="h-6 w-auto shrink-0 sm:h-7 lg:h-9"
        priority
        unoptimized
      />
      <span className="inline-flex items-baseline">
        <span className={`display text-xl tracking-tight lg:text-3xl ${word}`}>
          Stores
        </span>
        <span className="flex flex-col items-start">
          <span className={`display text-xl tracking-tight lg:text-3xl ${word}`}>
            und
          </span>
          <span
            className={`-mt-1 text-[11px] font-extrabold uppercase leading-none tracking-[0.22em] lg:text-xs ${mark}`}
          >
            Service
          </span>
        </span>
      </span>
    </Link>
  );
}
