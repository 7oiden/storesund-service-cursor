// Default content. Used as fallback whenever a Sanity field is empty,
// and as the source for scripts/seed-sanity.ts. Keep this file free of
// "@/..." imports so the seed script can load it.

export type Photo = { src: string; alt: string; position?: string };
export type Step = { title: string; body: string };

export const homeIconKeys = ["price", "range", "time", "experience"] as const;
export type HomeIcon = (typeof homeIconKeys)[number];

export const conditionIconKeys = ["wall", "height", "power"] as const;
export type ConditionIcon = (typeof conditionIconKeys)[number];

export const checkGroupIconKeys = ["indoor", "outdoor", "pipes", "refrigerant"] as const;
export type CheckGroupIcon = (typeof checkGroupIconKeys)[number];

export type HomeContent = {
  heroHeadingLead: string;
  heroHeadingMain: string;
  heroIntro: string;
  trustPoints: { label: string; icon: HomeIcon }[];
  heroPhoto: Photo;
  aboutHeading: string;
  aboutBody: string;
  aboutPhoto: Photo;
  whyMe: { title: string; body: string; icon: HomeIcon }[];
  otherIntro: string;
  otherTags: string[];
  otherPhotos: Photo[];
  ctaEyebrow: string;
  ctaHeading: string;
};

export type ServiceBaseContent = {
  summary: string;
  heroHeading: string;
  heroPoints: string[];
  heroPhoto: Photo;
  stepsTitle: string;
  steps: Step[];
};

export type InstallationContent = ServiceBaseContent & {
  included: string[];
  parts: string[];
  excluded: string[];
  conditions: { title: string; body: string; icon: ConditionIcon }[];
};

export type MaintenanceContent = ServiceBaseContent & {
  checkGroups: { title: string; icon: CheckGroupIcon; items: string[] }[];
  tipIndoor: Step;
  tipOutdoor: Step;
};

export type RepairContent = ServiceBaseContent & {
  repairPoints: string[];
  replacePoints: string[];
  examples: string[];
};

export const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const serviceNav = [
  { href: "/tjenester/montering", slug: "montering", label: "Montering" },
  { href: "/tjenester/service", slug: "service", label: "Service" },
  { href: "/tjenester/reparasjon", slug: "reparasjon", label: "Reparasjon" },
] as const;

export type ServiceSlug = (typeof serviceNav)[number]["slug"];

