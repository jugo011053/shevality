// Shevality – Fragebogen als Datenstruktur.
// Wortlaut, Skalenendpunkte, Block und Reihenfolge sind hier frei änderbar,
// ohne dass Screens angefasst werden müssen. Wichtig: Wenn sich Fragen inhaltlich
// ändern, QUESTIONNAIRE_VERSION hochzählen — Vorher- und Nachmessung müssen mit
// derselben Version laufen, sonst sind die Antworten nicht vergleichbar.
export const QUESTIONNAIRE_VERSION = 'v1';

export type QuestionType = 'single' | 'scale' | 'text';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  block: 'A' | 'B' | 'C';
  type: QuestionType;
  prompt: string;
  // Wird nur vor der ERSTEN Frage eines Blocks angezeigt.
  blockIntro?: string;
  blockTitle?: string;
  options?: QuestionOption[]; // für type "single"
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMidLabel?: string;
  scaleMaxLabel?: string;
  scaleNaLabel?: string; // z. B. "Kann ich nicht einschätzen"
  optional?: boolean; // darf übersprungen werden (Freitext, Schlussfrage)
  placeholder?: string; // für type "text"
  // Zeigt eine Zusatzfrage an, wenn genau dieser Wert gewählt wurde.
  followUpIfValue?: string;
  followUp?: Question;
}

export const CONSENT_TEXT = {
  title: 'Bevor es losgeht',
  paragraphs: [
    'Shevality ist eine App und Bewegung für Frauen in Frankfurt. Wir möchten besser verstehen, wie Frauen mit unterschiedlichen Lebensweisen einander wahrnehmen und unterstützen.',
    'Dafür fragen wir nach einigen Angaben zu deinem Hintergrund sowie nach deinen persönlichen Einschätzungen und Erfahrungen. Nach 6–8 Wochen möchten wir einen Teil der Fragen wiederholen und beobachten, ob sich die Antworten verändert haben.',
    'Die Teilnahme ist freiwillig. Du kannst einzelne Fragen überspringen und jederzeit aufhören. Deine Kontaktdaten und deine Antworten werden technisch getrennt gespeichert. Ausgewertet und veröffentlicht werden ausschließlich zusammengefasste Ergebnisse, aus denen einzelne Personen nicht erkennbar sind.',
    'Deine Antworten werden bis 6 Monate nach Studienende gespeichert und anschließend gelöscht oder vollständig anonymisiert.',
  ],
  confirm: 'Mit „Weiter" bestätigst du, dass du mindestens 18 Jahre alt bist und freiwillig teilnimmst.',
  checkboxLabel: 'Ich stimme zu und möchte teilnehmen.',
  decline: 'Ich möchte nicht teilnehmen.',
};

const SCALE_UNPLEASANT_PLEASANT = {
  scaleMin: 1,
  scaleMax: 7,
  scaleMinLabel: 'sehr unangenehm',
  scaleMidLabel: 'weder angenehm noch unangenehm',
  scaleMaxLabel: 'sehr angenehm',
  scaleNaLabel: 'Kann ich nicht einschätzen',
};

const SCALE_AGREEMENT = {
  scaleMin: 1,
  scaleMax: 7,
  scaleMinLabel: 'stimme überhaupt nicht zu',
  scaleMidLabel: 'teils/teils',
  scaleMaxLabel: 'stimme vollständig zu',
};

const FREQ_OPTIONS: QuestionOption[] = [
  { value: '0', label: 'Keinmal' },
  { value: '1', label: 'Einmal' },
  { value: '2-3', label: 'Zwei- bis dreimal' },
  { value: '4+', label: 'Viermal oder häufiger' },
  { value: 'no-opportunity', label: 'Es gab keine passende Gelegenheit' },
  { value: 'na', label: 'Möchte ich nicht angeben' },
];

