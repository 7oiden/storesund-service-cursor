import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Innstillinger",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-post", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "string" }),
    defineField({ name: "orgNr", title: "Org.nr.", type: "string" }),
    defineField({
      name: "isAvailable",
      title: "Tilgjengelig for oppdrag",
      description: "Av = offshore.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "availabilityNote",
      title: "Notat om tilgjengelighet",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "installPrice",
      title: "Pris montering (kr)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "servicePrice",
      title: "Pris service (kr)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "serviceDiscountPercent",
      title: "Rabatt serviceavtale (%)",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
    }),
  ],
  preview: { prepare: () => ({ title: "Innstillinger" }) },
});
