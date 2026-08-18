import { otherServices } from "@/lib/content";
import { photos } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

const workPhotos = [
  { src: photos.work1, alt: "Boligfasade – plassholder" },
  { src: photos.work2, alt: "Moderne bolig – plassholder" },
  { src: photos.work3, alt: "Interiør – plassholder" },
  { src: photos.work4, alt: "Hus og hage – plassholder" },
];

export function OtherServices() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Andre anlegg"
            title="Ikke bare luft-til-luft."
            body="Ta kontakt for tilbud på montasje, service og reparasjon av andre typer anlegg enn standard varmepumpe."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {otherServices.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {workPhotos.map((photo) => (
            <Photo
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className="aspect-square rounded-2xl"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
