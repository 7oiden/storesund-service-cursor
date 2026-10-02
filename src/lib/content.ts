export const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const serviceNav = [
  {
    href: "/tjenester/montering",
    slug: "montering",
    label: "Montering",
    summary: "Fastpris på montering av standard luft-til-luft. Prisen gjelder også på pumper du har kjøpt selv.",
  },
  {
    href: "/tjenester/service",
    slug: "service",
    label: "Service",
    summary: "Regelmessig vedlikehold og service holder anlegget effektivt og øker levetiden betraktelig.",
  },
  {
    href: "/tjenester/reparasjon",
    slug: "reparasjon",
    label: "Reparasjon",
    summary: "Gratis feilsøking og ærlig vurdering, kan spare deg store kostnader ved å unngå bytte ut hele anlegget.",
  },
] as const;

export const whyMe = [
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
] as const;

export const otherServices = [
  "Kjøleanlegg",
  "Fryseanlegg",
  "Mikrobryggeri",
  "Skipsfart",
  "Klimaanlegg",
  "Kjøretøy",
  "Air-condition",
  "Anleggsmaskiner",
] as const;

export const installationIncluded = [
  "Hulltaking i trevegg med inntil 30 cm tykkelse.",
  "Elektrisk tilkobling mellom innedel og utedel.",
  "Vakuumering og tetthetsprøving av anlegget.",
  "Test og igangkjøring av varmepumpen, med testrapport.",
  "Forsvarlig tetting av gjennomføring i vegg.",
  "Gratis kjøring inntil 50 km tur-retur.",
] as const;

export const installationParts = [
  "Inntil 5 meter isolerte kobberrør og signalkabel mellom innedel og utedel.",
  "Inntil 5 meter slange for kondensvann.",
  "Inntil 5 meter UV-bestandige plastkanaler for å beskytte rørene utvendig.",
  "To veggbraketter (veggstativ).",
  "Fire vibrasjonsdempere i gummi.",
  "Kabel for å koble varmepumpen til strøm.",
  "Plastrør til gjennomføring i veggen.",
] as const;

export const installationExcluded = [
  "Elektrisk tilkobling av utedel, inklusive jordfeilbryter. Denne jobben må utføres av elektriker.",
  "Boring gjennom lettmur, eller kjerneboring gjennom betongmur.",
  "Lift eller stillas for montering over arbeidshøyde.",
] as const;

export const installationConditions = [
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
] as const;

export const installationSteps = [
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
] as const;

export const serviceIncludedGroups = [
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
] as const;

export const serviceSteps = [
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
] as const;

export const repairExamples = [
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
] as const;

export const repairSteps = [
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
] as const;

export const repairComparison = {
  repair: {
    title: "Reparere",
    points: [
      "Du beholder anlegget og monteringen du allerede har betalt for.",
      "Mange feil løses med en enkel reparasjon.",
      "Tilgang til et stort utvalg reservedeler gjennom et bredt leverandørnett.",
    ],
  },
  replace: {
    title: "Bytte",
    points: [
      "Ny pumpe betyr også ny montering.",
      "Fornuftig når reparasjonen ikke lønner seg.",
      "Jeg hjelper deg med en prisgunstig erstatning via leverandøravtaler.",
    ],
  },
} as const;

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
      "Prisen for en standard service på en luft-til-luft varmepumpe er 1 300 kr inkl. mva. Dette er en fast pris. Ved serviceavtale gis det 10 % rabatt på påfølgende servicer.",
  },
];