export const QUESTIONS: Question[] = [
  // ---- Block A: Ein paar Angaben zu dir ----
  {
    id: 'q1', block: 'A', type: 'single',
    blockTitle: 'Ein paar Angaben zu dir',
    prompt: 'Welcher Altersgruppe gehörst du an?',
    options: [
      { value: '18-24', label: '18–24 Jahre' },
      { value: '25-34', label: '25–34 Jahre' },
      { value: '35-44', label: '35–44 Jahre' },
      { value: '45-54', label: '45–54 Jahre' },
      { value: '55-64', label: '55–64 Jahre' },
      { value: '65+', label: '65 Jahre oder älter' },
      { value: 'na', label: 'Keine Angabe' },
    ],
  },
  {
    id: 'q2', block: 'A', type: 'single',
    prompt: 'Welche Beschreibung trifft aktuell am ehesten auf deine hauptsächliche Lebenssituation zu?',
    options: [
      { value: 'fulltime', label: 'Vollzeit erwerbstätig' },
      { value: 'parttime', label: 'Teilzeit erwerbstätig' },
      { value: 'selfemployed', label: 'Selbstständig' },
      { value: 'education', label: 'In Ausbildung oder Studium' },
      { value: 'care', label: 'Überwiegend Familien- oder Sorgearbeit' },
      { value: 'unemployed', label: 'Derzeit nicht erwerbstätig' },
      { value: 'retired', label: 'Im Ruhestand' },
      { value: 'other', label: 'Anderes' },
      { value: 'na', label: 'Keine Angabe' },
    ],
  },
  {
    id: 'q3', block: 'A', type: 'single',
    prompt: 'Fühlst du dich neben Deutschland noch einem anderen Land oder Kulturraum familiär oder persönlich verbunden?',
    options: [
      { value: 'no', label: 'Nein' },
      { value: 'yes', label: 'Ja' },
      { value: 'no-label', label: 'Ich möchte mich nicht zuordnen' },
      { value: 'na', label: 'Keine Angabe' },
    ],
    followUpIfValue: 'yes',
    followUp: {
      id: 'q3b', block: 'A', type: 'text', optional: true,
      prompt: 'Wenn du möchtest: welchem Land oder Kulturraum?',
      placeholder: 'z. B. …',
    },
  },
  {
    id: 'q4', block: 'A', type: 'scale',
    prompt: 'Welche Rolle spielen Religion oder Spiritualität aktuell in deinem Leben?',
    scaleMin: 1, scaleMax: 7,
    scaleMinLabel: 'überhaupt keine Rolle', scaleMidLabel: 'eine mittlere Rolle', scaleMaxLabel: 'eine sehr wichtige Rolle',
    scaleNaLabel: 'Keine Angabe',
  },
  {
    id: 'q5', block: 'A', type: 'scale',
    prompt: 'Wie würdest du die Werte beschreiben, mit denen du überwiegend aufgewachsen bist?',
    scaleMin: 1, scaleMax: 7,
    scaleMinLabel: 'sehr traditionell', scaleMidLabel: 'gemischt', scaleMaxLabel: 'sehr liberal',
    scaleNaLabel: 'Kann ich nicht einordnen',
  },

  // ---- Block B: Unterschiedliche Lebensentwürfe ----
  {
    id: 'q6', block: 'B', type: 'scale',
    blockTitle: 'Unterschiedliche Lebensentwürfe',
    blockIntro:
      'Frauen können sehr unterschiedlich leben und unterschiedliche Überzeugungen haben. Stell dir bei jeder der folgenden Beschreibungen vor, du führst bei einer Veranstaltung ein längeres persönliches Gespräch mit dieser Frau. Wie angenehm oder unangenehm wäre diese Situation für dich?',
    prompt: 'Eine Frau, die aus religiösen Gründen sichtbar ein Kopftuch trägt.',
    ...SCALE_UNPLEASANT_PLEASANT,
  },
  {
    id: 'q7', block: 'B', type: 'scale',
    prompt: 'Eine Frau, für die Religion in ihrem Leben grundsätzlich keine Rolle spielt.',
    ...SCALE_UNPLEASANT_PLEASANT,
  },
  {
    id: 'q8', block: 'B', type: 'scale',
    prompt: 'Eine Frau, die sich entschieden hat, sich in Vollzeit um Haushalt oder Familie zu kümmern.',
    ...SCALE_UNPLEASANT_PLEASANT,
  },
  {
    id: 'q9', block: 'B', type: 'scale',
    prompt: 'Eine Frau, die keine Kinder haben möchte und ihre berufliche Entwicklung in den Mittelpunkt stellt.',
    ...SCALE_UNPLEASANT_PLEASANT,
  },
  {
    id: 'q10', block: 'B', type: 'scale',
    prompt: 'Eine Frau, für die Sexualität ausschließlich in eine feste Partnerschaft gehört.',
    ...SCALE_UNPLEASANT_PLEASANT,
  },
  {
    id: 'q11', block: 'B', type: 'scale',
    prompt: 'Eine Frau, die offen damit umgeht, dass sie Sexualität auch außerhalb fester Partnerschaften lebt.',
    ...SCALE_UNPLEASANT_PLEASANT,
  },

  // ---- Block C: Dein persönliches Erleben ----
  {
    id: 'q12', block: 'C', type: 'scale',
    blockTitle: 'Dein persönliches Erleben',
    blockIntro: 'Bitte gib bei den folgenden Aussagen an, wie sehr du ihnen zustimmst.',
    prompt: 'Ich fühle mich Frauen verbunden, auch wenn sie deutlich anders leben als ich.',
    ...SCALE_AGREEMENT,
  },
  {
    id: 'q13', block: 'C', type: 'scale',
    prompt: 'Ich habe das Gefühl, Teil einer Gemeinschaft von Frauen in Frankfurt zu sein.',
    ...SCALE_AGREEMENT,
  },
  {
    id: 'q14', block: 'C', type: 'scale',
    prompt: 'Alles in allem bin ich mit mir selbst zufrieden.',
    ...SCALE_AGREEMENT,
  },
  {
    id: 'q15', block: 'C', type: 'scale',
    prompt: 'Ich habe das Gefühl, dass ich als Person genauso viel wert bin wie andere.',
    ...SCALE_AGREEMENT,
  },
  {
    id: 'q16', block: 'C', type: 'single',
    prompt: 'Wie oft hast du in den vergangenen vier Wochen einer Frau außerhalb deines engen Freundes- oder Familienkreises konkret geholfen – zum Beispiel mit Zeit, einer Information, einer Empfehlung oder einem Kontakt?',
    options: FREQ_OPTIONS,
  },
  {
    id: 'q17', block: 'C', type: 'single',
    prompt: 'Wie oft hast du in den vergangenen vier Wochen eine Frau außerhalb deines engen Freundes- oder Familienkreises selbst um Hilfe, Rat oder eine Empfehlung gebeten?',
    options: FREQ_OPTIONS,
  },
  {
    id: 'q18', block: 'C', type: 'scale',
    prompt: 'Wenn du an deinen Alltag insgesamt denkst: Wie erlebst du andere Frauen eher?',
    scaleMin: 1, scaleMax: 7,
    scaleMinLabel: 'überwiegend als Konkurrentinnen', scaleMidLabel: 'gleichermaßen als Konkurrentinnen und Verbündete', scaleMaxLabel: 'überwiegend als Verbündete',
    scaleNaLabel: 'Kann ich nicht einschätzen',
  },
  {
    id: 'q19', block: 'C', type: 'text', optional: true,
    blockTitle: 'Zum Abschluss',
    prompt: 'Gibt es eine Lebensweise oder Überzeugung, bei der du besonders starke Spannungen zwischen Frauen wahrnimmst?',
    placeholder: 'Diese Frage ist freiwillig …',
  },
];
