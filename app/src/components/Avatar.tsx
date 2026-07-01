import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts } from '../theme/fonts';

export function Avatar({ initials, background, size = 34 }: { initials: string; background: string; size?: number }) {
  const label = (
    <Text style={{ color: '#fff', fontFamily: fonts.hanken600, fontSize: 12 }}>{initials}</Text>
  );
  const commonStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    flexShrink: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  if (background === 'gradient') {
    return (
      <LinearGradient colors={['#c9a7e0', '#e3b9aa']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={commonStyle}>
        {label}
      </LinearGradient>
    );
  }
  return <View style={[commonStyle, { backgroundColor: background }]}>{label}</View>;
}
