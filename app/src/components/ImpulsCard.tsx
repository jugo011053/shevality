import React from 'react';
import { Platform, Pressable, Share, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useAppState } from '../state/AppState';
import { Wordmark } from './Wordmark';
import { Impuls } from '../data/impulses';

const APP_URL = 'https://jugo011053.github.io/shevality/';

// Verteilung inkl. eigener Antwort. Die "baseline"-Werte in impulses.ts sind
// Platzhalter-Basiswerte für den Prototyp (kein geteiltes Backend) — sobald
// echte Antworten aus einer Datenbank kommen, hier einfach ersetzen.
function withOwn(baseline: number[], ownIndex: number) {
  const counts = baseline.slice();
  if (ownIndex >= 0 && ownIndex < counts.length) counts[ownIndex] += 1;
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  return { counts, total };
}

function Bars({ labels, counts, total, ownIndex }: { labels: string[]; counts: number[]; total: number; ownIndex: number }) {
  const max = Math.max(...counts, 1);
  return (
    <View style={{ marginTop: 4, gap: 8 }}>
      {labels.map((label, i) => {
        const pct = Math.round((counts[i] / total) * 100);
        const own = i === ownIndex;
        return (
          <View key={i}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontFamily: own ? fonts.hanken700 : fonts.hanken500, fontSize: 11.5, color: own ? colors.purple : colors.muted }}>
                {label}{own ? ' · du' : ''}
              </Text>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 11.5, color: own ? colors.purple : colors.mutedLight }}>{pct}%</Text>
            </View>
            <View style={{ height: 8, borderRadius: 4, backgroundColor: '#ece5ea' }}>
              <View style={{ height: 8, borderRadius: 4, width: `${(counts[i] / max) * 100}%`, backgroundColor: own ? colors.purple : colors.mutedLight }} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

export function ImpulsCard({ impuls }: { impuls: Impuls }) {
  const { saves, toggleSave, reactions, setReaction } = useAppState();
  const saved = !!saves[impuls.id];
  const answered = reactions[impuls.id];

  const onShare = async () => {
    const text = `${impuls.headline}\n\n${impuls.text}\n\n— shevality · ${APP_URL}`;
    try {
      if (Platform.OS === 'web') {
        const nav: any = typeof navigator !== 'undefined' ? navigator : null;
        if (nav?.share) await nav.share({ text, title: 'shevality' });
        else if (nav?.clipboard) await nav.clipboard.writeText(APP_URL);
      } else {
        await Share.share({ message: APP_URL });
      }
    } catch {
      /* egal */
    }
  };

  const scaleReaction = impuls.reaction.type === 'scale' ? impuls.reaction : null;
  const optionsReaction = impuls.reaction.type === 'options' ? impuls.reaction : null;

  let scaleLabels: string[] = [];
  let scaleCounts: number[] = [];
  let scaleTotal = 0;
  let ownIndex = -1;
  if (scaleReaction) {
    const { min, max } = scaleReaction;
    scaleLabels = Array.from({ length: max - min + 1 }, (_, i) => String(min + i));
    ownIndex = answered != null ? Number(answered) - min : -1;
    const d = withOwn(scaleReaction.baseline, ownIndex);
    scaleCounts = d.counts;
    scaleTotal = d.total;
  } else if (optionsReaction) {
    ownIndex = answered != null ? optionsReaction.options.findIndex((o) => o.value === answered) : -1;
    const d = withOwn(optionsReaction.baseline, ownIndex);
    scaleCounts = d.counts;
    scaleTotal = d.total;
  }

  return (
    <View style={{ backgroundColor: colors.white, borderRadius: 24, borderWidth: 1, borderColor: colors.cardBorder, padding: 20, marginTop: 16 }}>
      <Text style={{ fontFamily: fonts.young, fontSize: 21, lineHeight: 26, color: colors.ink, letterSpacing: -0.2 }}>{impuls.headline}</Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 10 }}>{impuls.text}</Text>

      <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 15, color: colors.pink, marginTop: 14 }}>{impuls.question}</Text>

      {!answered ? (
        <View style={{ marginTop: 14 }}>
          {scaleReaction && (
            <View>
              <View style={{ flexDirection: 'row', gap: 9 }}>
                {Array.from({ length: scaleReaction.max - scaleReaction.min + 1 }, (_, i) => scaleReaction.min + i).map((n) => (
                  <Pressable
                    key={n}
                    onPress={() => setReaction(impuls.id, String(n))}
                    style={{ flex: 1, height: 44, borderRadius: 14, borderWidth: 1.4, borderColor: colors.cardBorder, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ fontFamily: fonts.hanken700, fontSize: 15, color: colors.ink }}>{n}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <Text style={{ fontFamily: fonts.hanken400, fontSize: 10.5, color: colors.mutedLight }}>{scaleReaction.minLabel}</Text>
                <Text style={{ fontFamily: fonts.hanken400, fontSize: 10.5, color: colors.mutedLight }}>{scaleReaction.maxLabel}</Text>
              </View>
            </View>
          )}
          {optionsReaction && (
            <View style={{ gap: 9 }}>
              {optionsReaction.options.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setReaction(impuls.id, opt.value)}
                  style={{ paddingVertical: 13, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1.4, borderColor: colors.cardBorder }}
                >
                  <Text style={{ fontFamily: fonts.hanken500, fontSize: 13.5, color: colors.ink }}>{opt.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      ) : (
        <View style={{ marginTop: 14 }}>
          <Bars
            labels={scaleReaction ? scaleLabels : optionsReaction ? optionsReaction.options.map((o) => o.label) : []}
            counts={scaleCounts}
            total={scaleTotal}
            ownIndex={ownIndex}
          />
        </View>
      )}

      <View style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark fontSize={15} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Pressable
            onPress={() => toggleSave(impuls.id)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8, paddingHorizontal: 13, borderRadius: 99, borderWidth: 1.4, borderColor: saved ? colors.purple : colors.cardBorder, backgroundColor: saved ? colors.purpleLight : 'transparent' }}
          >
            <Text style={{ fontSize: 12, color: saved ? colors.purple : colors.muted }}>{saved ? '✓' : '☆'}</Text>
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: saved ? colors.purple : colors.muted }}>{saved ? 'Gemerkt' : 'Merken'}</Text>
          </Pressable>
          <Pressable onPress={onShare} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 99, backgroundColor: colors.purple }}>
            <Text style={{ fontSize: 12, color: colors.white }}>↗</Text>
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: colors.white }}>Teilen</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
