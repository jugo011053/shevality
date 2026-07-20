import React, { useMemo } from 'react';
import { Platform, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { Wordmark } from '../../components/Wordmark';
import { RootStackParamList } from '../../navigation/types';
import { useOnboarding } from '../../state/OnboardingState';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

const APP_URL = 'https://jugo011053.github.io/shevality/';

// Einfache, regelbasierte Kurz-Auswertung aus den eigenen Antworten.
// Bewusst schlicht gehalten (kein psychometrisches Modell) — warm formuliert,
// nicht bewertend. Leicht erweiterbar, sobald mehr Auswertungslogik gewünscht ist.
function toNum(v?: string): number | null {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function buildStatements(answers: Record<string, string>): string[] {
  const out: string[] = [];

  const allies = toNum(answers['q18']); // 1 Konkurrentinnen … 7 Verbündete
  if (allies != null) {
    if (allies >= 6) out.push('Du erlebst andere Frauen ganz überwiegend als Verbündete, nicht als Konkurrentinnen.');
    else if (allies >= 5) out.push('Du erlebst andere Frauen deutlich stärker als Verbündete denn als Konkurrentinnen.');
    else if (allies === 4) out.push('Du erlebst andere Frauen als Mischung aus Verbündeten und Konkurrentinnen.');
    else out.push('Gerade erlebst du dein Umfeld eher als Konkurrenz denn als Verbündete — ein ehrlicher Ausgangspunkt.');
  }

  const belonging = toNum(answers['q13']);
  const connected = toNum(answers['q12']);
  const avg = belonging != null && connected != null ? (belonging + connected) / 2 : belonging ?? connected;
  if (avg != null) {
    if (avg >= 5.5) out.push('Du fühlst dich Frauen verbunden — auch über Unterschiede hinweg.');
    else if (avg >= 3.5) out.push('Verbundenheit ist für dich manchmal spürbar da, manchmal nicht — das ist normal.');
    else out.push('Gerade fühlst du dich Frauen und dieser Stadt noch nicht besonders verbunden. Das darf sich zeigen, Schritt für Schritt.');
  }

  if (out.length === 0) {
    out.push('Danke, dass du dir die Zeit genommen hast. Was du mit anderen Frauen teilst, zeigt sich oft erst im Alltag.');
  }
  return out.slice(0, 2);
}

export function ResultScreen({ navigation }: Props) {
  const { response, enterApp } = useOnboarding();
  const statements = useMemo(() => buildStatements(response.answers), [response.answers]);

  const onShare = async () => {
    const text = statements.join(' ') + '\n\n— shevality · ' + APP_URL;
    try {
      if (Platform.OS === 'web') {
        const nav: any = typeof navigator !== 'undefined' ? navigator : null;
        if (nav?.share) await nav.share({ text, title: 'shevality' });
        else if (nav?.clipboard) await nav.clipboard.writeText(text);
      } else {
        await Share.share({ message: text });
      }
    } catch {
      /* egal */
    }
  };

  const skip = () => {
    enterApp();
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 26, paddingTop: 30, paddingBottom: 30, flexGrow: 1 }}>
        <View
          style={{
            borderRadius: 28, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.cardBorder,
            padding: 26, alignItems: 'center',
          }}
        >
          <View style={{ width: 40, height: 3, borderRadius: 2, backgroundColor: colors.purple, marginBottom: 20 }} />
          {statements.map((s, i) => (
            <Text
              key={i}
              style={{ fontFamily: fonts.young, fontSize: 22, lineHeight: 30, color: colors.ink, textAlign: 'center', letterSpacing: -0.2, marginTop: i === 0 ? 0 : 14 }}
            >
              {s}
            </Text>
          ))}
          <View style={{ marginTop: 24 }}>
            <Wordmark fontSize={16} />
          </View>
        </View>

        <Pressable
          onPress={onShare}
          style={{ marginTop: 16, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 99, backgroundColor: colors.purple }}
        >
          <Text style={{ fontSize: 13, color: colors.white }}>↗</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.white }}>Teilen</Text>
        </Pressable>

        <View style={{ marginTop: 34, borderTopWidth: 1, borderTopColor: colors.hairlineMed, paddingTop: 26 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 20, color: colors.ink, letterSpacing: -0.2 }}>Und jetzt?</Text>
          <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 21, color: colors.muted, marginTop: 10 }}>
            Mit deiner Registrierung bekommst du: die Hilfe- und Notfallnummern für Frankfurt, die Impulse im Feed — und
            in 6–8 Wochen eine kurze Rückmeldung, ob sich für dich etwas verändert hat.
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Register')}
            style={{ marginTop: 18, height: 54, borderRadius: 27, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 15, color: colors.white }}>Jetzt registrieren</Text>
          </Pressable>
          <Pressable onPress={skip} style={{ marginTop: 12, height: 46, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: colors.mutedLight }}>Ohne Registrierung weiter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
