import React, { useState } from 'react';
import { Linking, Platform, Pressable, Share, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { useAppState } from '../../state/AppState';
import { ArchImage } from '../ArchImage';
import { Wordmark } from '../Wordmark';
import { buildShareImage } from '../../lib/shareImage';
import {
  EventPost, FeedPost, FEED_ACCENT, FEED_UI, GlobalLokalPost, Lang,
  NeuGelistetPost, PortraitPost, RueckschrittPost, ZahlPost, ZahlViz,
} from '../../data/feed';

interface CardCtx {
  lang: Lang;
  onOpenBusiness: (id: string) => void;
  onOpenDiscover: () => void;
}

const APP_URL = 'https://jugo011053.github.io/shevality/';

// ---- geteilte Bausteine -------------------------------------------------

function Eyebrow({ text, color }: { text: string; color: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
      <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, letterSpacing: 1.4, color }}>{text}</Text>
    </View>
  );
}

function TopImage({ uri, height }: { uri?: string; height: number }) {
  return <ArchImage uri={uri} height={height} radiusTop={23} radiusBottom={0} />;
}

function SourceLine({ post, lang }: { post: FeedPost; lang: Lang }) {
  const s = post.source;
  return (
    <Pressable onPress={() => s.url && Linking.openURL(s.url)} style={{ marginTop: 14 }}>
      <Text style={{ fontFamily: fonts.hanken500, fontSize: 10.5, color: colors.mutedLight }}>
        {FEED_UI.source[lang]}: {s.institution} · {s.year}{s.url ? '  ›' : ''}
      </Text>
    </Pressable>
  );
}

function Method({ post, lang }: { post: FeedPost; lang: Lang }) {
  if (!post.methodik) return null;
  return (
    <Text style={{ fontFamily: fonts.hanken400, fontSize: 10.5, lineHeight: 15, color: colors.mutedLighter, marginTop: 8 }}>
      {FEED_UI.method[lang]}: {post.methodik[lang]}
    </Text>
  );
}

function Footer({ post, lang }: { post: FeedPost; lang: Lang }) {
  const { saves, toggleSave } = useAppState();
  const [copied, setCopied] = useState(false);
  const saved = !!saves[post.id];

  const flash = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const onShare = async () => {
    // Wie bei Spotify: das Bild ist der Inhalt, die Nachricht ist nur der Link zur App.
    if (Platform.OS !== 'web') {
      try { await Share.share({ message: APP_URL }); } catch { /* still */ }
      return;
    }
    const nav: any = typeof navigator !== 'undefined' ? navigator : null;
    const doc: any = typeof document !== 'undefined' ? document : null;
    try {
      const blob = await buildShareImage(post, lang);
      const file = new File([blob], 'shevality.png', { type: 'image/png' });
      if (nav && nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({ files: [file], title: 'shevality', text: APP_URL });
      } else if (doc) {
        // Kein Datei-Teilen (meist Desktop): Bild herunterladen + Link kopieren.
        const url = URL.createObjectURL(blob);
        const a = doc.createElement('a');
        a.href = url;
        a.download = 'shevality.png';
        a.click();
        URL.revokeObjectURL(url);
        if (nav && nav.clipboard) {
          try { await nav.clipboard.writeText(APP_URL); } catch { /* egal */ }
        }
        flash();
      }
    } catch {
      // Fallback: Link in die Zwischenablage.
      try {
        if (nav && nav.clipboard) {
          await nav.clipboard.writeText(APP_URL);
          flash();
        }
      } catch {
        /* still */
      }
    }
  };

  return (
    <View style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Wordmark fontSize={15} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable
          onPress={() => toggleSave(post.id)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8, paddingHorizontal: 13, borderRadius: 99, borderWidth: 1.4, borderColor: saved ? colors.purple : colors.cardBorder, backgroundColor: saved ? colors.purpleLight : 'transparent' }}
        >
          <Text style={{ fontSize: 12, color: saved ? colors.purple : colors.muted }}>{saved ? '✓' : '☆'}</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: saved ? colors.purple : colors.muted }}>
            {saved ? FEED_UI.saved[lang] : FEED_UI.save[lang]}
          </Text>
        </Pressable>
        <Pressable
          onPress={onShare}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 99, backgroundColor: colors.purple }}
        >
          <Text style={{ fontSize: 12, color: colors.white }}>{copied ? '✓' : '↗'}</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: colors.white }}>
            {copied ? FEED_UI.copied[lang] : FEED_UI.share[lang]}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function CtaButton({ label, color, onPress }: { label: string; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ marginTop: 15, height: 46, borderRadius: 23, borderWidth: 1.5, borderColor: color, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 }}>
      <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color }}>{label}</Text>
      <Text style={{ fontSize: 14, color }}>→</Text>
    </Pressable>
  );
}

