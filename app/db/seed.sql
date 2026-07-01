-- Shevality – Startdaten (deine 8 Frankfurter Geschäfte)
-- Ebenfalls 1:1 in den Supabase SQL-Editor einfügbar.

insert into businesses (id, name, category, neighborhood, address, hours, image, founded, ownership, leadership) values
  ('b1', 'Drei Bohnen',     'Rösterei & Café',   'Nordend',       'Berger Str. 112',          'Di–Sa 8–18 Uhr',      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&q=80&auto=format&fit=crop', true,  true,  false),
  ('b7', 'Grünzeug',        'Unverpackt-Laden',  'Nordend',       'Eckenheimer Landstr. 60',  'Mo–Fr 9–19, Sa 9–16', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=640&q=80&auto=format&fit=crop', true,  true,  true),
  ('b2', 'Hang & Seite',    'Buchhandlung',      'Bornheim',      'Bornheimer Landstr. 45',   'Mo–Sa 10–19 Uhr',     'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=640&q=80&auto=format&fit=crop', false, true,  true),
  ('b6', 'Süß & Eigen',     'Konditorei',        'Bornheim',      'Berger Str. 78',           'Di–So 9–18 Uhr',      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=640&q=80&auto=format&fit=crop', false, true,  false),
  ('b3', 'Nadelöhr',        'Maßatelier',        'Sachsenhausen', 'Schweizer Str. 30',        'Mi–Fr 11–18 Uhr',     'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=640&q=80&auto=format&fit=crop', true,  true,  true),
  ('b8', 'Studio Mara',     'Friseur',           'Sachsenhausen', 'Brückenstr. 14',           'Di–Sa 10–19 Uhr',     'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=640&q=80&auto=format&fit=crop', false, false, true),
  ('b4', 'Blütenwerk',      'Floristik',         'Westend',       'Feldbergstr. 7',           'Mo–Sa 9–19 Uhr',      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=640&q=80&auto=format&fit=crop', true,  false, true),
  ('b5', 'Tonstudio Klara', 'Keramik-Werkstatt', 'Bockenheim',    'Leipziger Str. 22',        'Do–Sa 12–18 Uhr',     'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=640&q=80&auto=format&fit=crop', true,  true,  false)
on conflict (id) do nothing;
