-- Shevality – Datenbank-Bauplan (Schema)
-- Diesen Code kannst du 1:1 in den Supabase SQL-Editor einfügen und ausführen.

-- Tabelle: Geschäfte (frauengeführte Betriebe)
create table if not exists businesses (
  id            text primary key,          -- z.B. 'g1'
  name          text not null,             -- "cà phê, ơi!"
  category      text not null,             -- "Café"
  neighborhood  text not null,             -- "Sachsenhausen"
  address       text,                      -- "Textorstraße 80, 60596 Frankfurt am Main"
  hours         text,                      -- "Di–Sa 8–18 Uhr" (optional)
  image         text,                      -- Foto-URL (optional)
  website       text,                      -- optional
  description   text,                      -- kurze Beschreibung (optional)
  instagram     text,                      -- optional
  founded       boolean not null default false,  -- Gegründet von einer Frau?
  ownership     boolean not null default false,  -- Mehrheitlich in Frauenbesitz?
  leadership    boolean not null default false,  -- Von einer Frau geleitet?
  created_at    timestamptz not null default now(),
  -- Ab Stufe 4 (echte Läden):
  lat           double precision,          -- Breitengrad (für die Karte)
  lng           double precision,          -- Längengrad (für die Karte)
  owner         text,                      -- Inhaberin (aus öffentlichem Impressum)
  rechtsform    text,                      -- z. B. "Einzelunternehmen", "GmbH"
  source        text,                      -- Beleg/Quelle (Impressum-Link)
  verified      boolean not null default false   -- true = geprüft ("sicher"), false = Kandidatin ("ungeprüft")
);

-- Falls die Tabelle schon existierte: neue Spalten nachrüsten.
alter table businesses add column if not exists lat        double precision;
alter table businesses add column if not exists lng        double precision;
alter table businesses add column if not exists owner      text;
alter table businesses add column if not exists rechtsform text;
alter table businesses add column if not exists source     text;
alter table businesses add column if not exists verified   boolean not null default false;

-- Supabase: öffentliches Lesen erlauben (die App darf die Liste laden)
alter table businesses enable row level security;
drop policy if exists "Public read businesses" on businesses;
create policy "Public read businesses"
  on businesses for select
  using (true);