const SHELL = {
  backgroundColor: colors.white,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: colors.cardBorder,
  marginTop: 16,
  overflow: 'hidden',
} as const;

function ctaPress(post: FeedPost, ctx: CardCtx) {
  const b = post.cta?.businessId;
  if (b) ctx.onOpenBusiness(b);
  else ctx.onOpenDiscover();
}

// ---- Mini-Visualisierung für Statistiken -------------------------------

function Viz({ viz, accent, lang }: { viz: ZahlViz; accent: string; lang: Lang }) {
  if (viz.kind === 'delta') {
    const tones = {
      up: { fg: '#4f7a63', bg: '#e7f0eb', arrow: '▲' },
      down: { fg: '#a86b88', bg: '#f6edf1', arrow: '▼' },
      flat: { fg: colors.muted, bg: '#efe9ed', arrow: '•' },
    } as const;
    const t = tones[viz.tone];
    return (
      <View style={{ marginTop: 12, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: t.bg, borderRadius: 99, paddingVertical: 6, paddingHorizontal: 12 }}>
        <Text style={{ fontSize: 11, color: t.fg }}>{t.arrow}</Text>
        <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: t.fg }}>{viz.text[lang]}</Text>
      </View>
    );
  }
  // compare – zwei direkt beschriftete Vergleichsbalken
  const max = Math.max(viz.a.value, viz.b.value) || 1;
  const Row = ({ label, value, display, fill }: { label: string; value: number; display: string; fill: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 8 }}>
      <Text style={{ width: 56, fontFamily: fonts.hanken500, fontSize: 11.5, color: colors.muted }}>{label}</Text>
      <View style={{ flex: 1, height: 16, borderRadius: 8, backgroundColor: '#ece5ea' }}>
        <View style={{ height: 16, width: `${(value / max) * 100}%`, backgroundColor: fill, borderRadius: 8 }} />
      </View>
      <Text style={{ width: 64, textAlign: 'right', fontFamily: fonts.hanken700, fontSize: 12.5, color: colors.ink }}>{display}</Text>
    </View>
  );
  return (
    <View style={{ marginTop: 14 }}>
      <Row label={viz.a.label[lang]} value={viz.a.value} display={viz.a.display[lang]} fill={accent} />
      <Row label={viz.b.label[lang]} value={viz.b.value} display={viz.b.display[lang]} fill={colors.mutedLight} />
    </View>
  );
}

// ---- 1) ZAHL – dominante Zahl + Mini-Visualisierung --------------------

function ZahlCard({ post, ctx }: { post: ZahlPost; ctx: CardCtx }) {
  const { lang } = ctx;
  const accent = FEED_ACCENT.zahl;
  return (
    <View style={[SHELL, { padding: 20 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Eyebrow text={FEED_UI.eyebrow.zahl[lang]} color={accent} />
          <Text style={{ fontFamily: fonts.young, fontSize: 50, lineHeight: 56, color: accent, letterSpacing: -1, marginTop: 8 }}>{post.stat[lang]}</Text>
          {!post.viz && !!post.statSub && <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.pink, marginTop: 2 }}>{post.statSub[lang]}</Text>}
        </View>
        <ArchImage uri={post.image} height={54} radiusTop={22} radiusBottom={12} style={{ width: 54, flexShrink: 0, marginTop: 2 }} />
      </View>
      {!!post.viz && <Viz viz={post.viz} accent={accent} lang={lang} />}
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 14 }}>{post.text[lang]}</Text>
      <SourceLine post={post} lang={lang} />
      <Method post={post} lang={lang} />
      <Footer post={post} lang={lang} />
    </View>
  );
}

