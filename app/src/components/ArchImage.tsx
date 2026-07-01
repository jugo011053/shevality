import React, { useState } from 'react';
import { Image, StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';

interface ArchImageProps {
  uri?: string;
  height: number;
  radiusTop: number;
  radiusBottom?: number;
  style?: StyleProp<ViewStyle>;
}

function StripeFallback() {
  return (
    <Svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <Defs>
        <Pattern id="stripes" patternUnits="userSpaceOnUse" width={22.6} height={22.6} patternTransform="rotate(45)">
          <Rect width={11.3} height={22.6} fill={colors.stripeA} />
          <Rect x={11.3} width={11.3} height={22.6} fill={colors.stripeB} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#stripes)" />
    </Svg>
  );
}

export function ArchImage({ uri, height, radiusTop, radiusBottom = 16, style }: ArchImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = !!uri && !failed;

  return (
    <View
      style={[
        {
          height,
          borderTopLeftRadius: radiusTop,
          borderTopRightRadius: radiusTop,
          borderBottomLeftRadius: radiusBottom,
          borderBottomRightRadius: radiusBottom,
          overflow: 'hidden',
          backgroundColor: colors.stripeA,
        },
        style,
      ]}
    >
      <StripeFallback />
      {showImage && (
        <Image
          source={{ uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}
