import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { EventFeedItem } from '../../data/types';
import { useAppState } from '../../state/AppState';
import { BookmarkIcon } from '../Icons';

export function EventTile({ item, onOpen }: { item: EventFeedItem; onOpen: () => void }) {
  const { saves, toggleSave } = useAppState();
  const saved = !!saves[item.id];

  return (
    <Pressable
      onPress={onOpen}
      style={{
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        paddingVertical: 17,
        borderBottomWidth: 1,
        borderBottomColor: colors.hairline,
      }}
    >
      <View
        style={{
          width: 58,
          height: 66,
          flexShrink: 0,
          borderRadius: 16,
          backgroundColor: colors.terracottaBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontFamily: fonts.young, fontSize: 25, color: colors.terracotta }}>{item.day}</Text>
        <Text style={{ fontFamily: fonts.hanken600, fontSize: 9.5, color: colors.terracotta, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {item.month}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.hanken700, fontSize: 9, letterSpacing: 1.4, color: colors.terracotta }}>TERMIN</Text>
        <Text style={{ fontFamily: fonts.young, fontSize: 17, lineHeight: 20, color: colors.ink, marginTop: 5, letterSpacing: -0.1 }}>
          {item.title}
        </Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, color: colors.muted, marginTop: 6 }}>
          {item.place} · {item.time} Uhr
        </Text>
      </View>
      <Pressable onPress={() => toggleSave(item.id)}>
        <BookmarkIcon size={18} color={saved ? colors.purple : colors.saveInactive} fill={saved ? colors.purple : 'none'} />
      </Pressable>
    </Pressable>
  );
}
