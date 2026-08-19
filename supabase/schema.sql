-- Run this in the Supabase SQL editor once.

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  phone text not null default '90659303',
  email text not null default 'hugo.storesund@gmail.com',
  address text not null default 'Lyngvegen 4a, 5382 Skogsvåg',
  org_nr text not null default '977314194',
  is_available boolean not null default true,
  availability_note text not null default 'Jobber perioder offshore. E-post og skjema når meg alltid.',
  install_price integer not null default 3750,
  service_price integer not null default 1300,
  service_discount_percent integer not null default 10,
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.faq_items enable row level security;
alter table public.contact_submissions enable row level security;

drop policy if exists "Public can read settings" on public.site_settings;
create policy "Public can read settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can update settings" on public.site_settings;
create policy "Admins can update settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Public can read published faqs" on public.faq_items;
create policy "Public can read published faqs"
  on public.faq_items for select
  to anon, authenticated
  using (published = true or auth.role() = 'authenticated');

drop policy if exists "Admins manage faqs" on public.faq_items;
create policy "Admins manage faqs"
  on public.faq_items for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Anyone can submit contact" on public.contact_submissions;
create policy "Anyone can submit contact"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins read submissions" on public.contact_submissions;
create policy "Admins read submissions"
  on public.contact_submissions for select
  to authenticated
  using (true);

drop policy if exists "Admins update submissions" on public.contact_submissions;
create policy "Admins update submissions"
  on public.contact_submissions for update
  to authenticated
  using (true)
  with check (true);

create table if not exists public.service_agreements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  address text not null,
  note text not null default '',
  source text not null default 'qr',
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  last_serviced_at date,
  next_due_at date,
  created_at timestamptz not null default now()
);

alter table public.service_agreements enable row level security;

drop policy if exists "Anyone can submit agreement" on public.service_agreements;
create policy "Anyone can submit agreement"
  on public.service_agreements for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins read agreements" on public.service_agreements;
create policy "Admins read agreements"
  on public.service_agreements for select
  to authenticated
  using (true);

drop policy if exists "Admins update agreements" on public.service_agreements;
create policy "Admins update agreements"
  on public.service_agreements for update
  to authenticated
  using (true)
  with check (true);

create table if not exists public.service_visits (
  id uuid primary key default gen_random_uuid(),
  agreement_id uuid not null references public.service_agreements(id) on delete cascade,
  serviced_at date not null,
  created_at timestamptz not null default now()
);

create index if not exists service_visits_agreement_id_idx
  on public.service_visits (agreement_id, serviced_at desc);

alter table public.service_visits enable row level security;

drop policy if exists "Admins read visits" on public.service_visits;
create policy "Admins read visits"
  on public.service_visits for select
  to authenticated
  using (true);

drop policy if exists "Admins insert visits" on public.service_visits;
create policy "Admins insert visits"
  on public.service_visits for insert
  to authenticated
  with check (true);

create or replace function public.seed_service_visit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.last_serviced_at is not null then
    insert into public.service_visits (agreement_id, serviced_at)
    values (new.id, new.last_serviced_at);
  end if;
  return new;
end;
$$;

drop trigger if exists service_agreements_seed_visit on public.service_agreements;
create trigger service_agreements_seed_visit
after insert on public.service_agreements
for each row execute procedure public.seed_service_visit();

insert into public.service_visits (agreement_id, serviced_at)
select id, last_serviced_at
from public.service_agreements
where last_serviced_at is not null
  and not exists (
    select 1 from public.service_visits v where v.agreement_id = service_agreements.id
  );

insert into public.site_settings (
  phone, email, address, org_nr, is_available, availability_note, install_price, service_price, service_discount_percent
)
select
  '90659303',
  'hugo.storesund@gmail.com',
  'Lyngvegen 4a, 5382 Skogsvåg',
  '977314194',
  true,
  'Jobber 14 dager om gangen i Nordsjøen. E-post og kontaktskjemaet når meg alltid.',
  3750,
  1300,
  10
where not exists (select 1 from public.site_settings);

insert into public.faq_items (question, answer, sort_order)
select * from (values
  (
    'Hva er en varmepumpe?',
    'En varmepumpe er en maskin som flytter varme fra et sted til et annet. Den kan hente varme fra luft, vann eller jord og brukes til oppvarming av boliger og tappevann. Varmepumper kan også brukes til kjøling.',
    1
  ),
  (
    'Hvorfor bør jeg velge en varmepumpe?',
    'Varmepumper er energieffektive og miljøvennlige. De kan redusere energiforbruket til oppvarming og kjøling av boliger og tappevann med opptil 70 prosent sammenlignet med elektrisk oppvarming.',
    2
  ),
  (
    'Hvorfor er det viktig med service?',
    'Regelmessig service bidrar til å forlenge levetiden til varmepumpen og sørge for at den fungerer mer effektivt. Smuss på lamellene gir merkbart dårligere ytelse over tid, og service gjør det lettere å oppdage slitasje før den blir kostbar å utbedre. Jeg anbefaler service annethvert år, i tillegg til jevnlig rengjøring selv.',
    3
  ),
  (
    'Hva koster en service?',
    'Prisen for en standard service på en luft-til-luft varmepumpe er 1 300 kr inkl. mva. Dette er en fast pris. Ved serviceavtale gis det 10 % rabatt på påfølgende servicer.',
    4
  )
) as seed(question, answer, sort_order)
where not exists (select 1 from public.faq_items);
