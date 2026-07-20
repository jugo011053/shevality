import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/types';
import { CONSENT_TEXT } from '../../data/questionnaire';
import { useOnboarding } from '../../state/OnboardingState';

type Props = NativeStackScreenProps<RootStackParamList, 'Consent'>;

export function ConsentScreen({ navigation }: Props) {
  const { setConsent } = useOnboarding();
  const [checked, setChecked] = useState(false);

  const accept = () => {
    setConsent(true);
    navigation.navigate('Questionnaire');
  };
  const decline = () => {
    setConsent(false);
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 26, paddingTop: 22, paddingBottom: 24 }}>
        <Text style={{ fontFamily: fonts.young, fontSize: 27, color: colors.ink, letterSpacing: -0.3 }}>{CONSENT_TEXT.title}</Text>
        {CONSENT_TEXT.paragraphs.map((p, i) => (
          <Text key={i} style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 21, color: colors.muted, marginTop: 14 }}>
            {p}
          </Text>
        ))}

        <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, lineHeight: 20, color: colors.ink, marginTop: 20 }}>
          {CONSENT_TEXT.confirm}
        </Text>

        <Pressable
          onPress={() => setChecked((c) => !c)}
          style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginTop: 16 }}
        >
          <View
            style={{
              width: 24, height: 24, borderRadius: 7, marginTop: 1, flexShrink: 0,
              borderWidth: 1.6, borderColor: checked ? colors.purple : colors.cardBorder,
              backgroundColor: checked ? colors.purple : colors.white,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {checked && <Text style={{ color: colors.white, fontSize: 13, fontWeight: '700' }}>✓</Text>}
          </View>
          <Text style={{ flex: 1, fontFamily: fonts.hanken500, fontSize: 14, lineHeight: 20, color: colors.ink }}>
            {CONSENT_TEXT.checkboxLabel}
          </Text>
        </Pressable>
      </ScrollView>

      <View style={{ paddingHorizontal: 26, paddingBottom: 24, paddingTop: 8 }}>
        <Pressable
          onPress={accept}
          disabled={!checked}
          style={{ height: 54, borderRadius: 27, backgroundColor: checked ? colors.purple : colors.purpleRingOff, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 15, color: colors.white }}>Weiter</Text>
        </Pressable>
        <Pressable onPress={decline} style={{ marginTop: 14, alignItems: 'center' }}>
          <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: colors.mutedLight }}>{CONSENT_TEXT.decline}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
