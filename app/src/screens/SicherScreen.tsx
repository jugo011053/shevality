import React from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { CONTACTS } from '../data/constants';
import { LocationIcon, PhoneIcon } from '../components/Icons';

function call(number: string) {
  Linking.openURL(`tel:${number.replace(/\s+/g, '')}`);
}

export function SicherScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 10 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 32, color: colors.ink, letterSpacing: -0.32 }}>Sicher</Text>
          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 14, color: colors.pink, marginTop: 6 }}>
            Schnelle Hilfe & sichere Wege — ohne Suchen
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
              <Text style={{ fontFamily: fonts.hanken700, fontSize: 16, color: colors.white }}>Polizei-Notruf</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>Bei akuter Gefahr</Text>
            </View>
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.white }}>Anrufen</Text>
          </Pressable>

          <Pressable
            onPress={() => call('116016')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 18, borderRadius: 20, backgroundColor: colors.purple }}
          >
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,.18)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.white, fontFamily: fonts.hanken700, fontSize: 11 }}>116</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fonts.hanken700, fontSize: 16, color: colors.white }}>Hilfetelefon 116 016</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: 'rgba(255,255,255,.78)', marginTop: 2 }}>
                Gewalt gegen Frauen · kostenlos & anonym, 24/7
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.white }}>Anrufen</Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>Sicher nach Hause</Text>
          <View style={{ flexDirection: 'row', gap: 11, marginTop: 13 }}>
            <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.hairlineBorder }}>
              <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#efe7f7', alignItems: 'center', justifyContent: 'center' }}>
                <LocationIcon size={16} color={colors.purple} />
              </View>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 14, color: colors.ink, marginTop: 11 }}>Standort teilen</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, lineHeight: 16, color: colors.muted, marginTop: 4 }}>
                Live mit einer Vertrauensperson
              </Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.hairlineBorder }}>
              <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: colors.terracottaBg2, alignItems: 'center', justifyContent: 'center' }}>
                <PhoneIcon size={16} color="#c08a72" />
              </View>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 14, color: colors.ink, marginTop: 11 }}>Heimweg-Begleitung</Text>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, lineHeight: 16, color: colors.muted, marginTop: 4 }}>
                Jemand bleibt am Telefon
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>Beratung in Frankfurt</Text>
          <View style={{ marginTop: 6 }}>
            {CONTACTS.map((c) => (
              <View
                key={c.name}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, borderTopWidth: 1, borderTopColor: colors.hairlineMed }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.hanken600, fontSize: 14.5, color: colors.ink }}>{c.name}</Text>
                  <Text style={{ fontFamily: fonts.hanken400, fontSize: 12, color: colors.muted, marginTop: 3 }}>{c.desc}</Text>
                </View>
                <Pressable
                  onPress={() => call(c.number)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 99, borderWidth: 1.4, borderColor: colors.purple }}
                >
                  <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: colors.purple }}>{c.number}</Text>
                </Pressable>
              </View>
            ))}
          </View>
          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 11, lineHeight: 16, color: colors.mutedLight, marginTop: 16 }}>
            110 und 116 016 sind kostenlose, bundesweite Nummern. Weitere Angaben sind Beispiele für den Prototyp.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
