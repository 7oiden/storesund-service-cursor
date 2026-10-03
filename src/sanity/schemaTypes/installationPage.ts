import { defineType } from "sanity";
import { cardListField, serviceBaseFields, serviceGroups, stringListField } from "./objects";

export const installationPage = defineType({
  name: "installationPage",
  title: "Montering",
  type: "document",
  groups: serviceGroups,
  fields: [
    ...serviceBaseFields,
    cardListField("conditions", "Når gjelder fastprisen?", {
      group: "details",
      max: 3,
      icons: [
        { title: "Hus (vegg)", value: "wall" },
        { title: "Pil opp/ned (høyde)", value: "height" },
        { title: "Støpsel (strøm)", value: "power" },
      ],
    }),
    stringListField("included", "Inkludert i montering", { group: "details" }),
    stringListField("parts", "Deler som følger med", { group: "details" }),
    stringListField("excluded", "Ikke inkludert", { group: "details" }),
  ],
  preview: { prepare: () => ({ title: "Montering" }) },
});
