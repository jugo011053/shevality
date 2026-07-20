// Shevality – Feed-Impulse (Platzhalter-Beispieldaten).
// Jeder Impuls endet mit einer offenen Frage + tippbarer Reaktion. "baseline"
// ist eine simulierte Verteilung ("so haben andere geantwortet") — im Prototyp
// gibt es kein geteiltes Backend, deshalb ist das ein plausibler Startwert,
// dem die eigene Antwort live hinzugefügt wird. Frei ersetzbar/erweiterbar.
export type ReactionType = 'scale' | 'options';

export interface ReactionOption {
  value: string;
  label: string;
}

export interface Impuls {
  id: string;
  headline: string;
  text: string;
  question: string;
  reaction:
    | { type: 'scale'; min: number; max: number; minLabel: string; maxLabel: string; baseline: number[] } // baseline: Häufigkeit je Wert (Index 0 = min)
    | { type: 'options'; options: ReactionOption[]; baseline: number[] }; // baseline: Häufigkeit je Option, gleiche Reihenfolge
}

export const IMPULSE_VERSION = 'v1';

export const IMPULSES: Impuls[] = [
  {
    id: 'imp1',
    headline: 'Verbündete statt Konkurrentinnen',
    text: 'Viele Frauen erleben andere Frauen im Alltag eher als Konkurrenz — beim Job, beim Aussehen, in der Familie. Dabei zeigen Gespräche oft: Sobald man sich wirklich austauscht, verschiebt sich das Bild schnell.',
    question: 'Wie hast du das zuletzt erlebt?',
    reaction: {
      type: 'scale', min: 1, max: 5,
      minLabel: 'eher als Konkurrenz', maxLabel: 'eher als Verbündete',
      baseline: [4, 9, 14, 21, 12],
    },
  },
  {
    id: 'imp2',
    headline: 'Verschiedene Leben, gleicher Respekt',
    text: 'Manche Frauen stellen die Karriere in den Mittelpunkt, andere die Familie, wieder andere beides oder keins von beidem. Kein Lebensentwurf macht eine Frau zu einer besseren oder schlechteren Frau.',
    question: 'Wie leicht fällt es dir, das im Alltag auch so zu spüren — nicht nur zu wissen?',
    reaction: {
      type: 'options',
      options: [
        { value: 'easy', label: 'Ziemlich leicht' },
        { value: 'depends', label: 'Kommt auf die Situation an' },
        { value: 'hard', label: 'Eher schwer' },
      ],
      baseline: [18, 27, 9],
    },
  },
  {
    id: 'imp3',
    headline: 'Um Hilfe bitten zählt auch',
    text: 'Wir reden oft darüber, wie wichtig es ist, anderen zu helfen. Genauso wichtig — und schwerer zuzugeben: selbst um Hilfe zu bitten.',
    question: 'Wie leicht fällt es dir, eine andere Frau um Rat oder Hilfe zu bitten?',
    reaction: {
      type: 'scale', min: 1, max: 5,
      minLabel: 'sehr schwer', maxLabel: 'sehr leicht',
      baseline: [6, 11, 16, 10, 5],
    },
  },
  {
    id: 'imp4',
    headline: 'Zugehörigkeit ist kein Zufall',
    text: 'Das Gefühl, zu einer Gemeinschaft von Frauen in dieser Stadt zu gehören, entsteht nicht von selbst — sondern durch kleine, wiederholte Momente des Gesehen-Werdens.',
    question: 'Hattest du in letzter Zeit so einen Moment?',
    reaction: {
      type: 'options',
      options: [
        { value: 'yes-recent', label: 'Ja, vor Kurzem' },
        { value: 'yes-longago', label: 'Ja, aber lange her' },
        { value: 'no', label: 'Eher nicht' },
      ],
      baseline: [15, 13, 8],
    },
  },
  {
    id: 'imp5',
    headline: 'Selbstwert ist kein Endzustand',
    text: 'Sich selbst genauso viel wert zu fühlen wie andere, ist an manchen Tagen leicht — und an anderen ein Kraftakt. Beides ist normal.',
    question: 'Wie geht es dir damit gerade?',
    reaction: {
      type: 'scale', min: 1, max: 5,
      minLabel: 'eher schwer gerade', maxLabel: 'eher leicht gerade',
      baseline: [5, 8, 15, 14, 9],
    },
  },
];
