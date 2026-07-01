import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  fill?: string;
}

export function HeartIcon({ size = 18, color = '#a89aa2', fill = 'none' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <Path
        d="M12 20s-6.5-4.2-6.5-9A3.6 3.6 0 0 1 12 8.3 3.6 3.6 0 0 1 18.5 11c0 4.8-6.5 9-6.5 9z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CommentIcon({ size = 18, color = '#a89aa2' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 5h14v10H10l-4 4z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
    </Svg>
  );
}

export function ShareIcon({ size = 18, color = '#a89aa2' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 14V4M8.5 7.5 12 4l3.5 3.5" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 12v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
    </Svg>
  );
}

export function BookmarkIcon({ size = 18, color = '#a89aa2', fill = 'none' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
      <Path d="M6 4h12v16l-6-3.6L6 20z" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
    </Svg>
  );
}

export function SendIcon({ size = 15, color = '#fff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12h14M12 6l6 6-6 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 17, color = '#bfa0bb' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={6.2} stroke={color} strokeWidth={2.1} />
      <Line x1={15.6} y1={15.6} x2={19.5} y2={19.5} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
    </Svg>
  );
}

export function TabFeedIcon({ size = 24, color = '#c3aec0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={4} y={5} width={16} height={3} rx={1.5} fill={color} />
      <Rect x={4} y={11} width={16} height={2.4} rx={1.2} fill={color} />
      <Rect x={4} y={16} width={11} height={2.4} rx={1.2} fill={color} />
    </Svg>
  );
}

export function TabEntdeckenIcon({ size = 24, color = '#c3aec0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={6.2} stroke={color} strokeWidth={2.1} />
      <Line x1={15.6} y1={15.6} x2={19.5} y2={19.5} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
    </Svg>
  );
}

export function TabSicherIcon({ size = 24, color = '#c3aec0' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3.2 19 6v6.2c0 4.3-2.9 7-7 8.6-4.1-1.6-7-4.3-7-8.6V6z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function LocationIcon({ size = 16, color = '#7b5fb8' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 21c4-3.2 7-6.4 7-10a7 7 0 1 0-14 0c0 3.6 3 6.8 7 10z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Circle cx={12} cy={11} r={2.2} fill={color} />
    </Svg>
  );
}

export function PhoneIcon({ size = 16, color = '#c08a72' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
