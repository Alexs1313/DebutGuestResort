import {Platform} from 'react-native';

const ios = {
  serifBold: 'Georgia',
  serifSemiBold: 'Georgia',
  sansRegular: 'System',
  sansMedium: 'System',
  sansSemiBold: 'System',
  sansBold: 'System',
  monoBold: 'Courier',
};

const android = {
  serifBold: 'serif',
  serifSemiBold: 'serif',
  sansRegular: 'sans-serif',
  sansMedium: 'sans-serif-medium',
  sansSemiBold: 'sans-serif-medium',
  sansBold: 'sans-serif',
  monoBold: 'monospace',
};

const platformFonts = Platform.OS === 'ios' ? ios : android;

export const fonts = {
  serifBold: platformFonts.serifBold,
  serifSemiBold: platformFonts.serifSemiBold,
  sansRegular: platformFonts.sansRegular,
  sansMedium: platformFonts.sansMedium,
  sansSemiBold: platformFonts.sansSemiBold,
  sansBold: platformFonts.sansBold,
  monoBold: platformFonts.monoBold,
};
