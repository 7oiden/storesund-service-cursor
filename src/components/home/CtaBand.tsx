import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { GreenWash } from "@/components/ui/GreenWash";

export function CtaBand({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading: string;
}) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-deep text-cream">
          <GreenWash />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 px-7 py-10 sm:flex-row sm:items-center sm:px-12 lg:py-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
                {eyebrow}
              </p>
              <h2 className="display mt-2 text-3xl sm:text-4xl">
                {heading}
              </h2>
            </div>
            <ButtonLink href="/kontakt" variant="copper" className="shrink-0">
              Be om time
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
