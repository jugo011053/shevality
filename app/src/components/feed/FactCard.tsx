import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { FactFeedItem } from '../../data/types';
import { CAT } from '../../data/constants';

export function FactCard({ item }: { item: FactFeedItem }) {
  const cat = CAT[item.cat];
  return (
    <View style={{ marginVertical: 18, borderRadius: 22, padding: 24, paddingHorizontal: 22, backgroundColor: colors.purpleLight }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: cat.dot }} />
        <Text style={{ fontFamily: fonts.hanken700, fontSize: 9.5, letterSpacing: 1.5, color: '#6b4f86' }}>{cat.label}</Text>
      </View>
      <Text style={{ fontFamily: fonts.young, fontSize: 52, color: colors.purple, marginTop: 14, letterSpacing: -1 }}>
        {item.stat}
      </Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 15, lineHeight: 22, color: '#4a3f52', marginTop: 11 }}>
        {item.statLabel}
      </Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: '#a08eb0', marginTop: 11 }}>{item.source}</Text>
    </View>
  );
}