/** Sanity document type (and fixed document id) per service page. */
export const servicePageTypes = {
  montering: "installationPage",
  service: "maintenancePage",
  reparasjon: "repairPage",
} as const satisfies Record<ServiceSlug, string>;

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const defaultHome: HomeContent = {
  heroHeadingLead: "Montasje, service\nog reparasjon av",
  heroHeadingMain: "varmepumper.",
  heroIntro:
    "Fastpris på standard jobber, hjemmebesøk etter arbeidstid, og ærlige råd når reparasjon lønner seg mer enn å bytte.",
  trustPoints: [
    { icon: "experience", label: "20+ år erfaring" },
    { icon: "price", label: "Fastpris på standard" },
    { icon: "time", label: "Kveldsbesøk uten tillegg" },
  ],
  heroPhoto: {
    src: unsplash("1600585154340-be6161a56a0c", 1800),
    alt: "Bolig der en varmepumpe kan monteres",
  },
  aboutHeading: "Maskinist til havs. Varmepumpemann i land.",
  aboutBody: [
    "Jeg heter Hugo Storesund og driver Storesund Service ved siden av full jobb som maskinist i Nordsjøen. Når jeg er hjemme på Sotra tar jeg på meg montering, service og reparasjon av varmepumper og klimaanlegg – for både privatpersoner og bedrifter.",
    "Bakgrunnen er mer enn 20 år med varmepumper og 15 år offshore. Jeg er f-gass sertifisert i kategori I, og kan derfor også jobbe på anlegg med mer enn 3 kg kuldemedium.",
    "På grunn av turnusordningen på jobb, er jeg ikke alltid tilgjengelig på telefon. Men dersom du ønsker å sette opp en avtale eller har spørsmål, kan du gjøre det gjennom e-post eller via kontaktskjemaet; så svarer jeg så snart jeg kan.",
  ].join("\n\n"),
  aboutPhoto: {
    src: unsplash("1581094794329-c8112a89af12", 1200),
    alt: "Arbeid med teknisk anlegg – plassholderbilde",
  },
  whyMe: [
    {
      title: "Forutsigbar",
      icon: "price",
      body: "Fastpris på standard montering og service. Kjøring inntil 50 km tur-retur er inkludert.",
    },
    {
      title: "Allsidig",
      icon: "range",
      body: "Tar på meg oppdrag både for private og næring – fra luft-til-luft i enebolig til mikrobryggeri, kjøleanlegg og skipsfart.",
    },
    {
      title: "Fleksibel",
      icon: "time",
      body: "Hjemmebesøk etter arbeidstid uten tillegg. Avtalen kan tilpasses ditt behov.",
    },
    {
      title: "Erfaring",
      icon: "experience",
      body: "Mer enn 20 års erfaring med varmepumper, 15 års erfaring som maskinist offshore, og sertifisering som sikrer korrekt og sikkert arbeid.",
    },
  ],
  otherIntro:
    "Ta kontakt for tilbud på montasje, service og reparasjon av andre typer anlegg enn standard varmepumpe.",
  otherTags: [
    "Kjøleanlegg",
    "Fryseanlegg",
    "Mikrobryggeri",
    "Skipsfart",
    "Klimaanlegg",
    "Kjøretøy",
    "Air-condition",
    "Anleggsmaskiner",
  ],
  otherPhotos: [
    { src: unsplash("1600566753190-17f0baa2a6c3", 900), alt: "Boligfasade – plassholder" },
    { src: unsplash("1600596542815-ffad4c1539a9", 900), alt: "Moderne bolig – plassholder" },
    { src: unsplash("1618221195710-dd6b41faaea6", 900), alt: "Interiør – plassholder" },
    { src: unsplash("1600585154526-990dced4db0d", 900), alt: "Hus og hage – plassholder" },
  ],
  ctaEyebrow: "Klar for en time?",
  ctaHeading: "Send en melding, så tar vi det derfra.",
};

export const defaultInstallation: InstallationContent = {
  summary:
    "Fastpris på montering av standard luft-til-luft. Prisen gjelder også på pumper du har kjøpt selv.",
  heroHeading:
    "Jeg monterer og demonterer alle typer varmepumper, også de du har kjøpt selv.",
  heroPoints: [
    "Fastpris på standard montasje gjelder luft-til-luft uansett merke, i bolig med trevegg og god atkomst.",
    "Kjøring og nødvendig utstyr for en klar-til-bruk installasjon er inkludert, forutsatt at elektrisk tilkobling for utedel er på plass.",
    "Ta kontakt for time, eller for pristilbud på andre typer varmepumper og anlegg utenom standard.",
  ],
  heroPhoto: {
    src: unsplash("1600607687939-ce8a6c25118c", 1400),
    alt: "Montering av varmepumpe",
  },
  stepsTitle: "Fra avklaring til varme i huset.",
  steps: [
    {
      title: "Avklaring",
      body: "Vi går gjennom plassering, vegg og atkomst, så du vet at prisen holder.",
    },
    {
      title: "Montering",
      body: "Hulltaking, braketter, rør, signalkabel og kondensslange monteres og tettes.",
    },
    {
      title: "Vakuum og tetthet",
      body: "Anlegget vakuumeres og tetthetsprøves før det settes i drift.",
    },
    {
      title: "Igangkjøring",
      body: "Varmepumpen testes og startes, og du får testrapport.",
    },
  ],
  included: [
    "Hulltaking i trevegg med inntil 30 cm tykkelse.",
    "Elektrisk tilkobling mellom innedel og utedel.",
    "Vakuumering og tetthetsprøving av anlegget.",
    "Test og igangkjøring av varmepumpen, med testrapport.",
    "Forsvarlig tetting av gjennomføring i vegg.",
    "Gratis kjøring inntil 50 km tur-retur.",
  ],
  parts: [
    "Inntil 5 meter isolerte kobberrør og signalkabel mellom innedel og utedel.",
    "Inntil 5 meter slange for kondensvann.",
    "Inntil 5 meter UV-bestandige plastkanaler for å beskytte rørene utvendig.",
    "To veggbraketter (veggstativ).",
    "Fire vibrasjonsdempere i gummi.",
    "Kabel for å koble varmepumpen til strøm.",
    "Plastrør til gjennomføring i veggen.",
  ],
  excluded: [
    "Elektrisk tilkobling av utedel, inklusive jordfeilbryter. Denne jobben må utføres av elektriker.",
    "Boring gjennom lettmur, eller kjerneboring gjennom betongmur.",
    "Lift eller stillas for montering over arbeidshøyde.",
  ],
  conditions: [
    {
      icon: "wall",
      title: "Trevegg inntil 30 cm",
      body: "Hulltaking i vanlig trevegg er med. Lettmur og betong prises for seg.",
    },
    {
      icon: "height",
      title: "God atkomst",
      body: "Utedelen monteres innenfor arbeidshøyde. Lift eller stillas kommer i tillegg.",
    },
    {
      icon: "power",
      title: "Strøm til utedel",
      body: "Elektriker legger frem tilkobling med jordfeilbryter før montering.",
    },
  ],
};

