import { defineArrayMember, defineField } from "sanity";

type FieldOptions = { group?: string; description?: string; fieldset?: string };

const altField = defineField({
  name: "alt",
  title: "Beskrivelse av bildet",
  description: "Kort tekst for skjermlesere og søkemotorer, f.eks. «Varmepumpe montert på yttervegg».",
  type: "string",
  validation: (rule) => rule.required().warning("Legg gjerne inn en kort beskrivelse."),
});

const photoConfig = {
  type: "image" as const,
  options: { hotspot: true },
  fields: [altField],
};

export function photoField(name: string, title: string, options: FieldOptions = {}) {
  return defineField({
    name,
    title,
    ...photoConfig,
    description:
      options.description ??
      "Klikk på blyanten for å velge hvilken del av bildet som alltid skal synes.",
    group: options.group,
    fieldset: options.fieldset,
  });
}

export function photoListField(name: string, title: string, max: number, options: FieldOptions = {}) {
  return defineField({
    name,
    title,
    type: "array",
    group: options.group,
    description: options.description,
    of: [defineArrayMember(photoConfig)],
    options: { layout: "grid" },
    validation: (rule) => rule.max(max),
  });
}

export function textField(
  name: string,
  title: string,
  options: FieldOptions & { rows?: number } = {},
) {
  return defineField({
    name,
    title,
    type: options.rows ? "text" : "string",
    rows: options.rows,
    group: options.group,
    fieldset: options.fieldset,
    description: options.description,
  });
}

export function stringListField(
  name: string,
  title: string,
  options: FieldOptions & { max?: number } = {},
) {
  return defineField({
    name,
    title,
    type: "array",
    group: options.group,
    fieldset: options.fieldset,
    description: options.description,
    of: [defineArrayMember({ type: "string" })],
    validation: options.max ? (rule) => rule.max(options.max!) : undefined,
  });
}

export function iconField(list: { title: string; value: string }[]) {
  return defineField({
    name: "icon",
    title: "Ikon",
    type: "string",
    options: { list, layout: "dropdown" },
    initialValue: list[0].value,
  });
}

/** List of cards with title + text, optionally with an icon dropdown. */
export function cardListField(
  name: string,
  title: string,
  options: FieldOptions & {
    max?: number;
    icons?: { title: string; value: string }[];
    rows?: number;
  } = {},
) {
  return defineField({
    name,
    title,
    type: "array",
    group: options.group,
    description: options.description,
    of: [
      defineArrayMember({
        type: "object",
        name: "card",
        fields: [
          defineField({ name: "title", title: "Tittel", type: "string" }),
          defineField({ name: "body", title: "Tekst", type: "text", rows: options.rows ?? 3 }),
          ...(options.icons ? [iconField(options.icons)] : []),
        ],
        preview: { select: { title: "title", subtitle: "body" } },
      }),
    ],
    validation: options.max ? (rule) => rule.max(options.max!) : undefined,
  });
}

/** Single title + text pair (e.g. a tip). */
export function cardField(name: string, title: string, options: FieldOptions = {}) {
  return defineField({
    name,
    title,
    type: "object",
    group: options.group,
    fieldset: options.fieldset,
    fields: [
      defineField({ name: "title", title: "Tittel", type: "string" }),
      defineField({ name: "body", title: "Tekst", type: "text", rows: 3 }),
    ],
  });
}

export const homeIconOptions = [
  { title: "Kvittering (pris)", value: "price" },
  { title: "Lag (allsidig)", value: "range" },
  { title: "Klokke (tid)", value: "time" },
  { title: "Medalje (erfaring)", value: "experience" },
];

/** Tabs and fields shared by the three service pages. */
export const serviceGroups = [
  { name: "overview", title: "Oversikt", default: true },
  { name: "details", title: "Hva inngår" },
  { name: "steps", title: "Slik foregår det" },
];

export const serviceBaseFields = [
  textField("summary", "Kort beskrivelse", {
    group: "overview",
    rows: 3,
    description: "Vises på tjenestekortene på forsiden og Tjenester-siden.",
  }),
  textField("heroHeading", "Ingress", {
    group: "overview",
    rows: 2,
    description: "Setningen under tittelen øverst på siden.",
  }),
  stringListField("heroPoints", "Punkter øverst på siden", { group: "overview", max: 4 }),
  photoField("heroPhoto", "Bilde", { group: "overview" }),
  textField("stepsTitle", "Overskrift", { group: "steps" }),
  cardListField("steps", "Steg", {
    group: "steps",
    max: 4,
    rows: 2,
    description: "Vises som nummererte steg (inntil 4).",
  }),
];
