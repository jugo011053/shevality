import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { BUSINESSES, CRIT, NEIGHBORHOOD_ORDER } from '../data/constants';
import { CritKey } from '../data/types';
import { EntdeckenStackParamList } from '../navigation/types';
import { ArchImage } from '../components/ArchImage';
import { SearchIcon } from '../components/Icons';

type Props = NativeStackScreenProps<EntdeckenStackParamList, 'EntdeckenHome'>;

const CRIT_KEYS = Object.keys(CRIT) as CritKey[];

export function EntdeckenScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<CritKey, boolean>>({ founded: false, ownership: false, leadership: false });

  const toggleFilter = (k: CritKey) => setFilters((f) => ({ ...f, [k]: !f[k] }));

  const groups = useMemo(() => {
    const activeFilters = CRIT_KEYS.filter((k) => filters[k]);
    const q = query.trim().toLowerCase();
    let list = BUSINESSES.filter((b) => activeFilters.every((k) => b.crit[k]));
    if (q) list = list.filter((b) => `${b.name} ${b.category} ${b.neighborhood}`.toLowerCase().includes(q));

    return NEIGHBORHOOD_ORDER.map((n) => {
      const items = list
        .filter((b) => b.neighborhood === n)
        .map((b) => {
          const verified = CRIT_KEYS.filter((k) => b.crit[k]);
          const verifLabel = verified.length === 3 ? 'Voll verifiziert' : CRIT[verified[0]].short;
          return { ...b, verifLabel };
        });
      return { neighborhood: n, count: `${items.length} ${items.length === 1 ? 'Ort' : 'Orte'}`, items };
    }).filter((g) => g.items.length > 0);
  }, [query, filters]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 24, paddingTop: 10 }}>
        <Text style={{ fontFamily: fonts.young, fontSize: 32, color: colors.ink, letterSpacing: -0.32 }}>Entdecken</Text>
        <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 14, color: colors.pink, marginTop: 6 }}>Frauengeführt in Frankfurt</Text>

        <View
          style={{
            marginTop: 15,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 17,
          }}
        >
          <SearchIcon />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Geschäft, Stadtteil …"
            placeholderTextColor={colors.mutedLighter}
            style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 14, color: colors.ink }}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 9, paddingHorizontal: 24, paddingTop: 15, paddingBottom: 6 }}>
        {CRIT_KEYS.map((k) => {
          const active = filters[k];
          return (
            <Pressable
              key={k}
              onPress={() => toggleFilter(k)}
              style={{
                paddingVertical: 9,
                paddingHorizontal: 15,
                borderRadius: 99,
                borderWidth: 1.4,
                borderColor: active ? colors.purple : colors.cardBorder,
                backgroundColor: active ? colors.purple : colors.white,
              }}
            >
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: active ? colors.white : colors.muted }}>{CRIT[k].short}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        {groups.map((g) => (
          <View key={g.neighborhood} style={{ marginTop: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 9, paddingBottom: 4 }}>
              <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>{g.neighborhood}</Text>
              <Text style={{ fontFamily: fonts.hanken500, fontSize: 11, color: colors.mutedLight }}>{g.count}</Text>
            </View>
            {g.items.map((b) => (
              <Pressable
                key={b.id}
                onPress={() => navigation.navigate('BusinessDetail', { id: b.id })}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                  paddingVertical: 14,
                  borderTopWidth: 1,
                  borderTopColor: colors.hairlineMed,
                }}
              >
                <ArchImage uri={b.image} height={68} radiusTop={30} radiusBottom={12} style={{ width: 60, flexShrink: 0 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.young, fontSize: 18, color: colors.ink, letterSpacing: -0.1 }}>{b.name}</Text>
                  <Text style={{ fontFamily: fonts.hanken400, fontSize: 12.5, color: colors.muted, marginTop: 4 }}>{b.category}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 }}>
                    <View style={{ width: 14, height: 14, borderRadius: 7, borderWidth: 1.2, borderColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 8, color: colors.purple }}>✓</Text>
                    </View>
                    <Text style={{ fontFamily: fonts.hanken500, fontSize: 10.5, color: colors.purple }}>{b.verifLabel}</Text>
                  </View>
                </View>
                <Text style={{ fontFamily: fonts.hanken400, fontSize: 20, color: colors.chevron }}>›</Text>
              </Pressable>
            ))}
          </View>
        ))}
        {groups.length === 0 && (
          <Text style={{ textAlign: 'center', paddingVertical: 40, paddingHorizontal: 20, fontFamily: fonts.hanken400, fontSize: 14, color: colors.mutedLight }}>
            Keine Treffer mit diesen Filtern.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
