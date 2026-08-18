import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${dark ? "text-cream/50" : "text-forest"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`display text-3xl leading-tight sm:text-4xl ${dark ? "text-cream" : "text-ink"}`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-4 text-base leading-7 ${dark ? "text-cream/70" : "text-ink-soft"}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
