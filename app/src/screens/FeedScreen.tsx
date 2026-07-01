import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { FEED, FEED_TABS } from '../data/constants';
import { FeedStackParamList } from '../navigation/types';
import { FeedTabKey } from '../data/types';
import { useAppState } from '../state/AppState';
import { Wordmark } from '../components/Wordmark';
import { LargeArticle } from '../components/feed/LargeArticle';
import { CompactArticle } from '../components/feed/CompactArticle';
import { FactCard } from '../components/feed/FactCard';
import { QuoteCard } from '../components/feed/QuoteCard';
import { EventTile } from '../components/feed/EventTile';

const DAY_LABELS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

type Props = NativeStackScreenProps<FeedStackParamList, 'FeedHome'>;

export function FeedScreen({ navigation }: Props) {
  const [feedTab, setFeedTab] = useState<FeedTabKey>('fuer-dich');
  const { saves } = useAppState();

  const dayLabel = useMemo(() => DAY_LABELS[new Date().getDay()], []);

  const items = useMemo(() => {
    if (feedTab === 'lokal') return FEED.filter((i) => i.cat === 'lokal');
    if (feedTab === 'welt') return FEED.filter((i) => i.cat === 'welt');
    if (feedTab === 'wissen') return FEED.filter((i) => i.cat === 'wissen');
    if (feedTab === 'gemerkt') return FEED.filter((i) => saves[i.id]);
    return FEED;
  }, [feedTab, saves]);

  const openStory = (id: string) => navigation.navigate('StoryDetail', { id });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark />
        <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 14, color: colors.pink }}>{dayLabel}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, borderBottomWidth: 1, borderBottomColor: colors.hairline }}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 20 }}
      >
        {FEED_TABS.map((t) => {
          const active = feedTab === t.key;
          return (
            <Text
              key={t.key}
              onPress={() => setFeedTab(t.key)}
              style={{
                paddingVertical: 12,
                fontFamily: active ? fonts.hanken700 : fonts.hanken500,
                fontSize: 14,
                color: active ? colors.ink : colors.mutedFaint,
                borderBottomWidth: 2,
                borderBottomColor: active ? colors.purple : 'transparent',
              }}
            >
              {t.label}
            </Text>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 2, paddingBottom: 26 }}>
        {items.map((it) => {
          if (it.type === 'article' && it.size === 'large') return <LargeArticle key={it.id} item={it} onOpen={() => openStory(it.id)} />;
          if (it.type === 'article' && it.size === 'compact') return <CompactArticle key={it.id} item={it} onOpen={() => openStory(it.id)} />;
          if (it.type === 'fact') return <FactCard key={it.id} item={it} />;
          if (it.type === 'quote') return <QuoteCard key={it.id} item={it} />;
          if (it.type === 'event') return <EventTile key={it.id} item={it} onOpen={() => openStory(it.id)} />;
          return null;
        })}
        {items.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 64, paddingHorizontal: 24 }}>
            <Text style={{ fontFamily: fonts.young, fontSize: 20, color: colors.ink }}>Noch nichts gemerkt</Text>
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, lineHeight: 20, color: colors.mutedLight, marginTop: 9, textAlign: 'center' }}>
              Tippe bei einem Beitrag auf das Lesezeichen, um ihn hier zu sammeln.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
