import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { QuoteFeedItem } from '../../data/types';

export function QuoteCard({ item }: { item: QuoteFeedItem }) {
  return (
    <View
      style={{
        paddingVertical: 26,
        paddingHorizontal: 4,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.hairline,
      }}
    >
      <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 25, lineHeight: 34, color: colors.ink }}>
        „{item.quoteText}"
      </Text>
      <Text style={{ fontFamily: fonts.hanken600, fontSize: 11.5, letterSpacing: 0.4, color: colors.pink, marginTop: 15 }}>
        — {item.quoteBy}
      </Text>
    </View>
  );
}
