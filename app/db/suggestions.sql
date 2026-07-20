-- Shevality – Tabelle für "Geschäft vorschlagen"
-- Nutzer:innen können über die App neue Läden vorschlagen. Bewusst OHNE
-- Lese-Policy für anon: Vorschläge sind nur über das Supabase-Dashboard
-- (mit vollen Rechten) einsehbar, nicht über die öffentliche App.

create extension if not exists pgcrypto;

create table if not exists suggestions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,             -- Name des Geschäfts (Pflicht)
  category      text,
  neighborhood  text,
  address       text,
  website       text,
  reason        text,                      -- warum vermutlich frauengeführt
  contact       text,                      -- E-Mail der vorschlagenden Person (optional)
  status        text not null default 'new'  -- new | reviewed | added | rejected
);

alter table suggestions enable row level security;
drop policy if exists "Public can suggest" on suggestions;
create policy "Public can suggest"
  on suggestions for insert
  with check (true);
-- Bewusst keine select/update/delete-Policy für anon.
