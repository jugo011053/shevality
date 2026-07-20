import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useLang } from '../state/LangContext';

// Stub für das Feature-Flag SHOW_NETWORKS. Beispieldaten liegen bewusst hier,
// bis eine echte Liste von Frankfurter Frauennetzwerken feststeht.
const PLACEHOLDER_NETWORKS = [
  { name: 'Netzwerk Frauen in Führung Frankfurt', desc: 'Mentoring & Austausch für Führungsfrauen.' },
  { name: 'Digital Women Frankfurt', desc: 'Community für Frauen in Tech.' },
  { name: 'Gründerinnen-Stammtisch Rhein-Main', desc: 'Monatliches Treffen für Selbstständige.' },
];

export function NetworksScreen() {
  const { lang } = useLang();
  const title = lang === 'de' ? 'Netzwerke' : 'Networks';
  const tagline = lang === 'de' ? 'Frauennetzwerke in Frankfurt' : "Women's networks in Frankfurt";
  const note =
    lang === 'de'
      ? 'Platzhalter-Beispiele — diese Liste ist noch nicht geprüft.'
      : 'Placeholder examples — this list is not yet verified.';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 24 }}>
        <Text style={{ fontFamily: fonts.young, fontSize: 32, color: colors.ink, letterSpacing: -0.32 }}>{title}</Text>
        <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 14, color: colors.pink, marginTop: 6 }}>{tagline}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: colors.mutedLight, marginTop: 14 }}>{note}</Text>

        <View style={{ marginTop: 14 }}>
          {PLACEHOLDER_NETWORKS.map((n) => (
            <View key={n.name} style={{ paddingVertical: 15, borderTopWidth: 1, borderTopColor: colors.hairlineMed }}>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 14.5, color: colors.ink }}>{n.name}</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: colors.muted, marginTop: 3 }}>{n.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
