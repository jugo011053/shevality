-- Shevality – Startdaten: 20 echte Gastronomie-Läden in Frankfurt.
-- Stand: 14.07.2026 · Quelle: Impressum (öffentliche Primärquelle).
--
-- Wichtig zur Datenlogik:
--  - Belegt ist per Impressum nur die LEITUNG durch eine Frau  -> leadership = true
--  - Gründung/Eigentum sind NICHT geprüft                       -> founded = false, ownership = false
--  - verified = false kennzeichnet die 7 als "Kandidatin/ungeprüft" markierten Läden
--  - Inhaberinnen-Namen stammen aus dem öffentlichen Impressum des jeweiligen Betriebs.

insert into businesses
  (id, name, category, neighborhood, address, hours, image, website, description, lat, lng, owner, rechtsform, source, founded, ownership, leadership, verified) values
  ('g1','cà phê, ơi!','Café','Sachsenhausen','Textorstraße 80, 60596 Frankfurt am Main','','','https://www.capheoi.de/','Vietnamesisch inspiriertes Café in Sachsenhausen, 2023 eröffnet.',50.0999591,8.6815514,'Quynh Nhu Nguyen','Einzelunternehmen (aus Impressum abgeleitet)','https://www.capheoi.de/kontakt-impressum',false,false,true,true),
  ('g3','Home Ramen','Restaurant','Ostend','Pfingstweidstraße 12, 60316 Frankfurt am Main','','','https://www.home-ramen.de/','Ramen-Restaurant im Ostend.',50.1156387,8.6972451,'Qian Zhang','unklar','https://www.home-ramen.de/impressum/',false,false,true,true),
  ('g4','Charlot','Restaurant','Innenstadt','Opernplatz 10, 60313 Frankfurt am Main','','','','Restaurant am Opernplatz.',50.1155,8.6727,'Kerstin Schneider','GmbH & Co. KG','',false,false,true,true),
  ('g5','China Restaurant Yung 容龍酒家','Restaurant','Nordend','Oeder Weg 32, 60318 Frankfurt am Main','','','','Chinesisches Restaurant am Oeder Weg.',50.1201,8.6800,'Wai Wah Yung','unklar','',false,false,true,true),
  ('g6','Cocina Argentina','Restaurant','Ostend','Sonnemannstraße 3, 60314 Frankfurt am Main','','','','Argentinische Küche im Ostend.',50.1095,8.6968,'Fabiana Andrea Jarma','GmbH','',false,false,true,true),
  ('g7','Matildas Kitchen','Café','Westend-Nord','Grüneburgweg 86, 60323 Frankfurt am Main','','','https://www.matildaskitchen.de/','Café mit Salatbar, Kuchen und hausgemachten Marmeladen im Westend.',50.1222326,8.6682562,'Julia Hofmann','unklar','',false,false,true,true),
  ('g10','Startorante','Restaurant','Gallus','Rebstöcker Straße 49c, 60326 Frankfurt am Main','','','https://startorante.com/','Ausbildungsrestaurant im Gallus: Jugendliche lernen hier Kochen und Service.',50.0993,8.6285,'Claudia Feger','gGmbH (gemeinnützig)','',false,false,true,true),
  ('g65','The Place To Be','Bar','Altstadt','Weißadlergasse 3, 60311 Frankfurt am Main','','','','Bar in der Altstadt – direkt neben Souper!, beide von derselben Inhaberin.',50.1116,8.6789,'Daniela Gottschalk','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,true),
  ('g344','Worscht Company','Imbiss','Sachsenhausen','Schwanthalerstraße 38, 60594 Frankfurt am Main','','','','Imbiss in Sachsenhausen.',50.1012,8.6816,'Alexandra Bernhardi','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,true),
  ('g463','Souper!','Suppenküche','Altstadt','Weißadlergasse 3, 60311 Frankfurt am Main','','','http://www.souper.de','Suppenküche seit 2001, täglich frisch. Zweiter Betrieb derselben Inhaberin.',50.1116,8.6789,'Daniela Gottschalk','Einzelunternehmen','',false,false,true,true),
  ('g545','Gaststätte Momberger','Gaststätte','Heddernheim','Alt-Heddernheim 13, 60439 Frankfurt am Main','','','','Traditionelle Gaststätte in Heddernheim.',50.1586,8.6496,'Melanie Thurk','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,true),
  ('g710','Sampan','Restaurant','Nordend','Eckenheimer Landstraße 93, 60318 Frankfurt am Main','','','','Restaurant im Nordend.',50.1258,8.6856,'Michelle Yung','unklar','',false,false,true,true),
  ('g1229','Pizzeria Dick & Doof','Pizzeria','Sachsenhausen','Schweizer Straße 15, 60594 Frankfurt am Main','','','','Pizzeria in Sachsenhausen.',50.1042,8.6791,'Zvijezdana Di Liberto','unklar','',false,false,true,true),
  ('g107','Café Crumble','Café','Bockenheim','Kiesstraße 41, 60486 Frankfurt am Main','','','','Café in Bockenheim.',50.1196,8.6486,'Bettina Evans','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,false),
  ('g412','Pizzeria Charly Braun','Pizzeria','Bornheim','Röderbergweg 121, 60385 Frankfurt am Main','','','','Pizzeria am Röderbergweg.',50.1161,8.7103,'Carmela Santoro Barbuto','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,false),
  ('g432','KP21','Restaurant','Hausen','Bachmannstraße 2-4, 60488 Frankfurt am Main','','','','Restaurant in Hausen.',50.1314,8.6260,'Marzena Ferrara','unklar','',false,false,true,false),
  ('g627','Kanonesteppel','Gaststätte','Sachsenhausen','Textorstraße 20, 60594 Frankfurt am Main','','','','Apfelweinwirtschaft in Sachsenhausen.',50.1026,8.6884,'Petra Weck','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,false),
  ('g724','Holzkopp','Gaststätte','Nied','Spielmannstraße 26, 65934 Frankfurt am Main','','','','Gaststätte im Frankfurter Westen.',50.1000,8.5684,'Jennifer Yilmaz-Rölke','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,false),
  ('g759','Burger AG','Restaurant','Nieder-Eschbach','Homburger Landstraße 785, 60437 Frankfurt am Main','','','','Burger-Restaurant im Norden.',50.1907,8.6664,'Nadine Proft','unklar (Bezeichnung „Burger AG", kein Register)','',false,false,true,false),
  ('g826','Wirtshaus Gickelschlag','Gaststätte','Bornheim','Berger Straße 257, 60385 Frankfurt am Main','','','','Wirtshaus an der Berger Straße.',50.1288,8.7117,'Nicole Moser','Einzelunternehmen (aus Impressum abgeleitet)','',false,false,true,false)
on conflict (id) do nothing;