// ---- 2) GLOBAL_LOKAL – dreistufige Treppe ------------------------------

function GlobalLokalCard({ post, ctx }: { post: GlobalLokalPost; ctx: CardCtx }) {
  const { lang } = ctx;
  const accent = FEED_ACCENT.global_lokal;
  return (
    <View style={SHELL}>
      <TopImage uri={post.image} height={120} />
      <View style={{ padding: 20 }}>
        <Eyebrow text={FEED_UI.eyebrow.global_lokal[lang]} color={accent} />
        <Text style={{ fontFamily: fonts.young, fontSize: 23, lineHeight: 28, color: colors.ink, letterSpacing: -0.3, marginTop: 9 }}>{post.headline[lang]}</Text>
        <View style={{ marginTop: 16 }}>
          {post.steps.map((st, i) => (
            <View key={i} style={{ marginLeft: i * 18, marginTop: i === 0 ? 0 : 10, borderLeftWidth: 3, borderLeftColor: accent, paddingLeft: 12, paddingVertical: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, letterSpacing: 1, color: colors.pink }}>{st.scope[lang].toUpperCase()}</Text>
                <Text style={{ fontFamily: fonts.young, fontSize: 22, color: accent, letterSpacing: -0.4 }}>{st.value[lang]}</Text>
              </View>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 12.5, lineHeight: 18, color: colors.inkSoft, marginTop: 2 }}>{st.note[lang]}</Text>
            </View>
          ))}
        </View>
        {!!post.cta && <CtaButton label={post.cta.label[lang]} color={accent} onPress={() => ctaPress(post, ctx)} />}
        <SourceLine post={post} lang={lang} />
        <Footer post={post} lang={lang} />
      </View>
    </View>
  );
}

// ---- 3) PORTRAIT – bildlastig ------------------------------------------

function PortraitCard({ post, ctx }: { post: PortraitPost; ctx: CardCtx }) {
  const { lang } = ctx;
  const accent = FEED_ACCENT.portrait;
  return (
    <View style={SHELL}>
      <View>
        <TopImage uri={post.image} height={230} />
        <View style={{ position: 'absolute', left: 18, bottom: 14, backgroundColor: 'rgba(255,255,255,.92)', borderRadius: 99, paddingVertical: 4, paddingHorizontal: 11 }}>
          <Eyebrow text={FEED_UI.eyebrow.portrait[lang]} color={accent} />
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: fonts.young, fontSize: 26, lineHeight: 30, color: colors.ink, letterSpacing: -0.4 }}>{post.headline[lang]}</Text>
        <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 15, color: colors.pink, marginTop: 8 }}>{post.motiv[lang]}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 12 }}>{post.text[lang]}</Text>
        {!!post.cta && <CtaButton label={post.cta.label[lang]} color={accent} onPress={() => ctaPress(post, ctx)} />}
        <SourceLine post={post} lang={lang} />
        <Footer post={post} lang={lang} />
      </View>
    </View>
  );
}

// ---- 4) NEU_GELISTET – Werbe-Blurb, kein Name --------------------------

function NeuGelistetCard({ post, ctx }: { post: NeuGelistetPost; ctx: CardCtx }) {
  const { lang } = ctx;
  const accent = FEED_ACCENT.neu_gelistet;
  return (
    <View style={SHELL}>
      <TopImage uri={post.image} height={150} />
      <View style={{ padding: 20 }}>
        <Eyebrow text={FEED_UI.eyebrow.neu_gelistet[lang]} color={accent} />
        <Text style={{ fontFamily: fonts.young, fontSize: 22, color: colors.ink, letterSpacing: -0.3, marginTop: 9 }}>{post.businessName}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: colors.muted, marginTop: 3 }}>{post.category[lang]} · {post.neighborhood}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 12 }}>{post.text[lang]}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, alignSelf: 'flex-start', backgroundColor: '#e9f1ec', borderRadius: 99, paddingVertical: 5, paddingHorizontal: 11 }}>
          <Text style={{ fontSize: 11, color: accent }}>✓</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 11.5, color: accent }}>{lang === 'de' ? 'von einer Frau geführt' : 'woman-led'}</Text>
        </View>
        {!!post.cta && <CtaButton label={post.cta.label[lang]} color={accent} onPress={() => ctaPress(post, ctx)} />}
        <SourceLine post={post} lang={lang} />
        <Footer post={post} lang={lang} />
      </View>
    </View>
  );
}

