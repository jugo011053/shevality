// Shevality – Feed (neu, Stufe 5)
// Sechs Kartentypen, zweisprachig (DE/EN). "share" = die Teilbarkeits-Zeilen,
// die eine Karte auch als reiner Screenshot verständlich machen.

export type Lang = 'de' | 'en';
export type FeedTyp = 'zahl' | 'global_lokal' | 'portrait' | 'neu_gelistet' | 'event' | 'rueckschritt';
export type Klasse = 'A' | 'B' | 'C' | 'D';

export interface Bi {
  de: string;
  en: string;
}

export interface FeedSource {
  institution: string;
  year: string;
  url: string;
  url2?: string;
}

// Mini-Visualisierung für Statistik-Karten (schnell fürs Auge).
// - compare: zwei beschriftete Vergleichsbalken (z. B. Frauen vs. Männer)
// - delta:   ein direkt beschrifteter Chip (Richtung + Text), ohne Legende
export type ZahlViz =
  | { kind: 'compare'; a: { label: Bi; value: number; display: Bi }; b: { label: Bi; value: number; display: Bi } }
  | { kind: 'delta'; tone: 'up' | 'down' | 'flat'; text: Bi };

interface FeedBase {
  id: string;
  klasse: Klasse;
  datum: string; // YYYY-MM-DD
  headline: Bi;
  text: Bi;
  source: FeedSource;
  methodik?: Bi;
  share: { de: string[]; en: string[] };
  image?: string; // Beispiel-/Platzhalterbild (wird am Dateiende zugewiesen)
  // Optionaler Sprung in den Entdecken-Tab (Liste oder ein Geschäft)
  cta?: { label: Bi; businessId?: string };
}

export interface ZahlPost extends FeedBase {
  typ: 'zahl';
  stat: Bi; // dominante Zahl, z. B. "36 %"
  statSub?: Bi; // kleine Zeile unter der Zahl
  viz?: ZahlViz; // optionale Mini-Visualisierung
}
export interface GlobalLokalPost extends FeedBase {
  typ: 'global_lokal';
  steps: { scope: Bi; value: Bi; note: Bi }[];
}
export interface PortraitPost extends FeedBase {
  typ: 'portrait';
  businessId: string;
  motiv: Bi;
}
export interface NeuGelistetPost extends FeedBase {
  typ: 'neu_gelistet';
  businessId: string;
  businessName: string;
  owner: string;
  category: Bi;
  neighborhood: string;
}
export interface EventPost extends FeedBase {
  typ: 'event';
  day: string;
  month: Bi;
  when: Bi;
  place: Bi;
  cost?: Bi;
  registration?: Bi;
}
export interface RueckschrittPost extends FeedBase {
  typ: 'rueckschritt';
  handlung: Bi; // PFLICHT – wird immer gerendert
}

export type FeedPost =
  | ZahlPost
  | GlobalLokalPost
  | PortraitPost
  | NeuGelistetPost
  | EventPost
  | RueckschrittPost;

export const FEED_UI = {
  eyebrow: {
    zahl: { de: 'ZAHL DER WOCHE', en: 'NUMBER OF THE WEEK' },
    neu_gelistet: { de: 'NEU GELISTET', en: 'NEWLY LISTED' },
    global_lokal: { de: 'WELT · DEUTSCHLAND · FRANKFURT', en: 'WORLD · GERMANY · FRANKFURT' },
    portrait: { de: 'PORTRÄT', en: 'PORTRAIT' },
    event: { de: 'KOMMT BALD', en: 'COMING UP' },
    rueckschritt: { de: 'RÜCKSCHRITT', en: 'SETBACK' },
  },
  method: { de: 'Methodik', en: 'Methodology' },
  source: { de: 'Quelle', en: 'Source' },
  share: { de: 'Teilen', en: 'Share' },
  saved: { de: 'Gemerkt', en: 'Saved' },
  save: { de: 'Merken', en: 'Save' },
  copied: { de: 'Fertig ✓', en: 'Done ✓' },
  handlungTitle: { de: 'Was jetzt zählt', en: 'What matters now' },
  closing: {
    de: { title: 'Du bist auf dem Stand.', sub: 'Kein Endlos-Scroll. Das ist Haltung, kein Fehler.' },
    en: { title: "You're all caught up.", sub: 'No infinite scroll. That is a stance, not a bug.' },
  },
  tagline: { de: 'Frauengeführt in Frankfurt', en: 'Women-led in Frankfurt' },
};

