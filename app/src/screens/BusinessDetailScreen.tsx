import React, { useMemo } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { BUSINESSES, CRIT } from '../data/constants';
import { CritKey } from '../data/types';
import { EntdeckenStackParamList } from '../navigation/types';
import { ArchImage } from '../components/ArchImage';

type Props = NativeStackScreenProps<EntdeckenStackParamList, 'BusinessDetail'>;

const CRIT_KEYS = Object.keys(CRIT) as CritKey[];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16, paddingVertical: 15, paddingHorizontal: 2, borderBottomWidth: 1, borderBottomColor: colors.hairlineMed }}>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, color: colors.muted, flexShrink: 0 }}>{label}</Text>
      <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: colors.ink, flex: 1, textAlign: 'right' }}>{value}</Text>
    </View>
  );
}

export function BusinessDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const business = useMemo(() => BUSINESSES.find((b) => b.id === id), [id]);
  if (!business) return null;

  const critList = CRIT_KEYS.map((k) => {
    const met = business.crit[k];
    return {
      key: k,
      label: CRIT[k].label,
      basis: met ? CRIT[k].basis : 'Noch nicht geprüft',
      mark: met ? '✓' : '–',
      ring: met ? colors.purple : colors.purpleRingOff,
      ink: met ? colors.purple : colors.purpleInkOff,
      labelColor: met ? colors.ink : colors.mutedLight,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 22, paddingTop: 8, paddingBottom: 6 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 17, color: colors.ink }}>‹</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>Entdecken</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <ArchImage uri={business.image} height={280} radiusTop={140} radiusBottom={20} style={{ marginHorizontal: 22, marginTop: 8 }} />

        <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
          <Text style={{ fontFamily: fonts.young, fontSize: 31, lineHeight: 32, color: colors.ink, letterSpacing: -0.31 }}>{business.name}</Text>
          <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, color: colors.pink, marginTop: 7 }}>
            {business.category} · {business.neighborhood}
          </Text>

          {!!business.description && (
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 14, lineHeight: 21, color: colors.muted, marginTop: 14 }}>
              {business.description}
            </Text>
          )}

          {business.verified === false && (
            <View style={{ marginTop: 16, borderRadius: 14, backgroundColor: '#FBF3E7', borderWidth: 1, borderColor: '#E9D4AE', padding: 13, flexDirection: 'row', gap: 9 }}>
              <Text style={{ fontSize: 14 }}>⚠️</Text>
              <Text style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 12, lineHeight: 17, color: '#8A6D3B' }}>
                Kandidatin – noch nicht geprüft. Der Hinweis auf eine weibliche Leitung beruht auf einer
                ersten Einschätzung und wurde noch nicht persönlich bestätigt.
              </Text>
            </View>
          )}

          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: colors.purpleBorder,
              borderRadius: 18,
              padding: 17,
              paddingHorizontal: 18,
              backgroundColor: colors.purpleFaint,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.white, fontSize: 10 }}>✓</Text>
              </View>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>Verifizierung</Text>
            </View>

            {critList.map((c) => (
              <View key={c.key} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 13 }}>
                <View
                  style={{
                    width: 18,
                    height: 18,
                    flexShrink: 0,
                    borderRadius: 9,
                    borderWidth: 1.3,
                    borderColor: c.ring,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                  }}
                >
                  <Text style={{ fontSize: 10, color: c.ink }}>{c.mark}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: c.labelColor }}>{c.label}</Text>
                  <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLighter, marginTop: 2 }}>{c.basis}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 8 }}>
            <InfoRow label="Adresse" value={business.address} />
            {!!business.owner && <InfoRow label="Inhaberin" value={business.owner} />}
            {!!business.rechtsform && <InfoRow label="Rechtsform" value={business.rechtsform} />}
            {!!business.hours && <InfoRow label="Öffnungszeiten" value={business.hours} />}
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  business.lat != null && business.lng != null
                    ? `https://www.google.com/maps/search/?api=1&query=${business.lat},${business.lng}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`,
                )
              }
              style={{ flex: 1, height: 48, borderRadius: 24, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 13.5, color: colors.white }}>Route</Text>
            </Pressable>
            {!!business.website && (
              <Pressable
                onPress={() => Linking.openURL(business.website!)}
                style={{ flex: 1, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontFamily: fonts.hanken600, fontSize: 13.5, color: colors.ink }}>Website</Text>
              </Pressable>
            )}
          </View>

          {!!business.source && (
            <Pressable onPress={() => Linking.openURL(business.source!)} style={{ marginTop: 14 }}>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight, textAlign: 'center' }}>
                Quelle: Impressum ›
              </Text>
            </Pressable>
          )}

          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 11, color: colors.mutedLight, textAlign: 'center', marginTop: 13 }}>
            Shevality ist kein Marktplatz — du entdeckst, wohin du dein Geld trägst.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
