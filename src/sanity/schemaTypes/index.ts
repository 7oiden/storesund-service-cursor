import { faqItem } from "./faqItem";
import { homePage } from "./homePage";
import { installationPage } from "./installationPage";
import { maintenancePage } from "./maintenancePage";
import { repairPage } from "./repairPage";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  homePage,
  installationPage,
  maintenancePage,
  repairPage,
  faqItem,
];

/** One fixed document each; the document id equals the type name. */
export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "installationPage",
  "maintenancePage",
  "repairPage",
]);
