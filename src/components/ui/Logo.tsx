import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const word = inverted ? "text-cream" : "text-ink";
  const mark = inverted ? "text-cream/70" : "text-forest";

  return (
    <Link href="/" className="group inline-flex items-center gap-1 leading-none">
      <LogoMark inverted={inverted} className="h-8 w-auto shrink-0 lg:h-10" />
      <span className="inline-flex items-baseline">
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
      </span>
    </Link>
  );
}

function LogoMark({
  inverted,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  const ring = inverted ? "text-cream" : "text-forest";
  const accent = "text-moss";

  return (
    <svg
      viewBox="0 0 51 40"
      fill="none"
      aria-hidden
      className={cn(className)}
    >
      <g className={ring}>
        <path
          d="M6.8 14.2A15 15 0 0 1 33.2 14.2"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path
          d="M6.8 25.8A15 15 0 0 0 33.2 25.8"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <rect x="11" y="15.15" width="11" height="1.7" rx="0.85" fill="currentColor" />
        <rect x="11" y="18.05" width="11" height="1.7" rx="0.85" fill="currentColor" />
        <rect x="11" y="20.95" width="11" height="1.7" rx="0.85" fill="currentColor" />
        <rect x="11" y="23.85" width="11" height="1.7" rx="0.85" fill="currentColor" />
      </g>
      <g className={accent}>
        <path
          d="M13.6 20c0-4.4-3.2-7.2-6.8-7C4 13.2 2.4 16.2 3 20c-.6 3.8 1 6.8 3.8 7 3.6.2 6.8-2.6 6.8-7Z"
          fill="currentColor"
        />
        <path
          d="M11.4 20c-2.2-.2-4.4-1-5.8-2.6"
          stroke={inverted ? "#0e3a29" : "#faf8f3"}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <rect x="21.5" y="15.15" width="28.5" height="1.7" rx="0.85" fill="currentColor" />
        <rect x="21.5" y="18.05" width="28.5" height="1.7" rx="0.85" fill="currentColor" />
        <rect x="21.5" y="20.95" width="28.5" height="1.7" rx="0.85" fill="currentColor" />
        <rect x="21.5" y="23.85" width="28.5" height="1.7" rx="0.85" fill="currentColor" />
      </g>
    </svg>
  );
}
