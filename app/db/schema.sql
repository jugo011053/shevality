-- Shevality – Datenbank-Bauplan (Schema)
-- Diesen Code kannst du 1:1 in den Supabase SQL-Editor einfügen und ausführen.

-- Tabelle: Geschäfte (frauengeführte Betriebe)
create table if not exists businesses (
  id            text primary key,          -- z.B. 'b1'
  name          text not null,             -- "Drei Bohnen"
  category      text not null,             -- "Rösterei & Café"
  neighborhood  text not null,             -- "Nordend"
  address       text,                      -- "Berger Str. 112"
  hours         text,                      -- "Di–Sa 8–18 Uhr"
  image         text,                      -- Foto-URL
  website       text,                      -- optional
  description   text,                      -- optional: kurze Beschreibung
  instagram     text,                      -- optional
  founded       boolean not null default false,  -- Gegründet von einer Frau?
  ownership     boolean not null default false,  -- Mehrheitlich in Frauenbesitz?
  leadership    boolean not null default false,  -- Von einer Frau geleitet?
  created_at    timestamptz not null default now()
);

-- Supabase: öffentliches Lesen erlauben (die App darf die Liste laden)
alter table businesses enable row level security;
drop policy if exists "Public read businesses" on businesses;
create policy "Public read businesses"
  on businesses for select
  using (true);
