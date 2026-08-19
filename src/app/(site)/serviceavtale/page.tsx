import type { Metadata } from "next";
import { AgreementForm } from "@/components/service-agreement/AgreementForm";
import { Container } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";
import { getSiteSettings } from "@/lib/data";
import { formatNok } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Serviceavtale",
  description:
    "Service annethvert år på varmepumpe med rabatt på neste besøk. Du betaler etter jobben er gjort.",
};

export default async function ServiceAgreementPage({
  searchParams,
}: {
  searchParams: Promise<{ fra?: string | string[] }>;
}) {
  const settings = await getSiteSettings();
  const params = await searchParams;
  const raw = Array.isArray(params.fra) ? params.fra[0] : params.fra;
  const source = raw === "qr" ? "qr" : "web";
  const discounted = Math.round(
    settings.service_price * (1 - settings.service_discount_percent / 100),
  );

  return (
    <section className="relative overflow-hidden bg-forest-deep py-12 text-cream lg:py-20">
      <GreenWash />
      <Container className="relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">
            Serviceavtale
          </p>
          <h1 className="display mt-3 text-4xl leading-tight sm:text-5xl">
            Fast avtale. {settings.service_discount_percent} % rabatt på neste
            service.
          </h1>
          <ul className="mt-8 space-y-4 text-base leading-7 text-cream/80">
            <li>
              Jeg tar kontakt når det er tid for neste service – du trenger
              ikke huske det selv.
            </li>
            <li>
              Standard service koster {formatNok(settings.service_price)} inkl.
              mva. Med avtale blir neste besøk {formatNok(discounted)}.
            </li>
            <li>
              Du betaler etter jobben er gjort. Ingen trekk eller binding utover
              at du står på listen.
            </li>
          </ul>
        </div>
        <AgreementForm source={source} />
      </Container>
    </section>
  );
}
