import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { formatPhone, telHref } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-auto bg-forest-deep text-cream">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-6 text-cream/70">
            Montering, service og reparasjon av varmepumper og klimaanlegg i
            Bergen og omegn.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a href={telHref(settings.phone)} className="hover:text-cream">
                {formatPhone(settings.phone)}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-cream">
                {settings.email}
              </a>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-cream">
                Kontaktskjema
              </Link>
            </li>
            <li>
              <Link href="/serviceavtale" className="hover:text-cream">
                Serviceavtale
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Firma
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>{settings.address}</li>
            <li>
              <a
                href={`https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=${settings.org_nr}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cream"
              >
                Org.nr. {settings.org_nr}
              </a>
            </li>
            <li>
              <Link href="/kontakt#faq" className="hover:text-cream">
                Ofte stilte spørsmål
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Nyttig
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>
              <a
                href="https://www.varmepumpeinfo.no"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cream"
              >
                Nøytral info om varmepumper
              </a>
            </li>
            <li>
              <a
                href="http://www.minigraveren.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cream"
              >
                Utleie av minigraver
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-4 text-xs text-cream/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Hugo Storesund</p>
          <p>f-gass sertifisert · kategori I</p>
        </Container>
      </div>
    </footer>
  );
}
