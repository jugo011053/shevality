import React, { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

// Eine Webseite kann iOS/Android NICHT zwingen, einen Link in einem
// bestimmten Browser zu öffnen — das entscheidet allein das Betriebssystem
// (Standard-Browser-Einstellung) bzw. die App, aus der heraus getippt wurde.
// Was wir tun können: erkennen, wann das echte "Zum Home-Bildschirm
// hinzufügen" (PWA-Install) nicht zuverlässig geht, und den funktionierenden
// Weg zeigen. Zwei Fälle:
//  1) Eingebauter Mini-Browser (Instagram, TikTok, WhatsApp, …) → "Im
//     Browser öffnen" antippen.
//  2) iOS, aber Standard-Browser ist NICHT Safari (z. B. Chrome/Firefox) →
//     Auf iOS unterstützt nur Safari echte PWA-Installation. Der Link muss
//     einmal gedrückt gehalten und "In Safari öffnen" gewählt werden — das
//     ist der einzige Weg, den iOS dafür zulässt.
function detect(): 'inapp' | 'ios-non-safari' | null {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent || '';
  if (/FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|MicroMessenger|TikTok|musical_ly|LinkedInApp|Snapchat|Twitter/i.test(ua)) {
    return 'inapp';
  }
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isNonSafariIOSBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Mercury/i.test(ua);
  if (isIOS && isNonSafariIOSBrowser) return 'ios-non-safari';
  return null;
}

const COPY: Record<'inapp' | 'ios-non-safari', { title: string; sub: string }> = {
  inapp: {
    title: 'Für die beste Erfahrung: oben auf ⋯ tippen und „Im Browser öffnen" wählen.',
    sub: 'Nur im echten Browser lässt sich Shevality zum Startbildschirm hinzufügen.',
  },
  'ios-non-safari': {
    title: 'Diesen Link gedrückt halten und „In Safari öffnen" wählen.',
    sub: 'Auf dem iPhone funktioniert „Zum Home-Bildschirm hinzufügen" nur in Safari — auch wenn ein anderer Browser dein Standard ist.',
  },
};

export function InAppBrowserWarning() {
  const [kind, setKind] = useState<'inapp' | 'ios-non-safari' | null>(null);

  useEffect(() => {
    setKind(detect());
  }, []);

  if (!kind) return null;
  const copy = COPY[kind];

  return (
    <View
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999,
        backgroundColor: '#FBF3E7', borderBottomWidth: 1, borderBottomColor: '#E9D4AE',
        paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 50 : 14, paddingBottom: 12,
      }}
    >
      <Text style={{ fontFamily: fonts.hanken700, fontSize: 12.5, color: '#8A6D3B' }}>{copy.title}</Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, lineHeight: 16, color: '#8A6D3B', marginTop: 3 }}>{copy.sub}</Text>
    </View>
  );
}
