import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/types';
import { useOnboarding } from '../../state/OnboardingState';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register, enterApp } = useOnboarding();
  const [value, setValue] = useState('');
  const [sent, setSent] = useState(false);

  const finish = () => {
    enterApp();
    navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
  };

  const submit = () => {
    if (value.trim().length < 3) return;
    register(value.trim());
    // Prototyp: kein echter Versand (kein Backend). Simuliert den Magic-Link/Code-Schritt.
    setSent(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 26, paddingTop: 40 }}>
        {!sent ? (
          <>
            <Text style={{ fontFamily: fonts.young, fontSize: 26, color: colors.ink, letterSpacing: -0.3 }}>Fast geschafft</Text>
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.muted, marginTop: 10 }}>
              E-Mail oder Handynummer reicht. Kein Passwort — wir schicken dir beim nächsten Mal einfach einen Code oder Link.
            </Text>

            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder="E-Mail oder Handynummer"
              placeholderTextColor={colors.mutedLighter}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                marginTop: 22, height: 54, borderRadius: 16, borderWidth: 1.4, borderColor: colors.cardBorder,
                backgroundColor: colors.white, paddingHorizontal: 18, fontFamily: fonts.hanken500, fontSize: 15, color: colors.ink,
              }}
            />

            <Pressable
              onPress={submit}
              disabled={value.trim().length < 3}
              style={{
                marginTop: 18, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center',
                backgroundColor: value.trim().length < 3 ? colors.purpleRingOff : colors.purple,
              }}
            >
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 15, color: colors.white }}>Registrieren</Text>
            </Pressable>

            <Pressable onPress={finish} style={{ marginTop: 14, height: 46, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: colors.mutedLight }}>Ohne Registrierung weiter</Text>
            </Pressable>
          </>
        ) : (
          <View style={{ alignItems: 'center', paddingTop: 40 }}>
            <Text style={{ fontSize: 30 }}>💜</Text>
            <Text style={{ fontFamily: fonts.young, fontSize: 22, color: colors.ink, marginTop: 14 }}>Willkommen bei Shevality</Text>
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.muted, textAlign: 'center', marginTop: 8 }}>
              Du bist registriert. Ab jetzt findest du hier die Hilfe-Nummern und den Feed.
            </Text>
            <Pressable onPress={finish} style={{ marginTop: 24, height: 54, width: '100%', borderRadius: 27, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 15, color: colors.white }}>Weiter zur App</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
