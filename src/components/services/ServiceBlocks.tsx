import { photos } from "@/lib/site";
import type { SiteSettings } from "@/lib/site";
import { formatNok } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { Photo } from "@/components/ui/Photo";

export function ServiceHero({
  title,
  heading,
  points,
  image,
  price,
}: {
  title: string;
  heading: string;
  points: string[];
  image: keyof typeof photos;
  price?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <GreenWash />
      <Container className="relative grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Tjenester
          </p>
          <h1 className="display mt-3 text-5xl leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-cream/80">
            {heading}
          </p>
          <ul className="mt-8 space-y-3 text-sm leading-6 text-cream/70">
            {points.map((point) => (
              <li key={point} className="border-l border-white/20 pl-4">
                {point}
              </li>
            ))}
          </ul>
          {price ? (
            <p className="mt-8 text-sm font-semibold text-cream">
              {price}
            </p>
          ) : null}
          <ButtonLink href="/kontakt" variant="copper" className="mt-8">
            Be om time
          </ButtonLink>
        </div>
        <Photo
          src={photos[image]}
          alt={`${title} av varmepumpe`}
          className="aspect-[5/4] rounded-[2rem]"
        />
      </Container>
    </section>
  );
}

export function Checklist({
  title,
  items,
  tone = "include",
}: {
  title: string;
  items: readonly string[];
  tone?: "include" | "exclude";
}) {
  return (
    <section className="rounded-3xl border border-line bg-cream p-7">
      <h2 className="display text-2xl text-ink">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
            <span
              className={
                tone === "exclude" ? "mt-1 text-copper" : "mt-1 text-forest"
              }
            >
              {tone === "exclude" ? "–" : "✓"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PriceBar({
  settings,
  kind,
}: {
  settings: SiteSettings;
  kind: "install" | "service" | "repair";
}) {
  const copy = {
    install: {
      label: "Fast pris for standard montering",
      value: `${formatNok(settings.install_price)} inkl. mva`,
    },
    service: {
      label: "Fast pris for standard service",
      value: `${formatNok(settings.service_price)} inkl. mva`,
    },
    repair: {
      label: "Reparasjon prissettes etter feilsøking",
      value: "Gratis befaring og estimat",
    },
  }[kind];

  return (
    <div className="flex flex-col justify-between gap-3 rounded-3xl bg-ink px-7 py-6 text-cream sm:flex-row sm:items-center">
      <p className="text-sm text-cream/70">{copy.label}</p>
      <p className="display text-2xl">{copy.value}</p>
    </div>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="rounded-3xl bg-forest-deep p-7 text-cream">
      <h3 className="display text-2xl">{title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-cream/75">
        {children}
      </div>
    </aside>
  );
}
