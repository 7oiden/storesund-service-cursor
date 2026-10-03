import { defineField, defineType } from "sanity";
import {
  cardListField,
  homeIconOptions,
  iconField,
  photoField,
  photoListField,
  stringListField,
  textField,
} from "./objects";

export const homePage = defineType({
  name: "homePage",
  title: "Forside",
  type: "document",
  groups: [
    { name: "hero", title: "Toppseksjon", default: true },
    { name: "about", title: "Om meg" },
    { name: "whyMe", title: "Hvorfor meg" },
    { name: "other", title: "Andre anlegg" },
    { name: "cta", title: "Avslutning" },
  ],
  fields: [
    textField("heroHeadingLead", "Overskrift, liten del", {
      group: "hero",
      rows: 2,
      description: "Linjeskift blir beholdt.",
    }),
    textField("heroHeadingMain", "Overskrift, stor del", {
      group: "hero",
      description: "F.eks. «varmepumper.»",
    }),
    textField("heroIntro", "Ingress", { group: "hero", rows: 3 }),
    defineField({
      name: "trustPoints",
      title: "Korte salgspunkter",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          name: "trustPoint",
          fields: [
            defineField({ name: "label", title: "Tekst", type: "string" }),
            iconField(homeIconOptions),
          ],
          preview: { select: { title: "label" } },
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    photoField("heroPhoto", "Bilde", { group: "hero" }),

    textField("aboutHeading", "Overskrift", { group: "about" }),
    textField("aboutBody", "Tekst", {
      group: "about",
      rows: 12,
      description: "La det være en tom linje mellom hvert avsnitt.",
    }),
    photoField("aboutPhoto", "Bilde", { group: "about" }),

    cardListField("whyMe", "Kort", {
      group: "whyMe",
      max: 6,
      icons: homeIconOptions,
    }),

    textField("otherIntro", "Ingress", { group: "other", rows: 3 }),
    stringListField("otherTags", "Typer anlegg", {
      group: "other",
      description: "Vises som små merkelapper, også på Montering-siden.",
    }),
    photoListField("otherPhotos", "Bilder", 4, {
      group: "other",
      description: "Inntil 4 bilder, vises i et rutenett.",
    }),

    textField("ctaEyebrow", "Liten tekst", { group: "cta" }),
    textField("ctaHeading", "Overskrift", { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Forside" }) },
});
