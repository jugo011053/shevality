import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { EntdeckenStackParamList } from '../navigation/types';
import { useLang } from '../state/LangContext';
import { supabase, hasSupabase } from '../lib/supabase';

type Props = NativeStackScreenProps<EntdeckenStackParamList, 'Suggest'>;

const T = {
  title: { de: 'Laden vorschlagen', en: 'Suggest a place' },
  intro: {
    de: 'Kennst du ein frauengeführtes Geschäft in Frankfurt, das hier fehlt? Schreib uns kurz – wir prüfen jeden Vorschlag von Hand.',
    en: 'Know a women-led business in Frankfurt that’s missing here? Tell us briefly – we check every suggestion by hand.',
  },
  name: { de: 'Name des Geschäfts *', en: 'Business name *' },
  category: { de: 'Kategorie (z. B. Café, Friseur)', en: 'Category (e.g. café, salon)' },
  neighborhood: { de: 'Stadtteil', en: 'Neighbourhood' },
  address: { de: 'Adresse', en: 'Address' },
  website: { de: 'Website oder Instagram', en: 'Website or Instagram' },
  reason: { de: 'Warum, glaubst du, ist es frauengeführt?', en: 'Why do you think it’s women-led?' },
  contact: { de: 'Deine E-Mail (optional, für Rückfragen)', en: 'Your email (optional, for questions)' },
  submit: { de: 'Vorschlag senden', en: 'Send suggestion' },
  sending: { de: 'Wird gesendet …', en: 'Sending …' },
  doneTitle: { de: 'Danke!', en: 'Thank you!' },
  doneText: { de: 'Wir haben deinen Vorschlag erhalten und schauen ihn uns an.', en: 'We received your suggestion and will take a look.' },
  again: { de: 'Weiteren Laden vorschlagen', en: 'Suggest another place' },
  errorText: {
    de: 'Das hat leider nicht geklappt. Prüfe deine Internetverbindung und versuch es noch einmal.',
    en: 'Sorry, that didn’t work. Check your connection and try again.',
  },
  unavailable: {
    de: 'Vorschläge sind gerade nicht verfügbar. Versuch es später noch einmal.',
    en: 'Suggestions aren’t available right now. Please try again later.',
  },
  back: { de: 'Zurück', en: 'Back' },
};

function Field({ label, value, onChangeText, multiline, keyboardType }: {
  label: string; value: string; onChangeText: (t: string) => void; multiline?: boolean; keyboardType?: 'default' | 'email-address';
}) {
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: colors.muted, marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={{
          borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.white, borderRadius: 14,
          paddingHorizontal: 14, paddingVertical: multiline ? 12 : 12, fontFamily: fonts.hanken400, fontSize: 14,
          color: colors.ink, minHeight: multiline ? 80 : undefined, textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
    </View>
  );
}

export function SuggestScreen({ navigation }: Props) {
  const { lang } = useLang();
  const t = (o: { de: string; en: string }) => o[lang];

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const canSubmit = name.trim().length > 0 && state !== 'sending';

  const reset = () => {
    setName(''); setCategory(''); setNeighborhood(''); setAddress(''); setWebsite(''); setReason(''); setContact('');
    setState('idle');
  };

  const submit = async () => {
    if (!canSubmit) return;
    if (!hasSupabase || !supabase) {
      setState('error');
      return;
    }
    setState('sending');
    const { error } = await supabase.from('suggestions').insert({
      name: name.trim(),
      category: category.trim() || null,
      neighborhood: neighborhood.trim() || null,
      address: address.trim() || null,
      website: website.trim() || null,
      reason: reason.trim() || null,
      contact: contact.trim() || null,
    });
    setState(error ? 'error' : 'done');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 22, paddingTop: 8, paddingBottom: 6 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 17, color: colors.ink }}>‹</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>{t(T.back)}</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          <Text style={{ fontFamily: fonts.young, fontSize: 28, color: colors.ink, letterSpacing: -0.3, marginTop: 6 }}>{t(T.title)}</Text>

          {state === 'done' ? (
            <View style={{ marginTop: 22, alignItems: 'center', paddingVertical: 40, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 30 }}>💜</Text>
              <Text style={{ fontFamily: fonts.young, fontSize: 21, color: colors.ink, marginTop: 12 }}>{t(T.doneTitle)}</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.muted, textAlign: 'center', marginTop: 8 }}>{t(T.doneText)}</Text>
              <Pressable onPress={reset} style={{ marginTop: 20, paddingVertical: 11, paddingHorizontal: 20, borderRadius: 24, borderWidth: 1.5, borderColor: colors.ink }}>
                <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>{t(T.again)}</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.muted, marginTop: 10 }}>{t(T.intro)}</Text>

              <Field label={t(T.name)} value={name} onChangeText={setName} />
              <Field label={t(T.category)} value={category} onChangeText={setCategory} />
              <Field label={t(T.neighborhood)} value={neighborhood} onChangeText={setNeighborhood} />
              <Field label={t(T.address)} value={address} onChangeText={setAddress} />
              <Field label={t(T.website)} value={website} onChangeText={setWebsite} />
              <Field label={t(T.reason)} value={reason} onChangeText={setReason} multiline />
              <Field label={t(T.contact)} value={contact} onChangeText={setContact} keyboardType="email-address" />

              {state === 'error' && (
                <Text style={{ fontFamily: fonts.hanken500, fontSize: 12.5, color: '#a86b88', marginTop: 14 }}>
                  {hasSupabase ? t(T.errorText) : t(T.unavailable)}
                </Text>
              )}

              <Pressable
                onPress={submit}
                disabled={!canSubmit}
                style={{ marginTop: 22, height: 50, borderRadius: 25, backgroundColor: canSubmit ? colors.purple : colors.purpleRingOff, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontFamily: fonts.hanken600, fontSize: 14, color: colors.white }}>
                  {state === 'sending' ? t(T.sending) : t(T.submit)}
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
