import { defineType } from "sanity";
import { serviceBaseFields, serviceGroups, stringListField } from "./objects";

export const repairPage = defineType({
  name: "repairPage",
  title: "Reparasjon",
  type: "document",
  groups: serviceGroups,
  fields: [
    ...serviceBaseFields,
    stringListField("repairPoints", "Punkter under «Reparere»", { group: "details" }),
    stringListField("replacePoints", "Punkter under «Bytte»", { group: "details" }),
    stringListField("examples", "Eksempler på jobber", { group: "details" }),
  ],
  preview: { prepare: () => ({ title: "Reparasjon" }) },
});
