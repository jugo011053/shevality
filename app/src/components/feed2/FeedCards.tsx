import React, { useState } from 'react';
import { Linking, Platform, Pressable, Share, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { useAppState } from '../../state/AppState';
import { ArchImage } from '../ArchImage';
import { Wordmark } from '../Wordmark';
import {
  EventPost, FeedPost, FEED_UI, GlobalLokalPost, Lang,
  NeuGelistetPost, PortraitPost, RueckschrittPost, ZahlPost,
} from '../../data/feed';

interface CardCtx {
  lang: Lang;
  onOpenBusiness: (id: string) => void;
  onOpenDiscover: () => void;
}

// ---- geteilte Bausteine -------------------------------------------------

function Eyebrow({ text, color = colors.pink }: { text: string; color?: string }) {
  return <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, letterSpacing: 1.4, color }}>{text}</Text>;
}

function SourceLine({ post, lang }: { post: FeedPost; lang: Lang }) {
  const s = post.source;
  return (
    <Pressable onPress={() => s.url && Linking.openURL(s.url)} style={{ marginTop: 14 }}>
      <Text style={{ fontFamily: fonts.hanken500, fontSize: 10.5, color: colors.mutedLight }}>
        {FEED_UI.source[lang]}: {s.institution} · {s.year}
        {s.url ? '  ›' : ''}
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

// Fußzeile mit Shevality-Zeichen + Aktionen (Teilen prominent, Merken).
function Footer({ post, lang }: { post: FeedPost; lang: Lang }) {
  const { saves, toggleSave } = useAppState();
  const [copied, setCopied] = useState(false);
  const saved = !!saves[post.id];

  const onShare = async () => {
    const text = post.share[lang].join('\n') + '\n\n— shevality · ' + FEED_UI.tagline[lang];
    try {
      if (Platform.OS === 'web') {
        const nav: any = typeof navigator !== 'undefined' ? navigator : null;
        if (nav && nav.share) await nav.share({ text });
        else if (nav && nav.clipboard) {
          await nav.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }
      } else {
        await Share.share({ message: text });
      }
    } catch {
      /* Nutzer hat abgebrochen o. Ä. – bewusst still */
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

function CtaButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ marginTop: 15, height: 46, borderRadius: 23, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 7 }}>
      <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>{label}</Text>
      <Text style={{ fontSize: 14, color: colors.ink }}>→</Text>
    </Pressable>
  );
}

const SHELL = {
  backgroundColor: colors.white,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: colors.cardBorder,
  padding: 20,
  marginTop: 16,
} as const;

function ctaPress(post: FeedPost, ctx: CardCtx) {
  const b = post.cta?.businessId;
  if (b) ctx.onOpenBusiness(b);
  else ctx.onOpenDiscover();
}

// ---- 1) ZAHL – dominante Zahl ------------------------------------------

function ZahlCard({ post, ctx }: { post: ZahlPost; ctx: CardCtx }) {
  const { lang } = ctx;
  return (
    <View style={SHELL}>
      <Eyebrow text={FEED_UI.eyebrow.zahl[lang]} />
      <Text style={{ fontFamily: fonts.young, fontSize: 52, lineHeight: 58, color: colors.purple, letterSpacing: -1, marginTop: 8 }}>
        {post.stat[lang]}
      </Text>
      {!!post.statSub && (
        <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.pink, marginTop: 2 }}>{post.statSub[lang]}</Text>
      )}
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 14, lineHeight: 21, color: colors.inkSoft, marginTop: 14 }}>
        {post.text[lang]}
      </Text>
      <SourceLine post={post} lang={lang} />
      <Method post={post} lang={lang} />
      <Footer post={post} lang={lang} />
    </View>
  );
}

// ---- 2) GLOBAL_LOKAL – dreistufige Treppe ------------------------------

function GlobalLokalCard({ post, ctx }: { post: GlobalLokalPost; ctx: CardCtx }) {
  const { lang } = ctx;
  return (
    <View style={SHELL}>
      <Eyebrow text={FEED_UI.eyebrow.global_lokal[lang]} color={colors.purple} />
      <Text style={{ fontFamily: fonts.young, fontSize: 24, lineHeight: 29, color: colors.ink, letterSpacing: -0.3, marginTop: 9 }}>
        {post.headline[lang]}
      </Text>
      <View style={{ marginTop: 16 }}>
        {post.steps.map((st, i) => (
          <View key={i} style={{ marginLeft: i * 18, marginTop: i === 0 ? 0 : 10, borderLeftWidth: 3, borderLeftColor: colors.purple, paddingLeft: 12, paddingVertical: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
              <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, letterSpacing: 1, color: colors.pink }}>{st.scope[lang].toUpperCase()}</Text>
              <Text style={{ fontFamily: fonts.young, fontSize: 22, color: colors.purple, letterSpacing: -0.4 }}>{st.value[lang]}</Text>
            </View>
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 12.5, lineHeight: 18, color: colors.inkSoft, marginTop: 2 }}>{st.note[lang]}</Text>
          </View>
        ))}
      </View>
      {!!post.cta && <CtaButton label={post.cta.label[lang]} onPress={() => ctaPress(post, ctx)} />}
      <SourceLine post={post} lang={lang} />
      <Footer post={post} lang={lang} />
    </View>
  );
}

// ---- 3) PORTRAIT – bildlastig ------------------------------------------

