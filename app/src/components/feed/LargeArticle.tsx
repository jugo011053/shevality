import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { ArticleFeedItem } from '../../data/types';
import { CAT } from '../../data/constants';
import { useAppState } from '../../state/AppState';
import { likeCountFor, commentCountFor } from '../../utils/feedHelpers';
import { ArchImage } from '../ArchImage';
import { BookmarkIcon, CommentIcon, HeartIcon, ShareIcon } from '../Icons';

export function LargeArticle({ item, onOpen }: { item: ArticleFeedItem; onOpen: () => void }) {
  const { likes, saves, comments, toggleLike, toggleSave } = useAppState();
  const cat = CAT[item.cat];
  const liked = !!likes[item.id];
  const saved = !!saves[item.id];

  return (
    <Pressable
      onPress={onOpen}
      style={{ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.hairline }}
    >
      <ArchImage uri={item.image} height={222} radiusTop={84} radiusBottom={16} />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 14 }}>
        <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: cat.dot }} />
        <Text style={{ fontFamily: fonts.hanken700, fontSize: 9.5, letterSpacing: 1.5, color: colors.ink }}>{cat.label}</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: colors.mutedLight }}>· {item.readtime}</Text>
      </View>

      <Text style={{ fontFamily: fonts.young, fontSize: 25, lineHeight: 27, color: colors.ink, letterSpacing: -0.25, marginTop: 9 }}>
        {item.title}
      </Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, lineHeight: 20, color: colors.inkSoft, marginTop: 8 }}>
        {item.standfirst}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 15 }}>
        <Pressable onPress={() => toggleLike(item.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <HeartIcon size={18} color={liked ? colors.pinkStrong : colors.saveInactive} fill={liked ? colors.pinkStrong : 'none'} />
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: liked ? colors.pinkStrong : colors.saveInactive }}>
            {likeCountFor(item, likes)}
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <CommentIcon size={18} color={colors.saveInactive} />
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: colors.saveInactive }}>
            {commentCountFor(item, comments)}
          </Text>
        </View>
        <ShareIcon size={18} color={colors.saveInactive} />
        <Pressable onPress={() => toggleSave(item.id)} style={{ marginLeft: 'auto' }}>
          <BookmarkIcon size={18} color={saved ? colors.purple : colors.saveInactive} fill={saved ? colors.purple : 'none'} />
        </Pressable>
      </View>
    </Pressable>
  );
}
