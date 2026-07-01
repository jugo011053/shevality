import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { FEED, BUSINESSES, CAT, AVATAR_COLORS } from '../data/constants';
import { ArticleFeedItem, EventFeedItem } from '../data/types';
import { FeedStackParamList, RootTabParamList } from '../navigation/types';
import { useAppState } from '../state/AppState';
import { likeCountFor, commentCountFor } from '../utils/feedHelpers';
import { initialsOf, avatarColorFor } from '../utils/avatar';
import { ArchImage } from '../components/ArchImage';
import { Avatar } from '../components/Avatar';
import { BookmarkIcon, CommentIcon, HeartIcon, SendIcon, ShareIcon } from '../components/Icons';

type Props = NativeStackScreenProps<FeedStackParamList, 'StoryDetail'>;

function isOpenable(item: (typeof FEED)[number]): item is ArticleFeedItem | EventFeedItem {
  return item.type === 'article' || item.type === 'event';
}

export function StoryDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const story = useMemo(() => FEED.find((f) => f.id === id && isOpenable(f)) as ArticleFeedItem | EventFeedItem | undefined, [id]);
  const business = story?.businessId ? BUSINESSES.find((b) => b.id === story.businessId) : null;
  const { likes, saves, comments, toggleLike, toggleSave, addComment } = useAppState();
  const [draft, setDraft] = useState('');

  if (!story) return null;

  const cat = CAT[story.cat];
  const liked = !!likes[story.id];
  const saved = !!saves[story.id];
  const extra = comments[story.id] || [];

  const allComments = [
    ...extra.map((c) => ({ ...c, initials: initialsOf(c.name), background: 'gradient' })),
    ...story.comments.map((c) => ({ ...c, initials: initialsOf(c.name), background: avatarColorFor(c.name, AVATAR_COLORS) })),
  ];

  const openBusiness = () => {
    if (!business) return;
    navigation.getParent<NavigationProp<RootTabParamList>>()?.navigate('Entdecken', {
      screen: 'BusinessDetail',
      params: { id: business.id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 22, paddingTop: 8, paddingBottom: 6 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 17, color: colors.ink }}>‹</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>Feed</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <ArchImage uri={story.image} height={300} radiusTop={140} radiusBottom={20} style={{ marginHorizontal: 22, marginTop: 8 }} />

        <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
            <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: cat.dot }} />
            <Text style={{ fontFamily: fonts.hanken700, fontSize: 10, letterSpacing: 1.6, color: colors.ink }}>{cat.label}</Text>
            {story.type === 'article' && (
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, color: colors.mutedLight }}>· {story.readtime}</Text>
            )}
          </View>

          <Text style={{ fontFamily: fonts.young, fontSize: 32, lineHeight: 35, color: colors.ink, letterSpacing: -0.48, marginTop: 11 }}>
            {story.title}
          </Text>

          {story.type === 'event' && (
            <View
              style={{
                marginTop: 16,
                borderRadius: 18,
                backgroundColor: colors.terracottaBg2,
                paddingVertical: 15,
                paddingHorizontal: 17,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 13,
              }}
            >
              <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 15, color: colors.terracotta }}>{story.eventWhen}</Text>
              <View style={{ width: 1, height: 26, backgroundColor: 'rgba(176,106,79,.3)' }} />
              <Text style={{ fontFamily: fonts.hanken500, fontSize: 13, color: colors.terracotta }}>{story.eventPlace}</Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 22,
              marginTop: 18,
              paddingBottom: 18,
              borderBottomWidth: 1,
              borderBottomColor: colors.hairlineStrong,
            }}
          >
            <Pressable onPress={() => toggleLike(story.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <HeartIcon size={20} color={liked ? colors.pinkStrong : colors.saveInactive} fill={liked ? colors.pinkStrong : 'none'} />
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: liked ? colors.pinkStrong : colors.saveInactive }}>
                {likeCountFor(story, likes)}
              </Text>
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <CommentIcon size={20} color={colors.saveInactive} />
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: colors.saveInactive }}>
                {commentCountFor(story, comments)}
              </Text>
            </View>
            <ShareIcon size={20} color={colors.saveInactive} />
            <Pressable onPress={() => toggleSave(story.id)} style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <BookmarkIcon size={20} color={saved ? colors.purple : colors.saveInactive} fill={saved ? colors.purple : 'none'} />
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: saved ? colors.purple : colors.saveInactive }}>
                {saved ? 'Gemerkt' : 'Merken'}
              </Text>
            </Pressable>
          </View>

          {story.body.map((p, i) => (
            <Text key={i} style={{ fontFamily: fonts.hanken400, fontSize: 15, lineHeight: 24, color: colors.inkSoft, marginTop: 16 }}>
              {p}
            </Text>
          ))}

          {!!story.source && (
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, color: colors.mutedLight, marginTop: 18 }}>Quelle: {story.source}</Text>
          )}

          {!!business && (
            <Pressable
              onPress={openBusiness}
              style={{
                marginTop: 24,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                paddingVertical: 15,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: colors.hairlineBorder,
                borderRadius: 18,
              }}
            >
              <ArchImage uri={business.image} height={58} radiusTop={26} radiusBottom={11} style={{ width: 52, flexShrink: 0 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 11, color: colors.pink }}>Im Entdecken ansehen</Text>
                <Text style={{ fontFamily: fonts.young, fontSize: 18, color: colors.ink, marginTop: 3 }}>{business.name}</Text>
              </View>
              <Text style={{ fontFamily: fonts.hanken400, fontSize: 22, color: colors.purpleWordmark }}>›</Text>
            </Pressable>
          )}

          <View style={{ marginTop: 28 }}>
            <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>Community</Text>
            <View style={{ flexDirection: 'row', gap: 11, marginTop: 14 }}>
              <Avatar initials="Du" background="gradient" />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  borderColor: colors.cardBorder,
                  borderRadius: 20,
                  paddingLeft: 15,
                  paddingRight: 8,
                }}
              >
                <TextInput
                  value={draft}
                  onChangeText={setDraft}
                  placeholder="Etwas Bestärkendes schreiben …"
                  placeholderTextColor={colors.mutedLight}
                  style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 13, color: colors.ink, paddingVertical: 10 }}
                />
                <Pressable
                  onPress={() => {
                    addComment(story.id, draft);
                    setDraft('');
                  }}
                  style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center' }}
                >
                  <SendIcon size={15} color={colors.white} />
                </Pressable>
              </View>
            </View>

            {allComments.map((c, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 11, marginTop: 17 }}>
                <Avatar initials={c.initials} background={c.background} />
                <View style={{ flex: 1 }}>
                  <View style={{ backgroundColor: colors.white, borderRadius: 16, borderTopLeftRadius: 4, paddingVertical: 11, paddingHorizontal: 14 }}>
                    <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: colors.ink }}>{c.name}</Text>
                    <Text style={{ fontFamily: fonts.hanken400, fontSize: 13, lineHeight: 19, color: colors.inkSoft, marginTop: 3 }}>{c.text}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 6, paddingLeft: 4 }}>
                    <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight }}>{c.time}</Text>
                    <Text style={{ fontFamily: fonts.hanken600, fontSize: 11, color: colors.pink }}>Antworten</Text>
                    <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight }}>♡ {c.likes}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
