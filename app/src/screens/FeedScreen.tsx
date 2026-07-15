import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { FeedStackParamList } from '../navigation/types';
import { Wordmark } from '../components/Wordmark';
import { FeedCard } from '../components/feed2/FeedCards';
import { FEED_POSTS, Lang, mixFeed, orderFeed } from '../data/feed';

type Props = NativeStackScreenProps<FeedStackParamList, 'FeedHome'>;

export function FeedScreen({ navigation }: Props) {
  const [lang, setLang] = useState<Lang>('de');
  const posts = useMemo(() => orderFeed(mixFeed(FEED_POSTS)), []);

  const ctx = useMemo(
    () => ({
      lang,
      onOpenBusiness: (id: string) =>
        (navigation.getParent() as any)?.navigate('Entdecken', { screen: 'BusinessDetail', params: { id } }),
      onOpenDiscover: () =>
        (navigation.getParent() as any)?.navigate('Entdecken', { screen: 'EntdeckenHome' }),
    }),
    [lang, navigation],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark />
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

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 4, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} ctx={ctx} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