function PortraitCard({ post, ctx }: { post: PortraitPost; ctx: CardCtx }) {
  const { lang } = ctx;
  return (
    <View style={[SHELL, { padding: 0, overflow: 'hidden' }]}>
      <View>
        <ArchImage uri={''} height={230} radiusTop={24} radiusBottom={0} />
        <View style={{ position: 'absolute', left: 18, right: 18, bottom: 14 }}>
          <View style={{ alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,.9)', borderRadius: 99, paddingVertical: 4, paddingHorizontal: 10 }}>
            <Eyebrow text={FEED_UI.eyebrow.portrait[lang]} color={colors.purple} />
          </View>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: fonts.young, fontSize: 26, lineHeight: 30, color: colors.ink, letterSpacing: -0.4 }}>{post.headline[lang]}</Text>
        <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 15, color: colors.pink, marginTop: 8 }}>{post.motiv[lang]}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 12 }}>{post.text[lang]}</Text>
        {!!post.cta && <CtaButton label={post.cta.label[lang]} onPress={() => ctaPress(post, ctx)} />}
        <SourceLine post={post} lang={lang} />
        <Footer post={post} lang={lang} />
      </View>
    </View>
  );
}

// ---- 4) NEU_GELISTET – kompakt, listenartig ----------------------------

function NeuGelistetCard({ post, ctx }: { post: NeuGelistetPost; ctx: CardCtx }) {
  const { lang } = ctx;
  return (
    <View style={[SHELL, { borderLeftWidth: 4, borderLeftColor: colors.purple }]}>
      <Eyebrow text={FEED_UI.eyebrow.neu_gelistet[lang]} color={colors.purple} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10 }}>
        <ArchImage uri={''} height={58} radiusTop={26} radiusBottom={10} style={{ width: 52, flexShrink: 0 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 20, color: colors.ink, letterSpacing: -0.2 }}>{post.businessName}</Text>
          <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: colors.muted, marginTop: 3 }}>
            {post.category[lang]} · {post.neighborhood}
          </Text>
        </View>
      </View>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 13 }}>{post.text[lang]}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
        <View style={{ width: 15, height: 15, borderRadius: 8, borderWidth: 1.3, borderColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 8, color: colors.purple }}>✓</Text>
        </View>
        <Text style={{ fontFamily: fonts.hanken500, fontSize: 11.5, color: colors.purple }}>
          {lang === 'de' ? 'Inhaberin laut Impressum' : 'Owner per legal notice'}: {post.owner}
        </Text>
      </View>
      {!!post.cta && <CtaButton label={post.cta.label[lang]} onPress={() => ctaPress(post, ctx)} />}
      <SourceLine post={post} lang={lang} />
      <Footer post={post} lang={lang} />
    </View>
  );
}

// ---- 5) EVENT – Datum als Anker ----------------------------------------

function EventCard({ post, ctx }: { post: EventPost; ctx: CardCtx }) {
  const { lang } = ctx;
  return (
    <View style={SHELL}>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <View style={{ width: 62, height: 68, borderRadius: 16, backgroundColor: colors.purpleLight, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 28, color: colors.purple, lineHeight: 30 }}>{post.day}</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 11, color: colors.purple, letterSpacing: 1 }}>{post.month[lang].toUpperCase()}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Eyebrow text={FEED_UI.eyebrow.event[lang]} color={colors.pink} />
          <Text style={{ fontFamily: fonts.young, fontSize: 19, lineHeight: 23, color: colors.ink, letterSpacing: -0.2, marginTop: 5 }}>{post.headline[lang]}</Text>
        </View>
      </View>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 13 }}>{post.text[lang]}</Text>
      <View style={{ marginTop: 12, gap: 4 }}>
        <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: colors.ink }}>🗓  {post.when[lang]}</Text>
        <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.muted }}>📍  {post.place[lang]}</Text>
        {!!post.cost && <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.muted }}>•  {post.cost[lang]}</Text>}
        {!!post.registration && <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: colors.muted }}>•  {post.registration[lang]}</Text>}
      </View>
      <SourceLine post={post} lang={lang} />
      <Footer post={post} lang={lang} />
    </View>
  );
}

// ---- 6) RUECKSCHRITT – ernst, nicht alarmistisch -----------------------

function RueckschrittCard({ post, ctx }: { post: RueckschrittPost; ctx: CardCtx }) {
  const { lang } = ctx;
  // Pflicht: handlung MUSS vorhanden sein – sonst Fehler statt Karte.
  if (!post.handlung || !post.handlung[lang]) {
    throw new Error(`Feed-Post "${post.id}" ist vom Typ rueckschritt, aber ohne Feld "handlung".`);
  }
  const sober = '#6d5a67';
  return (
    <View style={[SHELL, { backgroundColor: '#f4eff2', borderColor: '#e2d6dd', borderLeftWidth: 4, borderLeftColor: sober }]}>
      <Eyebrow text={FEED_UI.eyebrow.rueckschritt[lang]} color={sober} />
      <Text style={{ fontFamily: fonts.young, fontSize: 22, lineHeight: 27, color: colors.ink, letterSpacing: -0.3, marginTop: 9 }}>{post.headline[lang]}</Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 12 }}>{post.text[lang]}</Text>

      <View style={{ marginTop: 14, backgroundColor: colors.white, borderRadius: 14, padding: 14 }}>
        <Text style={{ fontFamily: fonts.hanken700, fontSize: 11, letterSpacing: 0.6, color: sober }}>{FEED_UI.handlungTitle[lang].toUpperCase()}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, lineHeight: 19, color: colors.inkSoft, marginTop: 6 }}>{post.handlung[lang]}</Text>
      </View>

      <SourceLine post={post} lang={lang} />
      <Footer post={post} lang={lang} />
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
