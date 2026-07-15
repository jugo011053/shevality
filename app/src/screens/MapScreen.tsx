import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { EntdeckenStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<EntdeckenStackParamList, 'EntdeckenHome'>;

// Standard-Ansicht im Entdecken-Tab: die Karte. Die Liste erreicht man
// über den Button oben rechts. Die interaktive Karte lebt als eigenständige
// Seite (map.html) und wird im Web als iframe eingebettet.
export function MapScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 10, paddingBottom: 10 }}>
        <View>
          <Text style={{ fontFamily: fonts.young, fontSize: 26, color: colors.ink, letterSpacing: -0.3 }}>Entdecken</Text>
          <Text style={{ fontFamily: fonts.instrumentItalic, fontSize: 13, color: colors.pink, marginTop: 2 }}>Frankfurt</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('EntdeckenList')}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 9, paddingHorizontal: 15, borderRadius: 99, borderWidth: 1.5, borderColor: colors.ink }}
        >
          <Text style={{ fontSize: 13 }}>☰</Text>
          <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: colors.ink }}>Liste</Text>
        </Pressable>
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
              zum Homescreen hinzugefügte App-Symbol. Tippe auf „Liste" für die Übersicht.
            </Text>
            <Pressable onPress={() => navigation.navigate('EntdeckenList')} style={{ marginTop: 8, paddingVertical: 11, paddingHorizontal: 20, borderRadius: 24, backgroundColor: colors.purple }}>
              <Text style={{ fontFamily: fonts.hanken600, fontSize: 13, color: colors.white }}>Zur Liste</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
