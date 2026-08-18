import { photos } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

export function About() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Photo
          src={photos.about}
          alt="Arbeid med teknisk anlegg – plassholderbilde"
          className="aspect-[4/5] rounded-[2rem]"
        />
        <div>
          <SectionHeading
            eyebrow="Om meg"
            title="Maskinist til havs. Varmepumpemann i land."
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-ink-soft">
            <p>
              Jeg heter Hugo Storesund og driver Storesund Service ved siden av
              full jobb som maskinist i Nordsjøen. Når jeg er hjemme på Sotra tar jeg på meg montering, service og reparasjon av
              varmepumper og klimaanlegg – for både privatpersoner og bedrifter.
            </p>
            <p>
              Bakgrunnen er mer enn 20 år med varmepumper og 15 år offshore. Jeg
              er f-gass sertifisert i kategori I, og kan derfor også jobbe på
              anlegg med mer enn 3 kg kuldemedium.
            </p>
            <p>
              På grunn av turnusordningen på jobb, er jeg ikke alltid
              tilgjengelig på telefon. Men dersom du ønkser å sette opp en avtale, kan du gjøre det gjennom e-post eller via kontaktskjemaet, og jeg svarer så snart jeg kan.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
