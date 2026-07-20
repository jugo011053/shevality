import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { FeedStackParamList } from '../navigation/types';
import { Wordmark } from '../components/Wordmark';
import { ImpulsCard } from '../components/ImpulsCard';
import { InstallHint } from '../components/InstallHint';
import { IMPULSES } from '../data/impulses';
import { useLang } from '../state/LangContext';
import { Lang } from '../data/feed';

type Props = NativeStackScreenProps<FeedStackParamList, 'FeedHome'>;

export function FeedScreen({ navigation }: Props) {
  const { lang, setLang } = useLang();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable
            onPress={() => navigation.navigate('Gemerkt')}
            style={{ width: 38, height: 38, borderRadius: 99, borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 16, color: colors.purple }}>☆</Text>
          </Pressable>
          <View style={{ flexDirection: 'row', backgroundColor: colors.white, borderRadius: 99, borderWidth: 1, borderColor: colors.cardBorder, padding: 2 }}>
            {(['de', 'en'] as Lang[]).map((l) => {
              const active = lang === l;
              return (
                <Pressable
                  key={l}
                  onPress={() => setLang(l)}
                  style={{ paddingVertical: 5, paddingHorizontal: 12, borderRadius: 99, backgroundColor: active ? colors.purple : 'transparent' }}
                >
                  <Text style={{ fontFamily: fonts.hanken700, fontSize: 11.5, letterSpacing: 0.5, color: active ? colors.white : colors.muted }}>
                    {l.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 4, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {IMPULSES.map((impuls) => (
          <ImpulsCard key={impuls.id} impuls={impuls} />
        ))}

        <View style={{ alignItems: 'center', paddingTop: 40, paddingBottom: 16, paddingHorizontal: 20 }}>
          <View style={{ width: 34, height: 1, backgroundColor: colors.hairlineStrong, marginBottom: 18 }} />
          <Text style={{ fontFamily: fonts.young, fontSize: 22, color: colors.ink, textAlign: 'center', letterSpacing: -0.3 }}>
            Du bist auf dem Stand.
          </Text>
          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 13.5, color: colors.mutedLight, textAlign: 'center', marginTop: 8, lineHeight: 19 }}>
            Kein Endlos-Scroll. Schau später wieder vorbei.
          </Text>
        </View>
      </ScrollView>
      <InstallHint />
    </SafeAreaView>
  );
}
