import {Platform} from 'react-native';

import {fonts} from './fonts';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export const colors = {
  // backgrounds
  background: '#07051A',
  surface: 'rgba(1, 7, 62, 1)',
  surfaceDeep: '#05020F',
  surfaceDark: '#19083D',
  // cards
  card: '#17122D',
  cardElevated: '#21163F',
  cardHighlight: '#2B1B55',
  cardBorder: '#3C2A66',
  // accents
  neonPink: '#FF2CCB',
  violet: '#8B3DFF',
  purpleGlow: '#B44CFF',
  amber: '#FFB84A',
  coral: '#FF5A75',
  // text
  textPrimary: '#F7F3FF',
  textSecondary: '#C2B6E8',
  textMuted: '#8E83B8',
  textLabel: '#AFA2D8',
  // borders / dividers
  border: '#3C2A66',
  divider: '#31234F',
  // buttons
  buttonPrimaryBg: '#FF2CCB',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondaryBg: '#2B1B55',
  buttonSecondaryText: '#F7F3FF',
  buttonTertiaryBg: '#21163F',
  buttonTertiaryText: '#C2B6E8',
  // status
  success: '#4ADE80',
  successBg: 'rgba(74, 222, 128, 0.12)',
  warning: '#FACC15',
  warningBg: 'rgba(250, 204, 21, 0.12)',
  info: '#60A5FA',
  inReview: '#FFB84A',
  inReviewBg: 'rgba(255, 184, 74, 0.12)',
  saved: '#B44CFF',
  savedBg: 'rgba(180, 76, 255, 0.12)',
  // tab bar
  tabBar: '#07051A',
  tabActive: '#FF2CCB',
  tabInactive: '#8E83B8',
  // misc
  black: '#000000',
  white: '#FFFFFF',
  inputBg: '#17122D',
  loaderOverlay: 'rgba(7, 5, 26, 0.29)',
  progressTrack: '#2B1B55',
  // legacy aliases for compatibility
  cream: '#F7F3FF',
  body: '#C2B6E8',
  bodyMuted: '#8E83B8',
  label: '#AFA2D8',
  gold: '#FFB84A',
  goldBorder: 'rgba(255, 184, 74, 0.25)',
};

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  card: 20,
  button: 14,
  chip: 10,
  pill: 100,
};

export const fontSize = {
  brand: 9,
  caption: 10,
  small: 11,
  body: 13,
  button: 15,
  title: 26,
  hero: 32,
  passCode: 46,
};

export const layout = {
  screenPadding: 20,
  tabHeight: 70,
  buttonHeightCompact: 48,
  buttonHeightDefault: 56,
};

export const topInset = (value: number) =>
  Platform.OS === 'android' ? Math.max(value, 30) : value;

export {fonts};
