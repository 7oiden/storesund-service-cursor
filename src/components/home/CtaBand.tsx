import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function CtaBand() {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-forest px-8 py-10 text-cream sm:flex-row sm:items-center sm:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
              Klar for en prat?
            </p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">
              Send en melding. Jeg svarer når jeg kan.
            </h2>
          </div>
          <ButtonLink
            href="/kontakt"
            variant="secondary"
            className="shrink-0"
          >
            Gå til kontakt
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
