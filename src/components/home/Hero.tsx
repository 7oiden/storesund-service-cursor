import {
  ArrowRight,
  Award,
  BadgeCheck,
  Clock,
  Mail,
  Phone,
  ReceiptText,
} from "lucide-react";
import { hugoAvailabilityNote, photos, type SiteSettings } from "@/lib/site";
import { cn, formatPhone, telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { Photo } from "@/components/ui/Photo";

const trustPoints = [
  { icon: Award, label: "20+ år erfaring" },
  { icon: ReceiptText, label: "Fastpris på standard" },
  { icon: Clock, label: "Kveldsbesøk uten tillegg" },
];

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <GreenWash />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">
            <BadgeCheck size={14} />
            f-gass sertifisert
          </div>
          <h1 className="display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="mb-3 block text-[0.5em] leading-[1.15]">
              Montasje, service
              <br />
              og reparasjon av
            </span>
            <span className="[text-shadow:0.05em_0.05em_0_var(--color-forest)]">
              varmepumper.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-cream/75 sm:text-lg">
            Fastpris på standard jobber, hjemmebesøk etter arbeidstid, og ærlige
            råd når reparasjon lønner seg mer enn å bytte.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/kontakt" variant="copper">
              Be om time
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/tjenester" variant="secondary">
              Se tjenester
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon size={16} strokeWidth={1.75} className="text-cream/55" />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-cream/70">
            <a
              href={telHref(settings.phone)}
              className="inline-flex items-center gap-2 hover:text-cream"
            >
              <Phone size={15} strokeWidth={1.75} />
              {formatPhone(settings.phone)}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center gap-2 hover:text-cream"
            >
              <Mail size={15} strokeWidth={1.75} />
              {settings.email}
            </a>
          </div>
        </div>
        <div className="relative">
          <Photo
            src={photos.hero}
            alt="Bolig der en varmepumpe kan monteras"
            className="aspect-[4/5] rounded-3xl"
            priority
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-cream/95 p-4 text-ink shadow-lg">
            <p
              className={cn(
                "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]",
                settings.is_available ? "text-forest" : "text-copper",
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full bg-current",
                  settings.is_available && "pulse-dot",
                )}
              />
              {settings.is_available ? "I land og tilgjengelig" : "Offshore nå"}
            </p>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              {hugoAvailabilityNote(settings.is_available)}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
