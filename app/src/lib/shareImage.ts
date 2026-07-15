// Erzeugt pro Feed-Post ein gestaltetes Marken-Bild (Spotify-Stil) als PNG.
// Nur im Web (nutzt <canvas>). Auf nativen Plattformen wird stattdessen Text geteilt.
import { FeedPost, FEED_ACCENT, FEED_UI, Lang } from '../data/feed';

function firstSentence(t: string): string {
  const s = t.split(/(?<=[.!?])\s/)[0] || t;
  return s.length > 150 ? s.slice(0, 147) + '…' : s;
}

interface Picked {
  eyebrow: string;
  hero: string;
  sub: string;
  footer: string;
  accent: string;
  heroBig: boolean;
}

function pick(post: FeedPost, lang: Lang): Picked {
  const accent = FEED_ACCENT[post.typ];
  const eyebrow = FEED_UI.eyebrow[post.typ][lang];
  const src = `${FEED_UI.source[lang]}: ${post.source.institution} · ${post.source.year}`;
  switch (post.typ) {
    case 'zahl':
      return { eyebrow, hero: post.stat[lang], sub: firstSentence(post.text[lang]), footer: src, accent, heroBig: true };
    case 'neu_gelistet':
      return { eyebrow, hero: post.businessName, sub: `${post.category[lang]} · ${post.neighborhood}\n${firstSentence(post.text[lang])}`, footer: lang === 'de' ? 'von einer Frau geführt' : 'woman-led', accent, heroBig: false };
    case 'event':
      return { eyebrow, hero: post.headline[lang], sub: `${post.when[lang]}\n${post.place[lang]}`, footer: src, accent, heroBig: false };
    case 'portrait':
      return { eyebrow, hero: post.headline[lang], sub: post.motiv[lang], footer: src, accent, heroBig: false };
    case 'global_lokal':
      return { eyebrow, hero: post.headline[lang], sub: post.steps.map((s) => `${s.scope[lang]}: ${s.value[lang]}`).join('    '), footer: src, accent, heroBig: false };
    case 'rueckschritt':
      return { eyebrow, hero: post.headline[lang], sub: firstSentence(post.text[lang]), footer: src, accent, heroBig: false };
  }
}

function wrap(ctx: any, text: string, maxWidth: number): string[] {
  const out: string[] = [];
  text.split('\n').forEach((para) => {
    const words = para.split(' ');
    let line = '';
    words.forEach((w) => {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        out.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    out.push(line);
  });
  return out;
}

const SERIF = '"YoungSerif_400Regular", Georgia, serif';
const SANS = '"HankenGrotesk_400Regular", system-ui, sans-serif';
const SANS_BOLD = '"HankenGrotesk_700Bold", system-ui, sans-serif';

export async function buildShareImage(post: FeedPost, lang: Lang): Promise<Blob> {
  const doc: any = typeof document !== 'undefined' ? document : null;
  if (!doc) throw new Error('kein document');
  try {
    if ((doc as any).fonts && (doc as any).fonts.ready) await (doc as any).fonts.ready;
  } catch {
    /* egal */
  }

  const W = 1080;
  const H = 1350;
  const canvas = doc.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx: any = canvas.getContext('2d');
  const p = pick(post, lang);

  // Hintergrund (warm)
  ctx.fillStyle = '#ece7e0';
  ctx.fillRect(0, 0, W, H);

  // weiße Karte
  const m = 56;
  const cardX = m;
  const cardY = m;
  const cardW = W - m * 2;
  const cardH = H - m * 2;
  ctx.fillStyle = '#ffffff';
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 44);
    ctx.fill();
  } else {
    ctx.fillRect(cardX, cardY, cardW, cardH);
  }

  const padX = cardX + 74;
  const contentW = cardW - 148;
  let y = cardY + 130;

  // Akzentbalken oben
  ctx.fillStyle = p.accent;
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(padX, cardY + 74, 64, 8, 4);
    ctx.fill();
  }

  // Eyebrow
  ctx.fillStyle = p.accent;
  ctx.font = `700 30px ${SANS_BOLD}`;
  try { ctx.letterSpacing = '3px'; } catch { /* not supported */ }
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(p.eyebrow, padX, y);
  try { ctx.letterSpacing = '0px'; } catch { /* */ }
  y += 40;

  // Hero
  ctx.fillStyle = '#382a3d';
  const heroSize = p.heroBig ? 200 : Math.min(84, 84);
  ctx.font = `${heroSize}px ${SERIF}`;
  const heroLines = wrap(ctx, p.hero, contentW);
  const heroLH = heroSize * 1.06;
  y += heroSize * 0.78;
  heroLines.slice(0, p.heroBig ? 2 : 4).forEach((ln) => {
    ctx.fillText(ln, padX, y);
    y += heroLH;
  });

  // Sub
  y += 30;
  ctx.fillStyle = '#574a52';
  ctx.font = `42px ${SANS}`;
  const subLines = wrap(ctx, p.sub, contentW);
  subLines.slice(0, 6).forEach((ln) => {
    ctx.fillText(ln, padX, y);
    y += 58;
  });

  // Footer-Bereich unten
  const baseY = cardY + cardH - 74;

  // Trennlinie
  ctx.strokeStyle = 'rgba(56,42,61,0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, baseY - 96);
  ctx.lineTo(padX + contentW, baseY - 96);
  ctx.stroke();

  // Quelle
  ctx.fillStyle = '#8a7984';
  ctx.font = `28px ${SANS}`;
  const footLines = wrap(ctx, p.footer, contentW);
  ctx.fillText(footLines[0], padX, baseY - 54);

  // Wordmark
  ctx.fillStyle = p.accent;
  ctx.font = `56px ${SERIF}`;
  ctx.fillText('shevality', padX, baseY);

  ctx.fillStyle = '#a86b88';
  ctx.font = `italic 26px Georgia, serif`;
  const tag = lang === 'de' ? 'Frauengeführt in Frankfurt' : 'Women-led in Frankfurt';
  const tagW = ctx.measureText(tag).width;
  ctx.fillText(tag, padX + contentW - tagW, baseY - 6);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b: Blob | null) => (b ? resolve(b) : reject(new Error('toBlob fehlgeschlagen'))), 'image/png');
  });
}
