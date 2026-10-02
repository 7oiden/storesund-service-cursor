import { defineConfig } from "sanity";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "storesund-service",
  title: "Storesund Service",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Innhold")
          .items([
            S.listItem()
              .title("Innstillinger")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
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
      schemaType === "siteSettings"
        ? prev.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : prev,
  },
});
