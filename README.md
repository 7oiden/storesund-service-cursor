# Storesund Service

Nettsted for Hugo Storesund – montering, service og reparasjon av varmepumper i Bergensområdet.

Bygget med Next.js, Sanity og Tailwind. Sidetekst ligger i koden. Priser, tilgjengelighet, kontaktinfo og FAQ redigeres i Sanity Studio på `/studio`. Kontaktskjema og serviceavtale-påmelding sendes på e-post via Web3Forms. Serviceavtaler følges opp utenfor nettstedet.

## Kom i gang

```bash
npm install
cp .env.example .env.local
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000). Uten Sanity-nøkler vises nettstedet med innebygde standardpriser og FAQ.

## Sanity

1. Opprett et prosjekt på sanity.io/manage (dataset `production`).
2. Sett `NEXT_PUBLIC_SANITY_PROJECT_ID` og `NEXT_PUBLIC_SANITY_DATASET` i `.env.local`.
3. Under API → CORS origins: legg til nettstedets URL og `http://localhost:3000` (med credentials).
4. Under Members: inviter Hugo. Han logger inn på `/studio`.
5. Webhook (API → Webhooks): URL `https://ditt-domene.no/api/revalidate`, metode POST, hemmelighet = `SANITY_REVALIDATE_SECRET`. Uten webhook oppdateres siden innen en time.

## Skjemaer

Opprett en nøkkel på web3forms.com (e-postadressen mottar henvendelsene) og sett `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Nøkkelen er ment å være offentlig. Skjemaene har et skjult spamfelt (`botcheck`).

## Bilder

Hero, om-meg og tjenestesidene bruker midlertidige Unsplash-bilder. Bytt ut URL-ene i `src/lib/site.ts` når ekte foto er klart.

Sett `NEXT_PUBLIC_SITE_URL` (f.eks. `https://ditt-domene.no`) før lansering, så `sitemap.xml` og `robots.txt` peker på riktig adresse. Studio er satt til `noindex`.

## Navigasjon

- `/` – hjem
- `/tjenester` – oversikt
- `/tjenester/montering`
- `/tjenester/service`
- `/tjenester/reparasjon`
- `/kontakt`
- `/serviceavtale`
- `/personvern`
