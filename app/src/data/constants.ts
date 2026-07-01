import { colors } from '../theme/colors';
import { Business, Contact, CritKey, FeedCategory, FeedItem, FeedTabKey } from './types';

export const CRIT: Record<CritKey, { label: string; short: string; basis: string }> = {
  founded: { label: 'Gegründet von einer Frau', short: 'Gegründet', basis: 'Handelsregister-Eintrag geprüft' },
  ownership: { label: 'Mehrheitlich in Frauenbesitz', short: 'Frauenbesitz', basis: 'Eigentumsnachweis (> 50 %) geprüft' },
  leadership: { label: 'Von einer Frau geleitet', short: 'Geleitet', basis: 'Geschäftsführung bestätigt' },
};

export const FEED_TABS: { key: FeedTabKey; label: string }[] = [
  { key: 'fuer-dich', label: 'Für dich' },
  { key: 'lokal', label: 'Lokal' },
  { key: 'welt', label: 'Welt' },
  { key: 'wissen', label: 'Wissen' },
  { key: 'gemerkt', label: 'Gemerkt' },
];

export const CAT: Record<FeedCategory, { label: string; dot: string }> = {
  lokal: { label: 'LOKAL', dot: '#c08a72' },
  welt: { label: 'WELT', dot: colors.purple },
  wissen: { label: 'WISSEN', dot: colors.green },
};

export const AVATAR_COLORS = ['#c9a7e0', '#e3b9aa', '#8fb3a0', '#d3a9bb', '#a88fce'];

const IMG = {
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640&q=80&auto=format&fit=crop',
  book: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=640&q=80&auto=format&fit=crop',
  atelier: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=640&q=80&auto=format&fit=crop',
  flowers: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=640&q=80&auto=format&fit=crop',
  pottery: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=640&q=80&auto=format&fit=crop',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=640&q=80&auto=format&fit=crop',
  market: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=640&q=80&auto=format&fit=crop',
  salon: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=640&q=80&auto=format&fit=crop',
  parliament: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=640&q=80&auto=format&fit=crop',
  hands: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=640&q=80&auto=format&fit=crop',
  finance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=640&q=80&auto=format&fit=crop',
};

export const BUSINESSES: Business[] = [
  { id: 'b1', name: 'Drei Bohnen', category: 'Rösterei & Café', neighborhood: 'Nordend', image: IMG.coffee, crit: { founded: true, ownership: true, leadership: false }, address: 'Berger Str. 112', hours: 'Di–Sa 8–18 Uhr' },
  { id: 'b7', name: 'Grünzeug', category: 'Unverpackt-Laden', neighborhood: 'Nordend', image: IMG.market, crit: { founded: true, ownership: true, leadership: true }, address: 'Eckenheimer Landstr. 60', hours: 'Mo–Fr 9–19, Sa 9–16' },
  { id: 'b2', name: 'Hang & Seite', category: 'Buchhandlung', neighborhood: 'Bornheim', image: IMG.book, crit: { founded: false, ownership: true, leadership: true }, address: 'Bornheimer Landstr. 45', hours: 'Mo–Sa 10–19 Uhr' },
  { id: 'b6', name: 'Süß & Eigen', category: 'Konditorei', neighborhood: 'Bornheim', image: IMG.bakery, crit: { founded: false, ownership: true, leadership: false }, address: 'Berger Str. 78', hours: 'Di–So 9–18 Uhr' },
  { id: 'b3', name: 'Nadelöhr', category: 'Maßatelier', neighborhood: 'Sachsenhausen', image: IMG.atelier, crit: { founded: true, ownership: true, leadership: true }, address: 'Schweizer Str. 30', hours: 'Mi–Fr 11–18 Uhr' },
  { id: 'b8', name: 'Studio Mara', category: 'Friseur', neighborhood: 'Sachsenhausen', image: IMG.salon, crit: { founded: false, ownership: false, leadership: true }, address: 'Brückenstr. 14', hours: 'Di–Sa 10–19 Uhr' },
  { id: 'b4', name: 'Blütenwerk', category: 'Floristik', neighborhood: 'Westend', image: IMG.flowers, crit: { founded: true, ownership: false, leadership: true }, address: 'Feldbergstr. 7', hours: 'Mo–Sa 9–19 Uhr' },
  { id: 'b5', name: 'Tonstudio Klara', category: 'Keramik-Werkstatt', neighborhood: 'Bockenheim', image: IMG.pottery, crit: { founded: true, ownership: true, leadership: false }, address: 'Leipziger Str. 22', hours: 'Do–Sa 12–18 Uhr' },
];

export const NEIGHBORHOOD_ORDER = ['Nordend', 'Bornheim', 'Sachsenhausen', 'Westend', 'Bockenheim'];

