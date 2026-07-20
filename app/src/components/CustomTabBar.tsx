import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { useLang } from '../state/LangContext';
import { TabEntdeckenIcon, TabFeedIcon, TabSicherIcon } from './Icons';

const TAB_META: Record<string, { label: { de: string; en: string }; Icon: typeof TabFeedIcon }> = {
  Feed: { label: { de: 'Feed', en: 'Feed' }, Icon: TabFeedIcon },
  Entdecken: { label: { de: 'Entdecken', en: 'Discover' }, Icon: TabEntdeckenIcon },
  Sicher: { label: { de: 'Sicher', en: 'Safety' }, Icon: TabSicherIcon },
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { lang } = useLang();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingTop: 12,
        paddingBottom: Math.max(insets.bottom, 12),
        paddingHorizontal: 16,
        backgroundColor: '#fbf2f5',
        borderTopWidth: 1,
        borderTopColor: 'rgba(120,60,90,.1)',
      }}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const meta = TAB_META[route.name];
        if (!meta) return null;
        const color = focused ? colors.purple : colors.purpleInkOff;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ alignItems: 'center', gap: 4 }}
          >
            <meta.Icon size={24} color={color} />
            <Text style={{ fontFamily: fonts.hanken600, fontSize: 10.5, color }}>{meta.label[lang]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
