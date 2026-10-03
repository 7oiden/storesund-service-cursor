import { defineArrayMember, defineField, defineType } from "sanity";
import {
  cardField,
  iconField,
  serviceBaseFields,
  serviceGroups,
  stringListField,
} from "./objects";

export const maintenancePage = defineType({
  name: "maintenancePage",
  title: "Service",
  type: "document",
  groups: serviceGroups,
  fieldsets: [
    { name: "tips", title: "Tips til eget vedlikehold", options: { collapsible: true } },
  ],
  fields: [
    ...serviceBaseFields,
    defineField({
      name: "checkGroups",
      title: "Dette inngår i en service",
      description: "Antall punkter telles automatisk og vises som «kontrollpunkter».",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "checkGroup",
          fields: [
            defineField({ name: "title", title: "Tittel", type: "string" }),
            iconField([
              { title: "Innedel", value: "indoor" },
              { title: "Vifte (utedel)", value: "outdoor" },
              { title: "Kabel (rør og elektrisk)", value: "pipes" },
              { title: "Termometer (kuldemedium)", value: "refrigerant" },
            ]),
            stringListField("items", "Punkter"),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    cardField("tipIndoor", "Tips: innedel og filter", { group: "details", fieldset: "tips" }),
    cardField("tipOutdoor", "Tips: utedel", { group: "details", fieldset: "tips" }),
  ],
  preview: { prepare: () => ({ title: "Service" }) },
});
