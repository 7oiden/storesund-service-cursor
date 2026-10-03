/**
 * Copies the current default texts into Sanity so the editor starts from the
 * real copy. Safe to re-run: existing documents and filled-in fields are never
 * overwritten. Photos are not seeded; upload real ones in the Studio.
 *
 * Run: npx sanity exec scripts/seed-sanity.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import {
  defaultHome,
  defaultInstallation,
  defaultMaintenance,
  defaultRepair,
  type ServiceBaseContent,
} from "../src/lib/content";
import { defaultSettings } from "../src/lib/site";

const client = getCliClient({ apiVersion: "2025-01-01" });

/** Array items of object type need a unique _key and their _type. */
function keyed<T extends object>(items: T[], type: string) {
  return items.map((item, index) => ({ _key: `${type}${index}`, _type: type, ...item }));
}

function serviceBase(content: ServiceBaseContent) {
  return {
    summary: content.summary,
    heroHeading: content.heroHeading,
    heroPoints: content.heroPoints,
    stepsTitle: content.stepsTitle,
    steps: keyed(content.steps, "card"),
  };
}

const documents: { _id: string; _type: string; [field: string]: unknown }[] = [
  {
    _id: "homePage",
    _type: "homePage",
    heroHeadingLead: defaultHome.heroHeadingLead,
    heroHeadingMain: defaultHome.heroHeadingMain,
    heroIntro: defaultHome.heroIntro,
    trustPoints: keyed(defaultHome.trustPoints, "trustPoint"),
    aboutHeading: defaultHome.aboutHeading,
    aboutBody: defaultHome.aboutBody,
    whyMe: keyed(defaultHome.whyMe, "card"),
    otherIntro: defaultHome.otherIntro,
    otherTags: defaultHome.otherTags,
    ctaEyebrow: defaultHome.ctaEyebrow,
    ctaHeading: defaultHome.ctaHeading,
  },
  {
    _id: "installationPage",
    _type: "installationPage",
    ...serviceBase(defaultInstallation),
    conditions: keyed(defaultInstallation.conditions, "card"),
    included: defaultInstallation.included,
    parts: defaultInstallation.parts,
    excluded: defaultInstallation.excluded,
  },
  {
    _id: "maintenancePage",
    _type: "maintenancePage",
    ...serviceBase(defaultMaintenance),
    checkGroups: keyed(defaultMaintenance.checkGroups, "checkGroup"),
    tipIndoor: defaultMaintenance.tipIndoor,
    tipOutdoor: defaultMaintenance.tipOutdoor,
  },
  {
    _id: "repairPage",
    _type: "repairPage",
    ...serviceBase(defaultRepair),
    repairPoints: defaultRepair.repairPoints,
    replacePoints: defaultRepair.replacePoints,
    examples: defaultRepair.examples,
  },
];

async function main() {
  const transaction = client.transaction();
  for (const doc of documents) transaction.createIfNotExists(doc);

  transaction
    .createIfNotExists({ _id: "siteSettings", _type: "siteSettings" })
    .patch("siteSettings", (patch) =>
      patch.setIfMissing({
        availableText: defaultSettings.available_text,
        offshoreText: defaultSettings.offshore_text,
        footerTagline: defaultSettings.footer_tagline,
      }),
    );

  await transaction.commit();
  console.log(`Seeded ${documents.length} page documents and settings texts.`);

  const old = await client.fetch<string | null>(
    `*[_id == "siteSettings"][0].availabilityNote`,
  );
  if (old) {
    console.log(
      `\nThe old, unused field "Notat om tilgjengelighet" still contains:\n  ${old}\n` +
        "Copy it into the new availability texts if needed, then remove the field in the Studio.",
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
