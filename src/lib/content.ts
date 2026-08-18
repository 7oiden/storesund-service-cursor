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
    summary: "Fastpris på standard luft-til-luft, også på pumper du har kjøpt selv.",
  },
  {
    href: "/tjenester/service",
    slug: "service",
    label: "Service",
    summary: "Regelmessig vedlikehold som holder anlegget effektivt og billig i drift.",
  },
  {
    href: "/tjenester/reparasjon",
    slug: "reparasjon",
    label: "Reparasjon",
    summary: "Gratis feilsøking og ærlig vurdering før du bytter ut hele anlegget.",
  },
] as const;

export const whyMe = [
  {
    title: "Forutsigbar",
    body: "Fastpris på standard montering og service. Kjøring inntil 50 km tur-retur er inkludert.",
  },
  {
    title: "Allsidig",
    body: "Privat og næring – fra luft-til-luft i enebolig til mikrobryggeri, kjøleanlegg og skipsfart.",
  },
  {
    title: "Fleksibel",
    body: "Hjemmebesøk etter arbeidstid uten tillegg. Jobben tilpasses når jeg er i land.",
  },
  {
    title: "Erfaring",
    body: "Mer enn 20 år med varmepumper, 15 år som maskinist offshore, og f-gass kategori I.",
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

export const serviceIncluded = [
  "Visuell overflatesjekk og rens/desinfisering av inne- og utedelen.",
  "Ser etter skader, fester og gummidempere på utedelen.",
  "Undersøker vibrasjoner og ulyd på innedel, utedel og vifter.",
  "Sjekker plassering av varmekabel og termostat.",
  "Kontrollerer rør, rørtrasé og avløp.",
  "Sjekker for lekkasje i kraner, ventiler og mutterhetter.",
  "Etterstrammer kabler og kontaktpunkter.",
  "Sjekker isolering og plastkanaler.",
  "Utfører lekkasjekontroll og undersøker kuldemedium.",
  "Kontrollerer og rengjør luftfiltre.",
  "Etterstrammer og rengjør innedelen.",
  "Sjekker fjernkontroll, bytter batterier og undersøker feilkoder.",
  "Funksjonstest etter utført arbeid, med testrapport.",
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
