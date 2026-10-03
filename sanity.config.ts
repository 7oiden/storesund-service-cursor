import { defineConfig } from "sanity";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";

function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title));
}

export default defineConfig({
  name: "storesund-service",
  title: "Storesund Service",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Innhold")
          .items([
            singleton(S, "siteSettings", "Innstillinger"),
            singleton(S, "homePage", "Forside"),
            S.listItem()
              .title("Tjenester")
              .id("services")
              .child(
                S.list()
                  .title("Tjenester")
                  .items([
                    singleton(S, "installationPage", "Montering"),
                    singleton(S, "maintenancePage", "Service"),
                    singleton(S, "repairPage", "Reparasjon"),
                  ]),
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: "faqItem",
              title: "Spørsmål og svar",
              S,
              context,
            }),
          ]),
    }),
  ],
  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : prev,
  },
});