export const defaultMaintenance: MaintenanceContent = {
  summary:
    "Regelmessig vedlikehold og service holder anlegget effektivt og øker levetiden betraktelig.",
  heroHeading:
    "Sikre lang levetid og god energieffektivitet med regelmessig service.",
  heroPoints: [
    "En godt vedlikeholdt varmepumpe holder strømregningen nede. Smuss på lamellene gir merkbart dårligere ytelse over tid.",
    "Regelmessig service gjør det lettere å oppdage slitasje før den blir kostbar å utbedre.",
    "Anbefalingen er service annethvert år, i tillegg til jevnlig rengjøring du gjør selv.",
  ],
  heroPhoto: {
    src: unsplash("1600210492486-724fe5c67fb0", 1400),
    alt: "Service av varmepumpe",
  },
  stepsTitle: "Én time som lønner seg.",
  steps: [
    {
      title: "Avtal tid",
      body: "Send en melding, så finner vi en tid – også etter arbeidstid.",
    },
    {
      title: "Rens",
      body: "Inne- og utedel rengjøres og desinfiseres, og filtrene renses.",
    },
    {
      title: "Kontroll",
      body: "Rør, elektrisk, vifter og kuldemedium sjekkes for slitasje og lekkasje.",
    },
    {
      title: "Testrapport",
      body: "Funksjonstest etter utført arbeid, med testrapport og råd videre.",
    },
  ],
  checkGroups: [
    {
      icon: "indoor",
      title: "Rens og innedel",
      items: [
        "Visuell overflatesjekk og rens/desinfisering av inne- og utedelen.",
        "Kontrollerer og rengjør luftfiltre.",
        "Etterstrammer og rengjør innedelen.",
        "Sjekker fjernkontroll, bytter batterier og undersøker feilkoder.",
      ],
    },
    {
      icon: "outdoor",
      title: "Utedel og vifter",
      items: [
        "Ser etter skader, fester og gummidempere på utedelen.",
        "Undersøker vibrasjoner og ulyd på innedel, utedel og vifter.",
        "Sjekker plassering av varmekabel og termostat.",
      ],
    },
    {
      icon: "pipes",
      title: "Rør og elektrisk",
      items: [
        "Kontrollerer rør, rørtrasé og avløp.",
        "Etterstrammer kabler og kontaktpunkter.",
        "Sjekker isolering og plastkanaler.",
      ],
    },
    {
      icon: "refrigerant",
      title: "Kuldemedium og test",
      items: [
        "Sjekker for lekkasje i kraner, ventiler og mutterhetter.",
        "Utfører lekkasjekontroll og undersøker kuldemedium.",
        "Funksjonstest etter utført arbeid, med testrapport.",
      ],
    },
  ],
  tipIndoor: {
    title: "Innedel og filter",
    body: "Støvsug eller vask filteret, tørk av med en klut og støvsug innedelen før filteret settes på plass. Det gir bedre luftsirkulasjon og lenger levetid.",
  },
  tipOutdoor: {
    title: "Utedelen",
    body: "Hold utedelen fri for støv, løv og snø om vinteren.",
  },
};

