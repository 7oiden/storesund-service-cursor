import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";

export function CtaBand() {
  return (
    <section className="pb-32">
      <div className="relative overflow-hidden bg-forest-deep text-cream">
        <GreenWash />
        <Container className="relative z-10 flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
              Klar for en time?
            </p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">
              Send en melding, så tar vi det derfra.
            </h2>
          </div>
          <ButtonLink href="/kontakt" variant="copper" className="shrink-0">
            Be om time
            <ArrowRight size={16} />
          </ButtonLink>
        </Container>
      </div>
    </section>
  );
}
