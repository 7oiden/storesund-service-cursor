import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const word = inverted ? "text-cream" : "text-ink";
  const mark = inverted ? "text-cream/70" : "text-forest";

  return (
    <Link
      href="/"
      aria-label="Storesund Service"
      className="group inline-flex items-center gap-2 leading-none lg:gap-2.5"
    >
      <Image
        src={inverted ? "/logo-mark-inverted.png" : "/logo-mark.png"}
        alt=""
        width={195}
        height={130}
        className="h-6 w-auto shrink-0 lg:h-7"
        priority
        unoptimized
      />
      <span
        className="inline-flex items-baseline gap-1.5 whitespace-nowrap font-sans text-lg leading-none tracking-[-0.02em] lg:text-[1.375rem]"
        aria-hidden="true"
      >
        <span className={`font-bold ${word}`}>Storesund</span>
        <span className={`font-medium ${mark}`}>Service</span>
      </span>
    </Link>
  );
}
