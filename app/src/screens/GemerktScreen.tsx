import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { FeedStackParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { FeedCard } from '../components/feed2/FeedCards';
import { ArchImage } from '../components/ArchImage';
import { FEED_POSTS, Lang } from '../data/feed';
import { BUSINESSES } from '../data/constants';

type Props = NativeStackScreenProps<FeedStackParamList, 'Gemerkt'>;

export function GemerktScreen({ navigation }: Props) {
  const [lang, setLang] = useState<Lang>('de');
  const { saves } = useAppState();

  const savedBusinesses = useMemo(() => BUSINESSES.filter((b) => saves[b.id]), [saves]);
  const savedPosts = useMemo(() => FEED_POSTS.filter((p) => saves[p.id]), [saves]);

  const openBusiness = (id: string) =>
    (navigation.getParent() as any)?.navigate('Entdecken', { screen: 'BusinessDetail', params: { id } });

  const ctx = useMemo(
    () => ({
      lang,
      onOpenBusiness: openBusiness,
      onOpenDiscover: () => (navigation.getParent() as any)?.navigate('Entdecken', { screen: 'EntdeckenHome' }),
    }),
    [lang, navigation],
  );

  const empty = savedBusinesses.length === 0 && savedPosts.length === 0;
  const t = {
    title: lang === 'de' ? 'Gemerkt' : 'Saved',
    back: lang === 'de' ? 'Feed' : 'Feed',
    places: lang === 'de' ? 'Gemerkte Läden' : 'Saved places',
    posts: lang === 'de' ? 'Gemerkte Beiträge' : 'Saved posts',
    emptyTitle: lang === 'de' ? 'Noch nichts gemerkt' : 'Nothing saved yet',
    emptySub:
      lang === 'de'
        ? 'Tippe bei einem Beitrag oder Laden auf „Merken", um ihn hier zu sammeln.'
        : 'Tap “Save” on a post or place to collect it here.',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 8, paddingBottom: 10 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, minWidth: 70 }}>
          <Text style={{ fontSize: 17, color: colors.ink }}>‹</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>{t.back}</Text>
        </Pressable>
        <Text style={{ fontFamily: fonts.young, fontSize: 20, color: colors.ink }}>{t.title}</Text>
        <View style={{ flexDirection: 'row', backgroundColor: colors.white, borderRadius: 99, borderWidth: 1, borderColor: colors.cardBorder, padding: 2, minWidth: 70, justifyContent: 'flex-end' }}>
          {(['de', 'en'] as Lang[]).map((l) => {
            const active = lang === l;
            return (
              <Pressable key={l} onPress={() => setLang(l)} style={{ paddingVertical: 4, paddingHorizontal: 9, borderRadius: 99, backgroundColor: active ? colors.purple : 'transparent' }}>
                <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, color: active ? colors.white : colors.muted }}>{l.toUpperCase()}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {empty && (
          <View style={{ alignItems: 'center', paddingTop: 80, paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 30 }}>☆</Text>
            <Text style={{ fontFamily: fonts.young, fontSize: 20, color: colors.ink, marginTop: 10 }}>{t.emptyTitle}</Text>
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, lineHeight: 20, color: colors.mutedLight, marginTop: 9, textAlign: 'center' }}>{t.emptySub}</Text>
          </View>
        )}

        {savedBusinesses.length > 0 && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontFamily: fonts.hanken700, fontSize: 11, letterSpacing: 1.2, color: colors.pink, marginBottom: 4 }}>{t.places.toUpperCase()}</Text>
            {savedBusinesses.map((b) => (
              <Pressable key={b.id} onPress={() => openBusiness(b.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderTopWidth: 1, borderTopColor: colors.hairlineMed }}>
                <ArchImage uri={b.image} height={60} radiusTop={28} radiusBottom={12} style={{ width: 54, flexShrink: 0 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.young, fontSize: 18, color: colors.ink }}>{b.name}</Text>
                  <Text style={{ fontFamily: fonts.hanken400, fontSize: 12.5, color: colors.muted, marginTop: 3 }}>{b.category} · {b.neighborhood}</Text>
                </View>
                <Text style={{ fontFamily: fonts.hanken400, fontSize: 20, color: colors.chevron }}>›</Text>
              </Pressable>
            ))}
          </View>
        )}

        {savedPosts.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: fonts.hanken700, fontSize: 11, letterSpacing: 1.2, color: colors.pink }}>{t.posts.toUpperCase()}</Text>
            {savedPosts.map((post) => (
              <FeedCard key={post.id} post={post} ctx={ctx} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
