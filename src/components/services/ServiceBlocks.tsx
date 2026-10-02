import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Minus,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { serviceNav } from "@/lib/content";
import { photos, type SiteSettings } from "@/lib/site";
import { cn, formatPhone, telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container, SectionHeading } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { IconBadge } from "@/components/ui/IconBadge";
import { Photo } from "@/components/ui/Photo";
import { ServiceCard, servicePrices } from "./ServiceCard";
import { serviceIcons, type ServiceSlug } from "./serviceIcons";

/** Anchor for the "what's included" section, linked from the hero. */
export const DETAILS_ID = "inkludert";

function serviceBySlug(slug: ServiceSlug) {
  return serviceNav.find((service) => service.slug === slug)!;
}

export function ServiceHero({
  slug,
  heading,
  points,
  image,
  badge,
  detailsLabel = "Se hva som inngår",
}: {
  slug: ServiceSlug;
  heading: string;
  points: string[];
  image: keyof typeof photos;
  badge: { label: string; value: string };
  detailsLabel?: string;
}) {
  const { label } = serviceBySlug(slug);

  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <GreenWash />
      <Container className="relative grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <nav
            aria-label="Brødsmulesti"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/50"
          >
            <Link href="/tjenester" className="transition hover:text-cream">
              Tjenester
            </Link>
            <ChevronRight size={14} aria-hidden />
            <span aria-current="page" className="text-cream/80">
              {label}
            </span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <IconBadge icon={serviceIcons[slug]} tone="dark" size="lg" />
            <h1 className="display text-5xl leading-tight sm:text-6xl">
              {label}.
            </h1>
          </div>
          <p className="mt-5 max-w-xl text-lg leading-8 text-cream/85">
            {heading}
          </p>
          <ul className="mt-7 space-y-3 text-sm leading-6 text-cream/70">
            {points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream">
                  <Check size={12} strokeWidth={2.5} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex flex-col rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 backdrop-blur-sm">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/55">
              {badge.label}
            </span>
            <span className="display mt-0.5 text-2xl text-cream sm:text-3xl">
              {badge.value}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/kontakt" variant="copper">
              Be om time
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href={`#${DETAILS_ID}`} variant="secondary">
              {detailsLabel}
              <ArrowDown size={16} />
            </ButtonLink>
          </div>
        </div>
        <div className="relative">
          <Photo
            src={photos[image]}
            alt={`${label} av varmepumpe`}
            className="aspect-[5/4] rounded-[2rem]"
            priority
          />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-2xl bg-cream/95 px-4 py-3 text-ink shadow-lg sm:bottom-5 sm:left-5">
            <IconBadge icon={BadgeCheck} size="sm" />
            <p className="text-sm leading-5">
              <span className="font-semibold">f-gass kategori I</span>
              <span className="text-ink-soft"> · 20+ års erfaring</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FactStrip({
  facts,
}: {
  facts: { value: string; label: string }[];
}) {
  return (
    <section className="border-b border-line bg-cream">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={cn(
                "flex flex-col-reverse gap-1 py-7 sm:py-9",
                index % 2 === 1 && "border-l border-line pl-5 sm:pl-8",
                index > 0 && "lg:border-l lg:border-line lg:pl-8",
                index > 1 && "border-t border-line lg:border-t-0",
              )}
            >
              <dt className="text-sm leading-5 text-ink-soft">{fact.label}</dt>
              <dd className="display text-3xl text-forest sm:text-4xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="reveal rounded-3xl border border-line bg-cream p-7">
      <IconBadge icon={icon} />
      <h3 className="display mt-5 text-xl text-ink">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-ink-soft">{children}</div>
    </article>
  );
}

export function ProcessSteps({
  eyebrow = "Slik foregår det",
  title,
  steps,
}: {
  eyebrow?: string;
  title: string;
  steps: readonly { title: string; body: string }[];
}) {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="reveal">
              <div className="flex items-center gap-4">
                <span className="display inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-copper/30 bg-copper/10 text-lg text-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-linear-to-r from-copper/30 to-line lg:block"
                  />
                ) : null}
              </div>
              <h3 className="display mt-5 text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function CheckList({
  items,
  columns = 1,
  className,
}: {
  items: readonly string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-3",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
            <Check size={12} strokeWidth={2.5} aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Checklist({
  title,
  items,
  tone = "include",
  columns = 1,
  icon,
}: {
  title: string;
  items: readonly string[];
  tone?: "include" | "exclude";
  columns?: 1 | 2;
  icon?: LucideIcon;
}) {
  if (tone === "exclude") {
    return (
      <section className="rounded-3xl border border-line border-l-4 border-l-copper bg-paper p-6 sm:p-7">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
          {title}
        </h2>
        <ul className="mt-4 space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-ink-soft">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-copper/10 text-copper">
                <Minus size={12} strokeWidth={2.5} aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="reveal rounded-3xl border border-line bg-cream p-7">
      <div className="flex items-center gap-3">
        {icon ? <IconBadge icon={icon} /> : null}
        <h2 className="display text-2xl text-ink">{title}</h2>
      </div>
      <CheckList items={items} columns={columns} className="mt-5" />
    </section>
  );
}

export function PriceAside({
  label,
  value,
  note,
  points,
  settings,
}: {
  label: string;
  value: string;
  note?: string;
  points: string[];
  settings: SiteSettings;
}) {
  return (
    <aside className="relative self-start overflow-hidden rounded-3xl bg-forest-deep p-7 text-cream lg:sticky lg:top-24">
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/55">
          {label}
        </p>
        <p className="display mt-2 text-4xl">{value}</p>
        {note ? <p className="mt-1 text-sm text-cream/60">{note}</p> : null}
        <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm leading-6 text-cream/80">
          {points.map((point) => (
            <li key={point} className="flex gap-3">
              <Check
                size={16}
                strokeWidth={2.25}
                aria-hidden
                className="mt-1 shrink-0 text-leaf"
              />
              {point}
            </li>
          ))}
        </ul>
        <ButtonLink href="/kontakt" variant="copper" className="mt-7 w-full">
          Be om time
          <ArrowRight size={16} />
        </ButtonLink>
        <a
          href={telHref(settings.phone)}
          className="mt-4 flex items-center justify-center gap-2 text-sm text-cream/70 transition hover:text-cream"
        >
          <Phone size={15} strokeWidth={1.75} aria-hidden />
          {formatPhone(settings.phone)}
        </a>
      </div>
    </aside>
  );
}

export function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <aside className="reveal relative overflow-hidden rounded-3xl bg-forest-deep p-7 text-cream">
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <div className="flex items-center gap-3">
          {icon ? <IconBadge icon={icon} tone="dark" /> : null}
          <h3 className="display text-2xl">{title}</h3>
        </div>
        <div className="mt-4 space-y-3 text-sm leading-6 text-cream/75">
          {children}
        </div>
      </div>
    </aside>
  );
}

export function RelatedServices({
  current,
  settings,
}: {
  current: ServiceSlug;
  settings: SiteSettings;
}) {
  const prices = servicePrices(settings);

  return (
    <section className="pt-16 lg:pt-24">
      <Container>
        <SectionHeading eyebrow="Andre tjenester" title="Trenger du noe mer?" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {serviceNav
            .filter((service) => service.slug !== current)
            .map((service) => (
              <ServiceCard
                key={service.href}
                service={service}
                price={prices[service.slug]}
              />
            ))}
        </div>
      </Container>
    </section>
  );
}
