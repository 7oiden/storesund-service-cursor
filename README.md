# Storesund Service

Nettsted for Hugo Storesund – montering, service og reparasjon av varmepumper i Bergensområdet.

Bygget med Next.js, Supabase og Tailwind. Sidetekst ligger i koden. Priser, tilgjengelighet, FAQ og kontaktskjema ligger i Supabase.

## Kom i gang

```bash
npm install
cp .env.example .env.local
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

## Supabase

1. Opprett et prosjekt (eller bruk det eksisterende).
2. Lim inn `NEXT_PUBLIC_SUPABASE_URL` og `NEXT_PUBLIC_SUPABASE_ANON_KEY` i `.env.local`.
3. Kjør [`supabase/schema.sql`](supabase/schema.sql) i SQL Editor. Det oppretter tabeller, RLS og startinnhold.
4. Under Authentication → Users: opprett én adminbruker (Hugos e-post).
5. Logg inn på `/admin/login`.

Uten tabellene vises fortsatt nettstedet med innebygde standardpriser og FAQ. Kontaktskjemaet krever at `contact_submissions` finnes. Serviceavtaler krever at `service_agreements` finnes. Servicelogg krever `service_visits`. Kjør SQL-filen på nytt, eller lim inn `create table`-blokkene som mangler.

## E-postvarsel

Sett `RESEND_API_KEY` og `CONTACT_NOTIFY_EMAIL` i `.env.local`. Uten nøkkel lagres henvendelsen bare i admin-innboksen.

`RESEND_FROM` kan stå på `beth.t@example.com` for testhenvendelser. Bytt til et verifisert domene før produksjon.

## Admin

- `/admin` – henvendelser
- `/admin/serviceavtaler` – serviceavtaler og QR til påmelding
- `/admin/faq` – spørsmål og svar
- `/admin/innstillinger` – offshore/tilgjengelig, priser og kontaktinfo

## Bilder

Hero, om-meg og tjenestesidene bruker midlertidige Unsplash-bilder. Bytt ut URL-ene i `src/lib/site.ts` når ekte foto er klart.

## Navigasjon

- `/` – hjem
- `/tjenester` – oversikt
- `/tjenester/montering`
- `/tjenester/service`
- `/tjenester/reparasjon`
- `/kontakt`
- `/serviceavtale`
- `/personvern`
