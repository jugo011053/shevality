export type CritKey = 'founded' | 'ownership' | 'leadership';

export interface Business {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  image: string;
  crit: Record<CritKey, boolean>;
  address: string;
  hours: string;
  // Ab Stufe 4: echte Läden (Gastronomie FFM)
  lat?: number;          // Breitengrad (für die Karte)
  lng?: number;          // Längengrad (für die Karte)
  owner?: string;        // Inhaberin (aus öffentlichem Impressum)
  rechtsform?: string;   // z. B. "Einzelunternehmen", "GmbH"
  website?: string;      // offizielle Website (optional)
  description?: string;  // kurze Beschreibung
  source?: string;       // Beleg/Quelle (Impressum-Link)
  verified?: boolean;    // true = geprüft ("sicher"), false = Kandidatin ("ungeprüft")
}

export interface CommentSeed {
  name: string;
  text: string;
  time: string;
  likes: number;
}

export interface Comment extends CommentSeed {
  mine?: boolean;
}

export type FeedCategory = 'lokal' | 'welt' | 'wissen';

interface FeedItemBase {
  id: string;
  cat: FeedCategory;
  businessId?: string | null;
}

export interface ArticleFeedItem extends FeedItemBase {
  type: 'article';
  size: 'large' | 'compact';
  image?: string;
  readtime: string;
  likes0: number;
  comments0: number;
  title: string;
  standfirst: string;
  body: string[];
  source?: string;
  comments: CommentSeed[];
}

export interface EventFeedItem extends FeedItemBase {
  type: 'event';
  image: string;
  day: string;
  month: string;
  place: string;
  time: string;
  likes0: number;
  comments0: number;
  title: string;
  eventWhen: string;
  eventPlace: string;
  standfirst: string;
  body: string[];
  source?: string;
  comments: CommentSeed[];
}

export interface FactFeedItem extends FeedItemBase {
  type: 'fact';
  stat: string;
  statLabel: string;
  source: string;
}

export interface QuoteFeedItem extends FeedItemBase {
  type: 'quote';
  quoteText: string;
  quoteBy: string;
}

export type FeedItem = ArticleFeedItem | EventFeedItem | FactFeedItem | QuoteFeedItem;

export interface Contact {
  name: string;
  desc: string;
  number: string;
}

export type FeedTabKey = 'fuer-dich' | 'lokal' | 'welt' | 'wissen' | 'gemerkt';
