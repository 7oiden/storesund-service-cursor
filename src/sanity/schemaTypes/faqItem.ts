import { orderRankField } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "Spørsmål og svar",
  type: "document",
  fields: [
    orderRankField({ type: "faqItem" }),
    defineField({
      name: "question",
      title: "Spørsmål",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Svar",
      description:
        "Skriv {servicepris}, {monteringspris} eller {rabatt} for å vise gjeldende pris fra Innstillinger.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "published",
      title: "Publisert",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});