export const defaultRepair: RepairContent = {
  summary:
    "Gratis feilsøking og ærlig vurdering, kan spare deg store kostnader ved å unngå bytte ut hele anlegget.",
  heroHeading: "Hvorfor kjøpe ny varmepumpe når den du har kan reddes?",
  heroPoints: [
    "Mange feil kan løses med en enkel reparasjon, i stedet for ny pumpe og ny montering.",
    "Hvis reparasjon likevel ikke lønner seg, hjelper jeg med en prisgunstig erstatning via leverandøravtaler.",
    "Ta kontakt for gratis befaring med feilsøking og prisestimat.",
  ],
  heroPhoto: { src: "/images/work-repair.jpg", alt: "Reparasjon av varmepumpe" },
  stepsTitle: "Fra feilkode til fungerende anlegg.",
  steps: [
    {
      title: "Ta kontakt",
      body: "Beskriv hva som skjer: ulyd, feilkode, dårlig varme eller lekkasje.",
    },
    {
      title: "Gratis befaring",
      body: "Jeg feilsøker anlegget på stedet, uten kostnad for deg.",
    },
    {
      title: "Prisestimat",
      body: "Du får en ærlig vurdering av om reparasjon lønner seg, og hva den koster.",
    },
    {
      title: "Reparasjon eller erstatning",
      body: "Jeg reparerer, eller hjelper deg med en prisgunstig ny pumpe.",
    },
  ],
  repairPoints: [
    "Du beholder anlegget og monteringen du allerede har betalt for.",
    "Mange feil løses med en enkel reparasjon.",
    "Tilgang til et stort utvalg reservedeler gjennom et bredt leverandørnett.",
  ],
  replacePoints: [
    "Ny pumpe betyr også ny montering.",
    "Fornuftig når reparasjonen ikke lønner seg.",
    "Jeg hjelper deg med en prisgunstig erstatning via leverandøravtaler.",
  ],
  examples: [
    "Alle typer varmepumper.",
    "Skader, fester og gummidempere på utedelen.",
    "Vibrasjoner og ulyd på innedel, utedel og vifter.",
    "Kompressor: vibrasjoner, ulyd og lekkasjer.",
    "Plassering av varmekabel og termostat.",
    "Kontrollmåling av spenning, strøm og jord.",
    "Isolering og plastkanaler.",
    "Lekkasje i kraner, ventiler og mutterhetter.",
    "Etterstramming av kabler og kontaktpunkter.",
    "Lekkasjekontroll og kuldemedium.",
    "Kontroll og rengjøring av luftfiltre.",
  ],
};

export const defaultServiceContent = {
  montering: defaultInstallation,
  service: defaultMaintenance,
  reparasjon: defaultRepair,
} satisfies Record<ServiceSlug, ServiceBaseContent>;

/** Placeholders replaced with live prices from Innstillinger in FAQ answers. */
export const pricePlaceholders = ["{monteringspris}", "{servicepris}", "{rabatt}"] as const;

export const fallbackFaqs = [
  {
    id: "1",
    question: "Hva er en varmepumpe?",
    answer:
      "En varmepumpe er en maskin som flytter varme fra et sted til et annet. Den kan hente varme fra luft, vann eller jord og brukes til oppvarming av boliger og tappevann. Varmepumper kan også brukes til kjøling.",
  },
  {
    id: "2",
    question: "Hvorfor bør jeg velge en varmepumpe?",
    answer:
      "Varmepumper er energieffektive og miljøvennlige. De kan redusere energiforbruket til oppvarming og kjøling av boliger og tappevann med opptil 70 prosent sammenlignet med elektrisk oppvarming.",
  },
  {
    id: "3",
    question: "Hvorfor er det viktig med service?",
    answer:
      "Regelmessig service bidrar til å forlenge levetiden til varmepumpen og sørge for at den fungerer mer effektivt. Smuss på lamellene gir merkbart dårligere ytelse over tid, og service gjør det lettere å oppdage slitasje før den blir kostbar å utbedre. Jeg anbefaler service annethvert år, i tillegg til jevnlig rengjøring selv.",
  },
  {
    id: "4",
    question: "Hva koster en service?",
    answer:
      "Prisen for en standard service på en luft-til-luft varmepumpe er {servicepris} inkl. mva. Dette er en fast pris. Ved serviceavtale gis det {rabatt} rabatt på påfølgende servicer.",
  },
];
