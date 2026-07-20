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

type DeviceKind = 'ios' | 'android' | 'other';

function detectDevice(): DeviceKind {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

const STEPS: Record<DeviceKind, { icon: string; lines: string[] }> = {
  ios: {
    icon: '📤',
    lines: [
      'Tippe unten in Safari auf das Teilen-Symbol 📤',
      'Wähle „Zum Home-Bildschirm"',
      'Tippe oben rechts auf „Hinzufügen"',
    ],
  },
  android: {
    icon: '⋮',
    lines: [
      'Tippe oben rechts auf ⋮ (die drei Punkte)',
      'Wähle „App installieren" oder „Zum Startbildschirm hinzufügen"',
      'Bestätige mit „Installieren"',
    ],
  },
  other: {
    icon: '💻',
    lines: [
      'Öffne diesen Link auf deinem Handy, um ihn zum Startbildschirm hinzuzufügen',
      'Am Computer: Browser-Menü → „App installieren"',
    ],
  },
};

// Dezenter, aber KONKRETER Hinweis — erst nachdem man drin ist, nie blockierend,
// jederzeit wegklickbar. Zeigt gerätespezifische Schritte (iOS/Android/Desktop).
export function InstallHint() {
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState<DeviceKind>('other');

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return;
    if (isStandalone()) return;
    try {
      if (localStorage.getItem(KEY) === '1') return;
    } catch {
      /* egal */
    }
    setDevice(detectDevice());
    const t = setTimeout(() => setVisible(true), 900);
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
  const steps = STEPS[device];

  return (
    <View
      style={{
        position: 'absolute', left: 14, right: 14, bottom: 14,
        backgroundColor: colors.ink, borderRadius: 20, padding: 16,
        shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 14, elevation: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontSize: 18 }}>💜</Text>
        <Text style={{ flex: 1, fontFamily: fonts.hanken700, fontSize: 13.5, color: colors.white }}>
          Shevality zum Startbildschirm hinzufügen
        </Text>
        <Pressable onPress={dismiss} hitSlop={10}>
          <Text style={{ fontSize: 16, color: 'rgba(255,255,255,.7)' }}>✕</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 12, gap: 8 }}>
        {steps.lines.map((line, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 9 }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: colors.purple, alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 }}>
              <Text style={{ fontFamily: fonts.hanken700, fontSize: 10.5, color: colors.white }}>{i + 1}</Text>
            </View>
            <Text style={{ flex: 1, fontFamily: fonts.hanken400, fontSize: 12.5, lineHeight: 18, color: 'rgba(255,255,255,.88)' }}>{line}</Text>
          </View>
        ))}
      </View>

      <Pressable onPress={dismiss} style={{ marginTop: 14, alignSelf: 'flex-start' }}>
        <Text style={{ fontFamily: fonts.hanken600, fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Später erinnern</Text>
      </Pressable>
    </View>
  );
}
