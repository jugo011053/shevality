import React, { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

// iOS/Android können wir per Webseite NICHT zwingen, einen Link in Safari/Chrome
// zu öffnen — das entscheidet allein das Betriebssystem bzw. die App, aus der
// heraus getippt wurde. Was wir tun können: erkennen, wenn wir in einem
// eingebauten Mini-Browser (Instagram, Facebook, TikTok, WhatsApp, LinkedIn,
// Snapchat, WeChat …) laufen, und klar sagen, wie man in den echten Browser
// wechselt — dort funktioniert "Zum Home-Bildschirm hinzufügen" zuverlässig.
function isInAppBrowser(): boolean {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\/|MicroMessenger|TikTok|musical_ly|LinkedInApp|Snapchat|Twitter/i.test(ua);
}

export function InAppBrowserWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isInAppBrowser());
  }, []);

  if (!show) return null;

  return (
    <View
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999,
        backgroundColor: '#FBF3E7', borderBottomWidth: 1, borderBottomColor: '#E9D4AE',
        paddingHorizontal: 18, paddingTop: Platform.OS === 'ios' ? 50 : 14, paddingBottom: 12,
      }}
    >
      <Text style={{ fontFamily: fonts.hanken700, fontSize: 12.5, color: '#8A6D3B' }}>
        Für die beste Erfahrung: oben rechts auf ⋯ tippen und „Im Browser öffnen" wählen.
      </Text>
      <Text style={{ fontFamily: fonts.hanken400, fontSize: 11.5, lineHeight: 16, color: '#8A6D3B', marginTop: 3 }}>
        Nur im echten Browser (Safari/Chrome) lässt sich Shevality zum Startbildschirm hinzufügen.
      </Text>
    </View>
  );
}
