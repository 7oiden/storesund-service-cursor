import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { serviceNav } from "@/lib/content";
import { getSiteSettings } from "@/lib/data";
import { availabilityStatusLabel } from "@/lib/site";
import { cn, formatPhone, telHref } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { serviceIcons } from "@/components/services/serviceIcons";

const linkClass =
  "group inline-flex items-center gap-2.5 text-cream/75 transition hover:text-cream";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/45">
      {children}
    </h3>
  );
}

function LinkIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Icon
      size={15}
      strokeWidth={1.75}
      aria-hidden
      className="shrink-0 text-cream/45 transition group-hover:text-copper"
    />
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
      {children}
      <ArrowUpRight
        size={14}
        aria-hidden
        className="text-cream/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream"
      />
    </a>
  );
}

export async function Footer() {
  const settings = await getSiteSettings();
  const available = settings.is_available;

  return (
    <footer className="relative mt-auto overflow-hidden bg-forest-deep text-cream">
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[22rem] rounded-full border border-white/10"
      />

      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-6 text-cream/70">
            {settings.footer_tagline}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-cream/85">
            <span
              className={cn(
                "size-2 rounded-full bg-current",
                available ? "pulse-dot text-leaf" : "text-copper",
              )}
            />
            {availabilityStatusLabel(available)}
          </p>
        </div>

        <div>
          <FooterHeading>Tjenester</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceNav.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className={linkClass}>
                  <LinkIcon icon={serviceIcons[service.slug]} />
                  {service.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/serviceavtale" className={linkClass}>
                <LinkIcon icon={CalendarCheck} />
                Serviceavtale
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>Kontakt</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={telHref(settings.phone)} className={linkClass}>
                <LinkIcon icon={Phone} />
                {formatPhone(settings.phone)}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className={cn(linkClass, "break-all")}>
                <LinkIcon icon={Mail} />
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-cream/75">
              <MapPin
                size={15}
                strokeWidth={1.75}
                aria-hidden
                className="mt-0.5 shrink-0 text-cream/45"
              />
              {settings.address}
            </li>
            <li className="pl-[1.6rem]">
              <ExternalLink
                href={`https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=${settings.org_nr}`}
              >
                Org.nr. {settings.org_nr}
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div>
          <FooterHeading>Nyttig</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/kontakt" className={linkClass}>
                Kontaktskjema
              </Link>
            </li>
            <li>
              <Link href="/kontakt#faq" className={linkClass}>
                Ofte stilte spørsmål
              </Link>
            </li>
            <li>
              <ExternalLink href="https://www.varmepumpeinfo.no">
                Nøytral info om varmepumper
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="http://www.minigraveren.com">
                Utleie av minigraver
              </ExternalLink>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Hugo Storesund
            {" · "}
            <Link href="/personvern" className="hover:text-cream">
              Personvernerklæring
            </Link>
          </p>
          <p className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 px-2.5 py-1 text-cream/65 sm:self-auto">
            <BadgeCheck size={13} aria-hidden />
            f-gass sertifisert · kategori I
          </p>
        </Container>
      </div>
    </footer>
  );
}