// ---- 5) EVENT – Datum als Anker auf dem Bild ---------------------------

function EventCard({ post, ctx }: { post: EventPost; ctx: CardCtx }) {
  const { lang } = ctx;
  const accent = FEED_ACCENT.event;
  return (
    <View style={SHELL}>
      <View>
        <TopImage uri={post.image} height={140} />
        <View style={{ position: 'absolute', left: 18, bottom: 14, width: 60, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.95)', alignItems: 'center', paddingVertical: 7 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 26, color: accent, lineHeight: 28 }}>{post.day}</Text>
          <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, color: accent, letterSpacing: 1 }}>{post.month[lang].toUpperCase()}</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Eyebrow text={FEED_UI.eyebrow.event[lang]} color={accent} />
        <Text style={{ fontFamily: fonts.young, fontSize: 20, lineHeight: 25, color: colors.ink, letterSpacing: -0.2, marginTop: 8 }}>{post.headline[lang]}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 11 }}>{post.text[lang]}</Text>
        <View style={{ marginTop: 12, gap: 4 }}>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: colors.ink }}>🗓  {post.when[lang]}</Text>
          <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.muted }}>📍  {post.place[lang]}</Text>
          {!!post.cost && <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.muted }}>•  {post.cost[lang]}</Text>}
          {!!post.registration && <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.muted }}>•  {post.registration[lang]}</Text>}
        </View>
        <SourceLine post={post} lang={lang} />
        <Footer post={post} lang={lang} />
      </View>
    </View>
  );
}

// ---- 6) RUECKSCHRITT – ernst, nicht alarmistisch -----------------------

function RueckschrittCard({ post, ctx }: { post: RueckschrittPost; ctx: CardCtx }) {
  const { lang } = ctx;
  const accent = FEED_ACCENT.rueckschritt;
  if (!post.handlung || !post.handlung[lang]) {
    throw new Error(`Feed-Post "${post.id}" ist vom Typ rueckschritt, aber ohne Feld "handlung".`);
  }
  return (
    <View style={SHELL}>
      <TopImage uri={post.image} height={120} />
      <View style={{ padding: 20 }}>
        <Eyebrow text={FEED_UI.eyebrow.rueckschritt[lang]} color={accent} />
        <Text style={{ fontFamily: fonts.young, fontSize: 21, lineHeight: 26, color: colors.ink, letterSpacing: -0.3, marginTop: 9 }}>{post.headline[lang]}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 11 }}>{post.text[lang]}</Text>
        <View style={{ marginTop: 14, backgroundColor: '#f4eff2', borderRadius: 14, padding: 14, borderLeftWidth: 3, borderLeftColor: accent }}>
          <Text style={{ fontFamily: fonts.hanken700, fontSize: 11, letterSpacing: 0.6, color: accent }}>{FEED_UI.handlungTitle[lang].toUpperCase()}</Text>
          <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, lineHeight: 19, color: colors.inkSoft, marginTop: 6 }}>{post.handlung[lang]}</Text>
        </View>
        <SourceLine post={post} lang={lang} />
        <Footer post={post} lang={lang} />
      </View>
    </View>
  );
}

// ---- Dispatcher ---------------------------------------------------------

export function FeedCard({ post, ctx }: { post: FeedPost; ctx: CardCtx }) {
  switch (post.typ) {
    case 'zahl': return <ZahlCard post={post} ctx={ctx} />;
    case 'global_lokal': return <GlobalLokalCard post={post} ctx={ctx} />;
    case 'portrait': return <PortraitCard post={post} ctx={ctx} />;
    case 'neu_gelistet': return <NeuGelistetCard post={post} ctx={ctx} />;
    case 'event': return <EventCard post={post} ctx={ctx} />;
    case 'rueckschritt': return <RueckschrittCard post={post} ctx={ctx} />;
    default: return null;
  }
}