export const FEED_POSTS: FeedPost[] = [
  {
    id: 'p1', typ: 'neu_gelistet', klasse: 'A', datum: '2026-07-13',
    businessId: 'g1', businessName: 'cà phê, ơi!', owner: 'Quynh Nhu Nguyen',
    category: { de: 'Café', en: 'Café' }, neighborhood: 'Sachsenhausen',
    headline: { de: 'Vietnamesische Kaffeekultur in Sachsenhausen', en: 'Vietnamese coffee culture in Sachsenhausen' },
    text: {
      de: 'Klein, warm, vietnamesisch: Bei cà phê, ơi! in der Textorstraße gibt es Frühstück, Mittagessen, Kuchen und richtig guten Kaffee – mit Aromen, die an Saigon erinnern. Ein Lieblingsplatz zum Bleiben in Sachsenhausen.',
      en: 'Small, warm, Vietnamese: cà phê, ơi! on Textorstraße serves breakfast, lunch, cake and seriously good coffee – with flavours that nod to Saigon. A cosy spot to linger in Sachsenhausen.',
    },
    source: { institution: 'Offizielles Impressum · Shevality-Prüfung', year: '2026', url: 'https://www.capheoi.de/kontakt-impressum' },
    methodik: {
      de: 'Website, Impressum, Name der Inhaberin und Betriebsadresse wurden abgeglichen. Die Angabe betrifft die im Impressum genannte Inhaberin, nicht eine darüber hinausgehende Eigentumsquote.',
      en: 'Website, legal notice, owner name and business address were cross-checked. The statement refers to the owner named in the legal notice, not a broader ownership share.',
    },
    cta: { label: { de: 'Im Entdecken ansehen', en: 'View in Discover' }, businessId: 'g1' },
    share: {
      de: ['NEU GELISTET', 'cà phê, ơi! · Sachsenhausen', 'Vietnamesisch inspiriertes Café', 'Frühstück, Kuchen & richtig guter Kaffee', 'von einer Frau geführt'],
      en: ['NEWLY LISTED', 'cà phê, ơi! · Sachsenhausen', 'Vietnamese-inspired café', 'Breakfast, cake & seriously good coffee', 'woman-led'],
    },
  },
  {
    id: 'p2', typ: 'neu_gelistet', klasse: 'A', datum: '2026-07-13',
    businessId: 'g6', businessName: 'Cocina Argentina', owner: 'Fabiana Andrea Jarma',
    category: { de: 'Restaurant', en: 'Restaurant' }, neighborhood: 'Ostend',
    headline: { de: 'Argentinische Küche, von einer Frau geführt', en: 'Argentine cuisine, led by a woman' },
    text: {
      de: 'Argentinisch essen im Ostend: Cocina Argentina an der Sonnemannstraße bringt Empanadas, Steaks und südamerikanische Gastfreundschaft nach Frankfurt. Gemütlich, herzlich und einen Besuch wert.',
      en: 'Argentine food in Ostend: Cocina Argentina on Sonnemannstraße brings empanadas, steaks and South American warmth to Frankfurt. Cosy, welcoming and worth a visit.',
    },
    source: { institution: 'Offizielles Impressum · Shevality-Prüfung', year: '2026', url: 'https://www.cocina-argentina.de/impressum/' },
    methodik: {
      de: 'Abgleich von Website, Gesellschaft, Geschäftsführung und Frankfurter Betriebsadresse.',
      en: 'Cross-check of website, company, management and Frankfurt business address.',
    },
    cta: { label: { de: 'Im Entdecken ansehen', en: 'View in Discover' }, businessId: 'g6' },
    share: {
      de: ['NEU GELISTET', 'Cocina Argentina · Ostend', 'Argentinische Küche in Frankfurt', 'Empanadas, Steaks & Gastfreundschaft', 'von einer Frau geführt'],
      en: ['NEWLY LISTED', 'Cocina Argentina · Ostend', 'Argentine cuisine in Frankfurt', 'Empanadas, steaks & hospitality', 'woman-led'],
    },
  },
  {
    id: 'pPortrait', typ: 'portrait', klasse: 'A', datum: '2026-07-13',
    businessId: 'g10', motiv: { de: 'Wo Jugendliche kochen lernen – geführt von einer Frau.', en: 'Where young people learn to cook – led by a woman.' },
    headline: { de: 'Startorante: ein Restaurant, das ausbildet', en: 'Startorante: a restaurant that trains' },
    text: {
      de: 'Im Gallus lernen Jugendliche bei Startorante Kochen und Service. Die gemeinnützige gGmbH wird laut Impressum von Claudia Feger geführt.',
      en: 'At Startorante in Frankfurt-Gallus, young people learn cooking and service. The non-profit is led, per its legal notice, by Claudia Feger.',
    },
    source: { institution: 'Offizielles Impressum · Shevality-Prüfung', year: '2026', url: 'https://startorante.com/' },
    cta: { label: { de: 'Ansehen', en: 'View' }, businessId: 'g10' },
    share: {
      de: ['PORTRÄT', 'Startorante · Gallus', 'Ausbildungsrestaurant, von einer Frau geleitet', 'Geschäftsführerin laut Impressum: Claudia Feger'],
      en: ['PORTRAIT', 'Startorante · Gallus', 'Training restaurant, led by a woman', 'Managing director per legal notice: Claudia Feger'],
    },
  },
  {
    id: 'p3', typ: 'zahl', klasse: 'B', datum: '2026-07-10',
    stat: { de: '36 %', en: '36%' }, statSub: { de: 'Langjähriger Durchschnitt: 39 %', en: 'Long-term average: 39%' },
    headline: { de: '36 Prozent der Gründenden sind Frauen', en: '36 percent of founders are women' },
    text: {
      de: '2024 wurden in Deutschland rund 585.000 selbstständige Tätigkeiten begonnen, drei Prozent mehr als im Vorjahr. Der Anteil der Gründerinnen sank jedoch auf 36 Prozent – unter dem langjährigen Durchschnitt von 39 Prozent.',
      en: 'Around 585,000 business activities were started in Germany in 2024, three percent more than the year before. Yet women accounted for only 36 percent of founders – below the long-term average of 39 percent.',
    },
    source: { institution: 'KfW-Gründungsmonitor', year: '2025', url: 'https://www.kfw.de/About-KfW/Newsroom/Latest-News/Pressemitteilungen-Details_851968.html' },
    methodik: {
      de: 'Der KfW-Gründungsmonitor erfasst Personen, die eine selbstständige Tätigkeit begonnen haben – nicht nur technologieorientierte Start-ups. Deshalb weicht er von klassischen Start-up-Statistiken ab.',
      en: 'The KfW start-up monitor counts people who began a self-employed activity – not only tech start-ups. It therefore differs from classic start-up statistics.',
    },
    share: {
      de: ['36 %', 'So hoch war der Frauenanteil unter den Gründenden in Deutschland 2024.', 'Langjähriger Durchschnitt: 39 %', 'Quelle: KfW-Gründungsmonitor 2025'],
      en: ['36%', 'Women’s share of founders in Germany in 2024.', 'Long-term average: 39%', 'Source: KfW start-up monitor 2025'],
    },
  },
  {
    id: 'pGlobalLokal', typ: 'global_lokal', klasse: 'B', datum: '2026-07-10',
    headline: { de: 'Von der Welt bis vor deine Haustür', en: 'From the world to your doorstep' },
    text: {
      de: 'Gleichstellung wird von oben nach unten sichtbar – und lokal veränderbar.',
      en: 'Equality becomes visible from the top down – and changeable locally.',
    },
    steps: [
      { scope: { de: 'Welt', en: 'World' }, value: { de: '67 %', en: '67%' }, note: { de: 'der wirtschaftlichen Rechte von Männern besitzen Frauen weltweit (World Bank, 2026).', en: 'of men’s legal economic rights are held by women worldwide (World Bank, 2026).' } },
      { scope: { de: 'Deutschland', en: 'Germany' }, value: { de: '14,3 %', en: '14.3%' }, note: { de: 'der kleinen und mittleren Unternehmen wurden 2024 von einer Frau geführt (KfW).', en: 'of small and medium businesses were led by a woman in 2024 (KfW).' } },
      { scope: { de: 'Frankfurt', en: 'Frankfurt' }, value: { de: '20', en: '20' }, note: { de: 'frauengeführte Läden kannst du hier gerade entdecken – und heute besuchen.', en: 'women-led places you can discover here right now – and visit today.' } },
    ],
    source: { institution: 'World Bank (Women, Business and the Law) · KfW', year: '2025/2026', url: 'https://wbl.worldbank.org/', url2: 'https://www.kfw.de/About-KfW/Newsroom/Latest-News/Pressemitteilungen-Details_841536.html' },
    cta: { label: { de: 'Frankfurter Läden entdecken', en: 'Discover Frankfurt places' } },
    share: {
      de: ['WELT → DEUTSCHLAND → FRANKFURT', 'Welt: Frauen haben 67 % der wirtschaftlichen Rechte von Männern.', 'Deutschland: 14,3 % der KMU von Frauen geführt.', 'Frankfurt: 20 frauengeführte Läden auf Shevality.'],
      en: ['WORLD → GERMANY → FRANKFURT', 'World: women hold 67% of men’s economic rights.', 'Germany: 14.3% of SMEs led by women.', 'Frankfurt: 20 women-led places on Shevality.'],
    },
  },
  {
    id: 'p4', typ: 'zahl', klasse: 'B', datum: '2026-07-09',
    stat: { de: '14,3 %', en: '14.3%' }, statSub: { de: '2022 waren es noch 19,7 %', en: 'In 2022 it was still 19.7%' },
    headline: { de: 'Nur jedes siebte KMU wird von einer Frau geführt', en: 'Only one in seven SMEs is led by a woman' },
    text: {
      de: '2024 wurden nur 14,3 Prozent der rund 3,84 Millionen kleinen und mittleren Unternehmen in Deutschland von einer Frau geführt. Zwei Jahre zuvor lag der Anteil noch bei 19,7 Prozent.',
      en: 'In 2024, women led only 14.3 percent of Germany’s roughly 3.84 million small and medium-sized businesses. Two years earlier the share was still 19.7 percent.',
    },
    source: { institution: 'KfW-Mittelstandspanel', year: '2025', url: 'https://www.kfw.de/About-KfW/Newsroom/Latest-News/Pressemitteilungen-Details_841536.html' },
    methodik: {
      de: 'Das KfW-Mittelstandspanel untersucht bestehende KMU. Die Zahl ist nicht mit dem Frauenanteil unter den jährlichen Neugründungen gleichzusetzen und erklärt nicht, warum sich der Anteil verändert hat.',
      en: 'The KfW SME panel surveys existing SMEs. The figure is not the same as women’s share of yearly new foundations and does not explain why the share changed.',
    },
    share: {
      de: ['14,3 %', 'Nur etwa jedes siebte deutsche KMU wurde 2024 von einer Frau geführt.', '2022 waren es noch 19,7 %.', 'Quelle: KfW-Mittelstandspanel 2025'],
      en: ['14.3%', 'Only about one in seven German SMEs was led by a woman in 2024.', 'In 2022 it was still 19.7%.', 'Source: KfW SME panel 2025'],
    },
  },
  {
    id: 'p5', typ: 'zahl', klasse: 'B', datum: '2026-07-08',
    stat: { de: '16 %', en: '16%' }, statSub: { de: 'Frauen 22,81 € · Männer 27,05 € pro Stunde', en: 'Women €22.81 · men €27.05 per hour' },
    headline: { de: 'Die Lohnlücke bleibt bei 16 Prozent', en: 'The pay gap stays at 16 percent' },
    text: {
      de: 'Frauen verdienten 2025 in Deutschland durchschnittlich 22,81 Euro brutto pro Stunde, Männer 27,05 Euro. Der unbereinigte Gender Pay Gap blieb damit bei 16 Prozent – rund 4,24 Euro pro Stunde.',
      en: 'In 2025, women in Germany earned on average €22.81 gross per hour, men €27.05. The unadjusted gender pay gap thus stayed at 16 percent – about €4.24 per hour.',
    },
    source: { institution: 'Statistisches Bundesamt (Destatis)', year: '2025', url: 'https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/12/PD25_453_621.html' },
    methodik: {
      de: 'Der unbereinigte Gender Pay Gap vergleicht die durchschnittlichen Bruttostundenverdienste aller Beschäftigten. Unterschiede bei Berufen, Branchen, Positionen und Erwerbsbiografien werden nicht herausgerechnet.',
      en: 'The unadjusted gap compares average gross hourly earnings of all employees. Differences in occupation, sector, position and work history are not removed.',
    },
    share: {
      de: ['16 % Lohnlücke', 'Frauen: 22,81 € pro Stunde', 'Männer: 27,05 € pro Stunde', 'Deutschland, 2025 · Quelle: Statistisches Bundesamt'],
      en: ['16% pay gap', 'Women: €22.81 per hour', 'Men: €27.05 per hour', 'Germany, 2025 · Source: Destatis'],
    },
  },
  {
    id: 'p6', typ: 'zahl', klasse: 'B', datum: '2026-07-07',
    stat: { de: '1 Std 16 Min', en: '1 hr 16 min' }, statSub: { de: 'mehr unbezahlte Arbeit pro Tag', en: 'more unpaid work per day' },
    headline: { de: 'Der Arbeitstag endet für Frauen später', en: 'The workday ends later for women' },
    text: {
      de: 'Frauen leisteten 2022 durchschnittlich eine Stunde und 16 Minuten mehr unbezahlte Arbeit pro Tag als Männer. Der Abstand ist kleiner geworden, bleibt aber bei Haushalt, Kinderbetreuung, Pflege und Ehrenamt deutlich.',
      en: 'In 2022, women performed on average one hour and 16 minutes more unpaid work per day than men. The gap has narrowed but remains substantial across housework, childcare, care and volunteering.',
    },
    source: { institution: 'Statistisches Bundesamt · Zeitverwendungserhebung', year: '2022', url: 'https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Zeitverwendung/Ergebnisse/_inhalt.html' },
    methodik: {
      de: 'Tagebuchbasierte Zeitverwendungserhebung bei Personen ab 18 Jahren. Erfasst wird unbezahlte Arbeit unabhängig davon, ob die Person zusätzlich erwerbstätig ist.',
      en: 'Diary-based time-use survey of people aged 18+. Unpaid work is recorded regardless of whether the person is also employed.',
    },
    share: {
      de: ['1 Stunde 16 Minuten', 'So viel mehr unbezahlte Arbeit leisten Frauen durchschnittlich pro Tag.', 'Deutschland, 2022 · Quelle: Statistisches Bundesamt'],
      en: ['1 hour 16 minutes', 'That much more unpaid work women do on average per day.', 'Germany, 2022 · Source: Destatis'],
    },
  },
  {
    id: 'p7', typ: 'zahl', klasse: 'B', datum: '2026-07-06',
    stat: { de: '36 %', en: '36%' }, statSub: { de: 'Mit Hinterbliebenenleistungen: 24,2 %', en: 'Incl. survivors’ benefits: 24.2%' },
    headline: { de: 'Frauen erhalten 36 Prozent weniger eigenes Alterseinkommen', en: 'Women receive 36 percent less retirement income of their own' },
    text: {
      de: 'Frauen ab 65 Jahren verfügten 2025 im Durchschnitt über 36 Prozent weniger eigene Alterseinkünfte als Männer. Werden Hinterbliebenenrenten einbezogen, beträgt die Lücke noch 24,2 Prozent.',
      en: 'In 2025, women aged 65+ had on average 36 percent less retirement income of their own than men. Including survivors’ pensions, the gap is 24.2 percent.',
    },
    source: { institution: 'Statistisches Bundesamt · Gender Pension Gap', year: '2025', url: 'https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Lebensbedingungen-Armutsgefaehrdung/Tabellen/einkommen-gender-pension-gap.html' },
    methodik: {
      de: 'Auswertung der EU-SILC-Erhebung für Personen ab 65 Jahren mit Alterseinkünften. Der Abstand bezieht sich auf durchschnittliche Bruttojahreseinkommen und bildet ganze Erwerbsbiografien ab.',
      en: 'Analysis of the EU-SILC survey for people aged 65+ with retirement income. The gap refers to average gross annual income and reflects whole working lives.',
    },
    share: {
      de: ['36 % Rentenlücke', 'So viel niedriger sind die eigenen Alterseinkünfte von Frauen.', 'Mit Hinterbliebenenleistungen: 24,2 %', 'Quelle: Destatis, 2025'],
      en: ['36% pension gap', 'How much lower women’s own retirement income is.', 'Incl. survivors’ benefits: 24.2%', 'Source: Destatis, 2025'],
    },
  },
  {
    id: 'p8', typ: 'zahl', klasse: 'B', datum: '2026-07-05',
    stat: { de: '19,5 %', en: '19.5%' }, statSub: { de: '2015: 16,5 %', en: '2015: 16.5%' },
    headline: { de: 'In Tech bleibt vier von fünf Stellen männlich besetzt', en: 'In tech, four of five jobs stay male' },
    text: {
      de: 'Frauen stellten 2025 nur 19,5 Prozent der IT-Fachkräfte in der EU – drei Prozentpunkte mehr als 2015. Unter Wissenschaftlerinnen und Ingenieurkräften lag ihr Anteil 2024 bei 40,5 Prozent, in der Industrie jedoch nur bei 22,4 Prozent.',
      en: 'Women made up only 19.5 percent of ICT specialists in the EU in 2025 – three points more than in 2015. Among scientists and engineers their share reached 40.5 percent in 2024, but only 22.4 percent in manufacturing.',
    },
    source: { institution: 'Eurostat', year: '2025', url: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260527-2', url2: 'https://ec.europa.eu/eurostat/web/products-eurostat-news/w/edn-20260211-1' },
    methodik: {
      de: 'Beschäftigungsdaten nach beruflicher Tätigkeit und Wirtschaftsbereich. Die Zahlen beziehen sich auf Erwerbstätige, nicht auf Studienabschlüsse oder Ausbildungsplätze.',
      en: 'Employment data by occupation and sector. Figures refer to people in work, not degrees or training places.',
    },
    share: {
      de: ['19,5 %', 'So hoch war der Frauenanteil unter den IT-Fachkräften der EU 2025.', '2015: 16,5 %', 'Quelle: Eurostat'],
      en: ['19.5%', 'Women’s share of EU ICT specialists in 2025.', '2015: 16.5%', 'Source: Eurostat'],
    },
  },
  {
    id: 'p9', typ: 'zahl', klasse: 'B', datum: '2026-07-04',
    stat: { de: '68', en: '68' }, statSub: { de: 'Staaten haben 2023–2025 reformiert', en: 'economies reformed 2023–2025' },
    headline: { de: '68 Staaten haben wirtschaftliche Frauenrechte gestärkt', en: '68 economies strengthened women’s economic rights' },
    text: {
      de: 'Zwischen 2023 und 2025 verbesserten 68 Volkswirtschaften ihre Gesetze zur wirtschaftlichen Gleichstellung. Weltweit erreichen Frauen dennoch nur 67 Prozent der gesetzlichen wirtschaftlichen Rechte von Männern; bei der Umsetzung sind erst 47 Prozent der nötigen Systeme vorhanden.',
      en: 'Between 2023 and 2025, 68 economies reformed laws on women’s economic equality. Globally, women still hold only 67 percent of men’s legal economic rights; only 47 percent of the systems to enforce them are in place.',
    },
    source: { institution: 'World Bank · Women, Business and the Law', year: '2026', url: 'https://wbl.worldbank.org/' },
    methodik: {
      de: 'Vergleich von Gesetzen, unterstützenden Institutionen und ihrer Durchsetzung in 187 Volkswirtschaften. Der Index bewertet formale Rahmenbedingungen, keine individuellen Erfahrungen.',
      en: 'Comparison of laws, supporting institutions and enforcement across 187 economies. The index rates formal frameworks, not individual experiences.',
    },
    share: {
      de: ['68 Staaten haben reformiert.', 'Trotzdem besitzen Frauen weltweit erst 67 % der wirtschaftlichen Rechte von Männern.', 'Umsetzungssysteme vorhanden: 47 %', 'Quelle: World Bank, 2026'],
      en: ['68 economies reformed.', 'Yet women worldwide hold only 67% of men’s economic rights.', 'Enforcement systems in place: 47%', 'Source: World Bank, 2026'],
    },
  },
  {
    id: 'p10', typ: 'zahl', klasse: 'B', datum: '2026-07-03',
    stat: { de: 'Fast 40 %', en: 'Almost 40%' }, statSub: { de: 'Über alle Board-Positionen: etwa ein Drittel', en: 'Across all board roles: about one third' },
    headline: { de: 'Europas größte Unternehmen bewegen sich Richtung Parität', en: 'Europe’s largest firms move toward parity' },
    text: {
      de: 'Im Oktober 2025 waren knapp 40 Prozent der nicht geschäftsführenden Aufsichtsratsmitglieder großer börsennotierter EU-Unternehmen Frauen. Über alle Leitungsfunktionen hinweg lag ihr Anteil jedoch erst bei etwa einem Drittel.',
      en: 'By October 2025, women held almost 40 percent of non-executive board seats in the EU’s largest listed firms. Across all board roles, their share was still only about one third.',
    },
    source: { institution: 'European Institute for Gender Equality (EIGE)', year: '2025', url: 'https://eige.europa.eu/newsroom/director-corner/after-decade-making-conversation-gender-balance-corporate-boards-directive-continues?language_content_entity=en' },
    methodik: {
      de: 'EIGE erfasst die größten börsennotierten Unternehmen der EU. Die Zahl gilt nicht für alle Unternehmen und unterscheidet zwischen nicht geschäftsführenden und operativen Leitungsrollen.',
      en: 'EIGE covers the EU’s largest listed firms. The figure does not apply to all companies and distinguishes non-executive from executive roles.',
    },
    share: {
      de: ['Fast 40 %', 'Frauenanteil in den nicht geschäftsführenden Boards großer EU-Unternehmen.', 'Über alle Board-Positionen: etwa ein Drittel', 'Quelle: EIGE, Oktober 2025'],
      en: ['Almost 40%', 'Women’s share of non-executive boards at large EU firms.', 'Across all board roles: about one third', 'Source: EIGE, October 2025'],
    },
  },
  {
    id: 'p11', typ: 'event', klasse: 'C', datum: '2026-08-20',
    day: '20', month: { de: 'Aug', en: 'Aug' },
    when: { de: '20. August 2026 · 09:15–16:00 Uhr', en: '20 August 2026 · 9:15am–4pm' },
    place: { de: 'IHK Frankfurt am Main', en: 'Frankfurt Chamber of Commerce' },
    cost: { de: 'kostenfrei', en: 'free' },
    registration: { de: 'Anmeldung bis 12.08.2026', en: 'Registration until 12 Aug 2026' },
    headline: { de: 'Hessens Unternehmerinnen treffen sich in Frankfurt', en: 'Hesse’s women entrepreneurs meet in Frankfurt' },
    text: {
      de: 'Am 20. August 2026 findet der 25. Hessische Unternehmerinnentag statt. Themen: Finanzierung, Wachstum unter knappen Ressourcen, künstliche Intelligenz, Kooperationen und die Verleihung des Hessischen Unternehmerinnenpreises.',
      en: 'The 25th Hessian Women Entrepreneurs’ Day takes place on 20 August 2026. Topics: financing, growth under scarce resources, artificial intelligence, alliances and the Hessian Women Entrepreneurs’ Award.',
    },
    source: { institution: 'jumpp · Hessisches Wirtschaftsministerium', year: '2026', url: 'https://www.jumpp.de/utag2026' },
    share: {
      de: ['25. HESSISCHER UNTERNEHMERINNENTAG', '20. August 2026, 09:15–16:00 Uhr', 'IHK Frankfurt', 'Finanzierung, Wachstum, KI und Netzwerke', 'Teilnahme kostenfrei'],
      en: ['25TH HESSIAN WOMEN ENTREPRENEURS’ DAY', '20 August 2026, 9:15am–4pm', 'Frankfurt Chamber of Commerce', 'Financing, growth, AI and networks', 'Free to attend'],
    },
  },
  {
    id: 'p12', typ: 'event', klasse: 'C', datum: '2026-08-07',
    day: '04', month: { de: 'Jul', en: 'Jul' },
    when: { de: '4. Juli – 7. August 2026', en: '4 July – 7 August 2026' },
    place: { de: 'Moya Café, Adalbertstraße 11, Frankfurt', en: 'Moya Café, Adalbertstraße 11, Frankfurt' },
    cost: { de: 'Eintritt frei', en: 'Free entry' },
    headline: { de: 'Wenn künstliche Intelligenz Frauenbilder erzeugt', en: 'When AI generates images of women' },
    text: {
      de: 'Die Ausstellung „Prompted Realities" stellt Fotografien realer Frauen Bildern gegenüber, die mit künstlicher Intelligenz erzeugt wurden – und macht so stereotype, verzerrte Vorstellungen sichtbar.',
      en: '“Prompted Realities” contrasts photographs of real women with AI-generated images, making visible the stereotypes and distortions in how technology depicts women.',
    },
    source: { institution: 'Frauenreferat Frankfurt', year: '2026', url: 'https://www.info.frauenreferat.frankfurt.de/news_aktuell.html' },
    share: {
      de: ['PROMPTED REALITIES', 'Wie sieht künstliche Intelligenz Frauen?', 'Ausstellung bis 7. August 2026', 'Moya Café, Adalbertstraße 11', 'Eintritt frei'],
      en: ['PROMPTED REALITIES', 'How does AI see women?', 'Exhibition until 7 August 2026', 'Moya Café, Adalbertstraße 11', 'Free entry'],
    },
  },
  {
    id: 'p13', typ: 'event', klasse: 'C', datum: '2026-08-08',
    day: '08', month: { de: 'Aug', en: 'Aug' },
    when: { de: '8. August 2026 · Treffen 13 Uhr, Abfahrt 14 Uhr', en: '8 August 2026 · meet 1pm, start 2pm' },
    place: { de: 'Goetheplatz, Frankfurt', en: 'Goetheplatz, Frankfurt' },
    cost: { de: 'etwa 15 Kilometer', en: 'about 15 kilometres' },
    headline: { de: 'Frankfurt fährt gemeinsam Rad', en: 'Frankfurt rides together' },
    text: {
      de: 'Am 8. August 2026 startet in Frankfurt erstmals ein Fancy Women Bike Ride. Die rund 15 Kilometer lange gemeinsame Fahrt macht Frauen im öffentlichen Raum sichtbar – ohne Bestzeiten oder Spezialausrüstung.',
      en: 'On 8 August 2026, Frankfurt hosts its first Fancy Women Bike Ride. The relaxed 15-kilometre ride makes women visible in public space – no racing times or special gear needed.',
    },
    source: { institution: 'Frauenreferat Frankfurt · Fahrradnetzwerke', year: '2026', url: 'https://www.info.frauenreferat.frankfurt.de/news_aktuell.html' },
    share: {
      de: ['FANCY WOMEN BIKE RIDE FRANKFURT', '8. August 2026', 'Treffen 13 Uhr, Goetheplatz', '15 Kilometer gemeinsam durch die Stadt'],
      en: ['FANCY WOMEN BIKE RIDE FRANKFURT', '8 August 2026', 'Meet 1pm, Goetheplatz', '15 kilometres together through the city'],
    },
  },
  {
    id: 'p14', typ: 'zahl', klasse: 'D', datum: '2026-02-14',
    stat: { de: 'Ab 2032', en: 'From 2032' }, statSub: { de: 'Ausbau der Hilfenetze ab 2027', en: 'Services expand from 2027' },
    headline: { de: 'Schutz vor Gewalt wird zum Rechtsanspruch', en: 'Protection from violence becomes a legal right' },
    text: {
      de: 'Mit dem Gewalthilfegesetz gibt es erstmals einen bundesweiten Rechtsanspruch auf kostenlose Schutz- und Beratungsangebote für von Gewalt betroffene Frauen. Die Länder bauen ihre Hilfenetze ab 2027 aus; der individuelle Rechtsanspruch beginnt am 1. Januar 2032.',
      en: 'Germany’s Violence Assistance Act creates a nationwide legal right to free protection and counselling for women affected by violence. States expand services from 2027; the individual entitlement starts on 1 January 2032.',
    },
    source: { institution: 'Deutscher Bundestag · Bundesrat', year: '2025', url: 'https://www.bundestag.de/dokumente/textarchiv/2025/kw05-de-sexuelle-gewalt-1042042', url2: 'https://www.bundesrat.de/DE/plenum/bundesrat-kompakt/25/1051/1051-pk.html' },
    methodik: {
      de: 'Beschluss von Bundestag (31.01.2025) und Bundesrat (14.02.2025). Entscheidend ist die Umsetzung: ob Frauenhausplätze, Beratungsstellen und Finanzierung bereits vor 2032 erreichbar werden.',
      en: 'Adopted by the Bundestag (31 Jan 2025) and Bundesrat (14 Feb 2025). What matters is delivery: whether shelter places, counselling and funding become available before 2032.',
    },
    share: {
      de: ['SCHUTZ WIRD ZUM RECHT', 'Ausbau der Hilfenetze ab 2027', 'Rechtsanspruch auf kostenlose Hilfe ab 2032', 'Quelle: Gewalthilfegesetz'],
      en: ['PROTECTION BECOMES A RIGHT', 'Services expand from 2027', 'Legal right to free help from 2032', 'Source: Violence Assistance Act'],
    },
  },
  {
    id: 'p15', typ: 'rueckschritt', klasse: 'D', datum: '2026-05-27',
    headline: { de: 'Deutschland verschleppt mehr Lohntransparenz', en: 'Germany delays more pay transparency' },
    text: {
      de: 'Die EU-Entgelttransparenzrichtlinie musste bis zum 7. Juni 2026 in deutsches Recht umgesetzt werden. Noch am 27. Mai hieß es, der Gesetzentwurf befinde sich erst in der Frühkoordinierung – obwohl die Richtlinie Gehaltsspannen für Bewerbende, stärkere Auskunftsrechte und Berichtspflichten vorsieht.',
      en: 'The EU Pay Transparency Directive had to be transposed into German law by 7 June 2026. On 27 May, the government said the draft was still in early coordination – despite the directive requiring salary ranges, stronger information rights and reporting duties.',
    },
    source: { institution: 'Bundesregierung · BMBFSFJ', year: '2026', url: 'https://www.bundesregierung.de/breg-de/aktuelles/regierungspressekonferenz-vom-27-mai-2026-2433512', url2: 'https://www.bmbfsfj.bund.de/resource/blob/273774/d4fc78ee064e0245f8f4b25ae9efc3/abschlussbericht-kommission-etrl-data.pdf' },
    handlung: {
      de: 'Beschäftigte, Betriebsräte und Netzwerke können schon jetzt Gehaltskriterien sichtbar machen, Vergleichsdaten sammeln und den Gesetzgebungsprozess verfolgen. Der aktuelle Stand sollte vor jeder Weiterverbreitung tagesgenau geprüft werden.',
      en: 'Employees, works councils and networks can already make pay criteria visible, gather comparison data and track the legislative process. The current status should be checked to the day before sharing further.',
    },
    share: {
      de: ['7. JUNI 2026: EU-FRIST FÜR MEHR LOHNTRANSPARENZ', 'Zehn Tage vorher war Deutschlands Entwurf erst in Frühkoordinierung.', 'Jetzt: Umsetzung verfolgen und Gehaltssysteme sichtbar machen.', 'Quelle: Bundesregierung und BMBFSFJ'],
      en: ['7 JUNE 2026: EU DEADLINE FOR PAY TRANSPARENCY', 'Ten days earlier, Germany’s draft was still in early coordination.', 'Now: track delivery and make pay systems visible.', 'Source: German government and BMBFSFJ'],
    },
  },
];

// Dezente Akzentfarbe je Rubrik (Karten bleiben weiß).
export const FEED_ACCENT: Record<FeedTyp, string> = {
  zahl: '#7b5fb8',          // Lila
  neu_gelistet: '#5b8a6f',  // Grün
  global_lokal: '#b06a4f',  // Terracotta
  portrait: '#a86b88',      // Rosé
  event: '#c1894f',         // Pfirsich/Gold
  rueckschritt: '#6d5a67',  // gedämpftes Plum
};

// Beispiel-/Platzhalterbilder (Stockfotos). Fällt ein Bild aus, greift
// automatisch das Streifenmuster der Bildkomponente.
const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;
const IMG = {
  coffee: U('1495474472287-4d71bcdd2085'),
  bakery: U('1509440159596-0249088772ff'),
  market: U('1542838132-92c53300491e'),
  finance: U('1554224155-6726b3ff858f'),
  hands: U('1573497491765-dccce02b29df'),
  parliament: U('1541872703-74c5e44368f9'),
  restaurant: U('1414235077428-338989a2e8c0'),
  city: U('1467269204594-9661b134dd2b'),
  people: U('1522071820081-009f0129c71c'),
  bike: U('1485965120184-e220f721d03e'),
  gallery: U('1531058020387-3be344556be6'),
  tech: U('1518770660439-4636190af475'),
};

const IMAGE_BY_ID: Record<string, string> = {
  p1: IMG.coffee, p2: IMG.restaurant, pPortrait: IMG.bakery,
  p3: IMG.hands, pGlobalLokal: IMG.city, p4: IMG.finance, p5: IMG.finance,
  p6: IMG.hands, p7: IMG.hands, p8: IMG.tech, p9: IMG.parliament, p10: IMG.finance,
  p11: IMG.people, p12: IMG.gallery, p13: IMG.bike, p14: IMG.parliament, p15: IMG.finance,
};

const VIZ_BY_ID: Record<string, ZahlViz> = {
  p3: { kind: 'delta', tone: 'down', text: { de: '3 Punkte unter dem langjährigen Schnitt (39 %)', en: '3 points below the long-term average (39%)' } },
  p4: { kind: 'delta', tone: 'down', text: { de: '−5,4 Punkte seit 2022 (19,7 %)', en: '−5.4 points since 2022 (19.7%)' } },
  p5: { kind: 'compare', a: { label: { de: 'Frauen', en: 'Women' }, value: 22.81, display: { de: '22,81 €', en: '€22.81' } }, b: { label: { de: 'Männer', en: 'Men' }, value: 27.05, display: { de: '27,05 €', en: '€27.05' } } },
  p7: { kind: 'delta', tone: 'flat', text: { de: 'mit Hinterbliebenenrenten: 24,2 %', en: 'incl. survivors’ pensions: 24.2%' } },
  p8: { kind: 'delta', tone: 'up', text: { de: '+3 Punkte seit 2015 (16,5 %)', en: '+3 points since 2015 (16.5%)' } },
  p10: { kind: 'delta', tone: 'flat', text: { de: 'über alle Board-Rollen: nur etwa ein Drittel', en: 'across all board roles: only about a third' } },
};

FEED_POSTS.forEach((p) => {
  if (IMAGE_BY_ID[p.id]) p.image = IMAGE_BY_ID[p.id];
  if (p.typ === 'zahl' && VIZ_BY_ID[p.id]) p.viz = VIZ_BY_ID[p.id];
});

// Mischen: Typen gleichmäßig verteilen, sodass möglichst nie zwei Karten
// desselben Typs direkt hintereinander stehen. Wählt in jedem Schritt den
// häufigsten noch übrigen Typ (der nicht dem letzten entspricht) – so
// verteilt sich z. B. die große Zahl-Gruppe über den ganzen Feed.
export function mixFeed(posts: FeedPost[]): FeedPost[] {
  const remaining = posts.slice();
  const out: FeedPost[] = [];
  while (remaining.length) {
    const lastTyp = out.length ? out[out.length - 1].typ : null;
    const counts: Record<string, number> = {};
    remaining.forEach((p) => (counts[p.typ] = (counts[p.typ] || 0) + 1));
    let candidates = remaining.filter((p) => p.typ !== lastTyp);
    if (!candidates.length) candidates = remaining.slice();
    candidates.sort(
      (a, b) => counts[b.typ] - counts[a.typ] || remaining.indexOf(a) - remaining.indexOf(b),
    );
    const chosen = candidates[0];
    out.push(chosen);
    remaining.splice(remaining.indexOf(chosen), 1);
  }
  return out;
}

// Rhythmus-Regel: nie zwei "rueckschritt" hintereinander; höchstens jede dritte
// Karte darf "rueckschritt" sein. Ansonsten Reihenfolge (redaktioneller Wert) lassen.
export function orderFeed(posts: FeedPost[]): FeedPost[] {
  const out = posts.slice();
  const isBack = (p: FeedPost) => p.typ === 'rueckschritt';
  for (let i = 0; i < out.length; i++) {
    if (!isBack(out[i])) continue;
    const prevBack = i > 0 && isBack(out[i - 1]);
    const tooDense = i >= 2 && (isBack(out[i - 1]) || isBack(out[i - 2]));
    if (prevBack || tooDense) {
      // nächste Nicht-Rückschritt-Karte suchen und tauschen
      let j = i + 1;
      while (j < out.length && isBack(out[j])) j++;
      if (j < out.length) {
        const [moved] = out.splice(j, 1);
        out.splice(i, 0, moved);
      } else {
        console.warn('[Feed] Rhythmus-Regel für rueckschritt konnte nicht vollständig eingehalten werden.');
        break;
      }
    }
  }
  return out;
}
