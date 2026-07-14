import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { EntdeckenStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<EntdeckenStackParamList, 'EntdeckenMap'>;

// Die interaktive Karte lebt als eigenständige Seite (map.html) und wird hier
// im Web als iframe eingebettet. Das hält die Karte vom App-Bundle entkoppelt.
export function MapScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 8, paddingBottom: 8 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', gap: 7, minWidth: 70 }}>
          <Text style={{ fontSize: 17, color: colors.ink }}>‹</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.ink }}>Liste</Text>
        </Pressable>
        <Text style={{ fontFamily: fonts.young, fontSize: 19, color: colors.ink }}>Karte</Text>
        <View style={{ minWidth: 70 }} />
      </View>

      <View style={{ flex: 1, overflow: 'hidden' }}>
        {Platform.OS === 'web' ? (
          React.createElement('iframe', {
            src: 'map.html',
            title: 'Frauengeführte Läden in Frankfurt',
            style: { border: 'none', width: '100%', height: '100%', display: 'block' },
          })
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, gap: 10 }}>
            <Text style={{ fontSize: 34 }}>🗺️</Text>
            <Text style={{ fontFamily: fonts.young, fontSize: 20, color: colors.ink, textAlign: 'center' }}>Karte</Text>
            <Text style={{ fontFamily: fonts.hanken400, fontSize: 13.5, color: colors.muted, textAlign: 'center', lineHeight: 20 }}>
              Die interaktive Karte gibt es in der Web-Version – öffne Shevality im Browser oder über das
              zum Homescreen hinzugefügte App-Symbol.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
