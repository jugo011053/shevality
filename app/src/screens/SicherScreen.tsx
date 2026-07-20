import React from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CONTACTS } from '../data/constants';
import { LocationIcon, PhoneIcon } from '../components/Icons';
import { useLang } from '../state/LangContext';

function call(number: string) {
  Linking.openURL(`tel:${number.replace(/\s+/g, '')}`);
}

const T = {
  title: { de: 'Sicher', en: 'Safety' },
  tagline: { de: 'Schnelle Hilfe & sichere Wege — ohne Suchen', en: 'Fast help & safe routes — no searching' },
  policeTitle: { de: 'Polizei-Notruf', en: 'Police emergency' },
  policeSub: { de: 'Bei akuter Gefahr · ✓ bundesweit', en: 'In acute danger · ✓ nationwide' },
  helplineTitle: { de: 'Hilfetelefon 116 016', en: 'Helpline 116 016' },
  helplineSub: { de: 'Gewalt gegen Frauen · kostenlos, anonym, 24/7 · ✓ bundesweit', en: 'Violence against women · free, anonymous, 24/7 · ✓ nationwide' },
  call: { de: 'Anrufen', en: 'Call' },
  homeTitle: { de: 'Sicher nach Hause', en: 'Getting home safely' },
  locationTitle: { de: 'Standort teilen', en: 'Share location' },
  locationSub: { de: 'Live mit einer Vertrauensperson', en: 'Live, with someone you trust' },
  companyTitle: { de: 'Heimweg-Begleitung', en: 'Walk-home companion' },
  companySub: { de: 'Jemand bleibt am Telefon', en: 'Someone stays on the phone' },
  adviceTitle: { de: 'Beratung in Frankfurt', en: 'Counselling in Frankfurt' },
  unverified: { de: 'noch zu verifizieren', en: 'not yet verified' },
  numberPending: { de: 'Nummer folgt', en: 'Number coming soon' },
  disclaimer: {
    de: '110 und 116 016 sind kostenlose, bundesweite Nummern. Andere Kontakte sind noch nicht amtlich verifiziert.',
    en: '110 and 116 016 are free, nationwide numbers. Other contacts are not yet officially verified.',
  },
};

export function SicherScreen() {
  const { lang } = useLang();
  const t = (o: { de: string; en: string }) => o[lang];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 10 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 32, color: colors.ink, letterSpacing: -0.32 }}>{t(T.title)}</Text>
          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 14, color: colors.pink, marginTop: 6 }}>
            {t(T.tagline)}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 18, gap: 11 }}>
          <Pressable
            onPress={() => call('110')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 18, borderRadius: 20, backgroundColor: colors.dark }}
          >
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,.13)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.white, fontFamily: fonts.hanken700, fontSize: 14 }}>110</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.hanken700, fontSize: 16, color: colors.white }}>{t(T.policeTitle)}</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>{t(T.policeSub)}</Text>
            </View>
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.white }}>{t(T.call)}</Text>
          </Pressable>

          <Pressable
            onPress={() => call('116016')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 18, borderRadius: 20, backgroundColor: colors.purple }}
          >
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,.18)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.white, fontFamily: fonts.hanken700, fontSize: 11 }}>116</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.hanken700, fontSize: 16, color: colors.white }}>{t(T.helplineTitle)}</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: 'rgba(255,255,255,.78)', marginTop: 2 }}>
                {t(T.helplineSub)}
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.white }}>{t(T.call)}</Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>{t(T.homeTitle)}</Text>
          <View style={{ flexDirection: 'row', gap: 11, marginTop: 13 }}>
            <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.hairlineBorder }}>
              <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#efe7f7', alignItems: 'center', justifyContent: 'center' }}>
                <LocationIcon size={16} color={colors.purple} />
              </View>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 14, color: colors.ink, marginTop: 11 }}>{t(T.locationTitle)}</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, lineHeight: 16, color: colors.muted, marginTop: 4 }}>
                {t(T.locationSub)}
              </Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.hairlineBorder }}>
              <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: colors.terracottaBg2, alignItems: 'center', justifyContent: 'center' }}>
                <PhoneIcon size={16} color="#c08a72" />
              </View>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 14, color: colors.ink, marginTop: 11 }}>{t(T.companyTitle)}</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, lineHeight: 16, color: colors.muted, marginTop: 4 }}>
                {t(T.companySub)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>{t(T.adviceTitle)}</Text>
          <View style={{ marginTop: 6 }}>
            {CONTACTS.map((c) => (
              <View
                key={c.name}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, borderTopWidth: 1, borderTopColor: colors.hairlineMed }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                    <Text style={{ fontFamily: fonts.hanken600, fontSize: 14.5, color: colors.ink }}>{c.name}</Text>
                    {!c.verified && (
                      <View style={{ paddingVertical: 2, paddingHorizontal: 8, borderRadius: 99, backgroundColor: '#FBF3E7' }}>
                        <Text style={{ fontFamily: fonts.hanken600, fontSize: 9.5, color: '#8A6D3B' }}>{t(T.unverified)}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: colors.muted, marginTop: 3 }}>{c.desc}</Text>
                </View>
                {c.number ? (
                  <Pressable
                    onPress={() => call(c.number)}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 99, borderWidth: 1.4, borderColor: colors.purple }}
                  >
                    <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: colors.purple }}>{c.number}</Text>
                  </Pressable>
                ) : (
                  <View style={{ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 99, borderWidth: 1.4, borderColor: colors.hairlineBorder }}>
                    <Text style={{ fontFamily: fonts.hanken500, fontSize: 12, color: colors.mutedLight }}>{t(T.numberPending)}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 11, lineHeight: 16, color: colors.mutedLight, marginTop: 16 }}>
            {t(T.disclaimer)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
