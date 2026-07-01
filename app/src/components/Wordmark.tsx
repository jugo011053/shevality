import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { fonts } from '../theme/fonts';
import { colors } from '../theme/colors';

export function Wordmark({ fontSize = 27 }: { fontSize?: number }) {
  const width = fontSize * 4.6;
  const height = fontSize * 1.3;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="wordmarkGradient" x1="0%" y1="0%" x2="100%" y2="30%">
          <Stop offset="10%" stopColor={colors.wordmarkStart} />
          <Stop offset="55%" stopColor={colors.wordmarkMid} />
          <Stop offset="95%" stopColor={colors.wordmarkEnd} />
        </LinearGradient>
      </Defs>
      <SvgText
        x="0"
        y={fontSize * 0.9}
        fontFamily={fonts.young}
        fontSize={fontSize}
        letterSpacing={-0.3}
        fill="url(#wordmarkGradient)"
      >
        shevality
      </SvgText>
    </Svg>
  );
}