export const FEED: FeedItem[] = [
  // ---- LOKAL ----
  {
    id: 's1', type: 'article', cat: 'lokal', size: 'large', businessId: 'b1', image: IMG.coffee, readtime: '3 Min', likes0: 128, comments0: 14,
    title: 'Drei Schwestern rösten jetzt im Nordend',
    standfirst: 'Die Rösterei „Drei Bohnen" ist frauengeführt — und seit dieser Woche verifiziert.',
    body: [
      'Was als Sonntagsprojekt am Küchentisch begann, ist heute eine kleine Rösterei mit eigener Handschrift: Lena, Sophie und Marie rösten an der Berger Straße Bohnen aus Betrieben, die selbst von Frauen geführt werden.',
      '„Bewusster Konsum ist für uns kein Verzicht, sondern Geschmack", sagt Lena. Seit dieser Woche ist „Drei Bohnen" auf Shevality verifiziert.',
    ],
    comments: [
      { name: 'Aylin K.', text: 'Endlich! Der Cappuccino dort ist schon jetzt Kult. 💜', time: 'vor 1 Std', likes: 12 },
      { name: 'Jana M.', text: 'War heute morgen da — so herzlich empfangen worden. Absolute Empfehlung.', time: 'vor 40 Min', likes: 5 },
    ],
  },
  {
    id: 's2', type: 'article', cat: 'lokal', size: 'compact', businessId: 'b2', image: IMG.book, readtime: '2 Min', likes0: 64, comments0: 8,
    title: '10 Jahre Buchladen am Bornheimer Hang',
    standfirst: '„Hang & Seite" feiert ein Jahrzehnt — und bleibt fest in Frauenhand.',
    body: [
      'Zehn Jahre, drei Lesereihen und ein Stammpublikum, das mehr Nachbarschaft als Kundschaft ist: „Hang & Seite" hat sich im Viertel zur festen Größe entwickelt.',
      'Inhaberin Aylin Kaya führt den Laden gemeinsam mit ihrer Geschäftspartnerin — und gibt regelmäßig jungen Autorinnen eine Bühne.',
    ],
    comments: [{ name: 'Rana D.', text: 'Meine liebste Adresse für Lyrik in Frankfurt.', time: 'vor 3 Std', likes: 9 }],
  },
  {
    id: 'ev1', type: 'event', cat: 'lokal', businessId: null, image: IMG.market, day: '12', month: 'Jul', place: 'Nordend', time: '11–16', likes0: 41, comments0: 3,
    title: 'Gründerinnen-Markt am Günthersburgpark',
    eventWhen: 'Sa, 12. Juli · 11–16 Uhr', eventPlace: 'Günthersburgpark, Nordend',
    standfirst: 'Über 30 frauengeführte Stände: Handwerk, Backwaren, Naturkosmetik.',
    body: [
      'Einmal im Monat verwandelt sich die Wiese am Günthersburgpark in einen Markt ausschließlich frauengeführter Betriebe.',
      'Mit dabei diesen Monat: „Grünzeug", „Süß & Eigen" und das „Tonstudio Klara". Der Eintritt ist frei.',
    ],
    comments: [{ name: 'Mara P.', text: 'Wer kommt mit? Können uns am Eingang treffen.', time: 'vor 2 Std', likes: 7 }],
  },
  {
    id: 's3', type: 'article', cat: 'lokal', size: 'compact', businessId: 'b3', image: IMG.atelier, readtime: '2 Min', likes0: 52, comments0: 6,
    title: 'Ein Atelier für Maßgeschneidertes',
    standfirst: '„Nadelöhr" eröffnet in Sachsenhausen — gegründet, besessen und geleitet von einer Frau.',
    body: [
      'In der Schweizer Straße entsteht Kleidung, die bleibt: Schneidermeisterin Rana Demir arbeitet auf Bestellung, repariert und schneidert um — gegen Wegwerfmode.',
      '„Nadelöhr" erfüllt alle drei Verifikations-Kriterien und ist seit gestern auf Shevality zu finden.',
    ],
    comments: [],
  },

  // ---- WELT ----
  {
    id: 'w1', type: 'article', cat: 'welt', size: 'large', businessId: null, image: IMG.parliament, readtime: '4 Min', likes0: 342, comments0: 28,
    title: 'Rekord: So viele Frauen in Parlamenten wie nie',
    standfirst: 'Weltweit ist der Frauenanteil in nationalen Parlamenten auf einen Höchststand gestiegen.',
    body: [
      'Laut der Interparlamentarischen Union sitzen inzwischen in mehreren Ländern erstmals mehr als die Hälfte Frauen im Parlament. Der globale Durchschnitt wächst stetig — langsam, aber beständig.',
      'Besonders deutlich ist der Zuwachs dort, wo Quoten und gezielte Förderung zusammenkommen. Fortschritt ist machbar, wenn Strukturen ihn zulassen.',
    ],
    source: 'Interparlamentarische Union (Beispiel-Daten)',
    comments: [{ name: 'Lena S.', text: 'Diese Nachrichten tun gut zwischen all dem Negativen. Danke fürs Teilen.', time: 'vor 5 Std', likes: 33 }],
  },
  { id: 'f1', type: 'fact', cat: 'welt', stat: '+ 40 %', statLabel: 'mehr Unternehmensgründungen durch Frauen in Europa im letzten Jahrzehnt.', source: 'Quelle: Beispiel-Daten für den Prototyp' },
  {
    id: 'w2', type: 'article', cat: 'welt', size: 'compact', businessId: null, image: IMG.finance, readtime: '3 Min', likes0: 176, comments0: 11,
    title: 'Fonds finanziert gezielt Gründerinnen',
    standfirst: 'Ein neuer europäischer Fonds stellt Kapital ausschließlich für frauengeführte Start-ups bereit.',
    body: [
      'Frauen erhalten historisch einen Bruchteil des Wagniskapitals. Ein neuer Fonds will das ändern und investiert gezielt in Gründerinnen — von der Idee bis zur Skalierung.',
      'Erste Beteiligungen gingen an Betriebe aus Handwerk, Gesundheit und Nachhaltigkeit.',
    ],
    source: 'Beispiel-Daten für den Prototyp',
    comments: [],
  },

  // ---- WISSEN ----
  {
    id: 'k1', type: 'article', cat: 'wissen', size: 'large', businessId: null, image: IMG.finance, readtime: '5 Min', likes0: 214, comments0: 19,
    title: 'Gender Pay Gap: Was die Zahl wirklich sagt',
    standfirst: 'Erklärt in 5 Minuten: Wie der Lohnunterschied berechnet wird — und was er verdeckt.',
    body: [
      'Der „unbereinigte" Gender Pay Gap vergleicht den durchschnittlichen Stundenlohn aller Frauen und Männer. Der „bereinigte" rechnet Beruf, Erfahrung und Arbeitszeit heraus.',
      'Wichtig: Auch der bereinigte Wert misst nicht „gleicher Lohn für gleiche Arbeit" perfekt — denn Teilzeit, unbezahlte Sorgearbeit und Karriereknicke sind selbst Teil des Problems.',
      'Wer die Zahl verstehen will, sollte beide Werte kennen — und wissen, was zwischen ihnen liegt.',
    ],
    source: 'Erklärstück · Beispiel für den Prototyp',
    comments: [{ name: 'Sophie L.', text: 'Endlich mal verständlich erklärt. Hab’s direkt gespeichert.', time: 'vor 6 Std', likes: 21 }],
  },
  { id: 'q1', type: 'quote', cat: 'wissen', quoteText: 'Ich bin nicht frei, solange irgendeine Frau unfrei ist, selbst wenn ihre Fesseln ganz andere sind als meine.', quoteBy: 'Audre Lorde' },
  {
    id: 'k2', type: 'article', cat: 'wissen', size: 'compact', businessId: null, image: IMG.hands, readtime: '4 Min', likes0: 98, comments0: 7,
    title: 'Care-Arbeit: Die unsichtbare Wirtschaft',
    standfirst: 'Warum unbezahlte Sorgearbeit das Fundament jeder Volkswirtschaft ist.',
    body: [
      'Kochen, pflegen, betreuen: Ein enormer Teil der Arbeit, die eine Gesellschaft am Laufen hält, taucht in keiner Wirtschaftsstatistik auf — und wird überwiegend von Frauen geleistet.',
      'Ökonominnen rechnen vor: Würde man Care-Arbeit bezahlen, wäre sie einer der größten Wirtschaftszweige überhaupt.',
    ],
    source: 'Erklärstück · Beispiel für den Prototyp',
    comments: [],
  },
];

export const CONTACTS: Contact[] = [
  { name: 'Frauennotruf Frankfurt', desc: 'Beratung bei sexualisierter Gewalt', number: '069 70 94 94' },
  { name: 'Frauenhaus Frankfurt', desc: 'Schutz & sichere Unterkunft', number: '069 79 51 10' },
  { name: 'FeM Mädchenhaus', desc: 'Beratung für Mädchen & junge Frauen', number: '069 95 92 92 0' },
  { name: 'Heimweg-Telefon', desc: 'Begleitung am Telefon nach Hause', number: '030 12 074 182' },
];
