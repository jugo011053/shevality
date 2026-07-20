import React, { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

const KEY = 'shevality.installHintDismissed.v1';

function isStandalone(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return true;
  try {
    return window.matchMedia?.('(display-mode: standalone)').matches || (navigator as any).standalone === true;
  } catch {
    return false;
  }
}

// Dezenter Hinweis, NACH dem Einstieg gezeigt — nie blockierend, jederzeit wegklickbar.
export function InstallHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return;
    if (isStandalone()) return;
    try {
      if (localStorage.getItem(KEY) === '1') return;
    } catch {
      /* egal */
    }
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage?.setItem(KEY, '1');
    } catch {
      /* egal */
    }
  };

  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute', left: 16, right: 16, bottom: 14,
        backgroundColor: colors.ink, borderRadius: 18, paddingVertical: 13, paddingHorizontal: 16,
        flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 6,
      }}
    >
      <Text style={{ fontSize: 18 }}>💜</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.hanken600, fontSize: 12.5, color: colors.white }}>Speicher dir Shevality auf den Startbildschirm.</Text>
        <Text style={{ fontFamily: fonts.hanken400, fontSize: 11, color: 'rgba(255,255,255,.65)', marginTop: 2 }}>
          Über „Teilen" bzw. das Browser-Menü → „Zum Home-Bildschirm".
        </Text>
      </View>
      <Pressable onPress={dismiss} hitSlop={10}>
        <Text style={{ fontSize: 16, color: 'rgba(255,255,255,.7)' }}>✕</Text>
      </Pressable>
    </View>
  );
}
