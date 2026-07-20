import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { Wordmark } from '../../components/Wordmark';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export function LandingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center' }}>
        <Wordmark fontSize={38} />
        <Text style={{ fontFamily: fonts.young, fontSize: 24, lineHeight: 32, color: colors.ink, textAlign: 'center', marginTop: 22, letterSpacing: -0.3 }}>
          Für Frauen in Frankfurt.
        </Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 14.5, lineHeight: 22, color: colors.muted, textAlign: 'center', marginTop: 14, maxWidth: 320 }}>
          Gleich geht's um ein paar Fragen zu dir und wie du andere Frauen erlebst — dauert etwa 4 Minuten. Danach hast du sofort Zugang zu Hilfe- und Notfallnummern und einem Feed mit Impulsen.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 28, paddingBottom: 28 }}>
        <Pressable
          onPress={() => navigation.navigate('Consent')}
          style={{ height: 54, borderRadius: 27, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 15, color: colors.white }}>Los geht's</Text>
        </Pressable>
        <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 12, color: colors.mutedLight, textAlign: 'center', marginTop: 14 }}>
          Kein Konto nötig, um anzufangen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
