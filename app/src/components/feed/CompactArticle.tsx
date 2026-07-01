import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { ArticleFeedItem } from '../../data/types';
import { CAT } from '../../data/constants';
import { useAppState } from '../../state/AppState';
import { likeCountFor, commentCountFor } from '../../utils/feedHelpers';
import { ArchImage } from '../ArchImage';
import { BookmarkIcon, CommentIcon, HeartIcon } from '../Icons';

export function CompactArticle({ item, onOpen }: { item: ArticleFeedItem; onOpen: () => void }) {
  const { likes, saves, comments, toggleLike, toggleSave } = useAppState();
  const cat = CAT[item.cat];
  const liked = !!likes[item.id];
  const saved = !!saves[item.id];

  return (
    <Pressable
      onPress={onOpen}
      style={{ flexDirection: 'row', gap: 16, paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: colors.hairline }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: cat.dot }} />
          <Text style={{ fontFamily: fonts.hanken700, fontSize: 9, letterSpacing: 1.4, color: colors.ink }}>{cat.label}</Text>
          <Text style={{ fontFamily: fonts.hanken400, fontSize: 10.5, color: colors.mutedLight }}>· {item.readtime}</Text>
        </View>
        <Text style={{ fontFamily: fonts.young, fontSize: 18, lineHeight: 21, color: colors.ink, letterSpacing: -0.1, marginTop: 6 }}>
          {item.title}
        </Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 12.5, lineHeight: 18, color: colors.muted, marginTop: 6 }}>
          {item.standfirst}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 11 }}>
          <Pressable onPress={() => toggleLike(item.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <HeartIcon size={16} color={liked ? colors.pinkStrong : colors.saveInactive} fill={liked ? colors.pinkStrong : 'none'} />
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 11, color: liked ? colors.pinkStrong : colors.saveInactive }}>
              {likeCountFor(item, likes)}
            </Text>
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <CommentIcon size={16} color={colors.saveInactive} />
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 11, color: colors.saveInactive }}>
              {commentCountFor(item, comments)}
            </Text>
          </View>
          <Pressable onPress={() => toggleSave(item.id)} style={{ marginLeft: 'auto' }}>
            <BookmarkIcon size={16} color={saved ? colors.purple : colors.saveInactive} fill={saved ? colors.purple : 'none'} />
          </Pressable>
        </View>
      </View>
      {item.image && <ArchImage uri={item.image} height={108} radiusTop={44} radiusBottom={14} style={{ width: 96, flexShrink: 0 }} />}
    </Pressable>
  );
}
