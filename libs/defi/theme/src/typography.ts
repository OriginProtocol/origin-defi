import '@fontsource-variable/dm-sans';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

import type { Theme, ThemeOptions } from '@mui/material';

export const typography = (base: Theme): ThemeOptions => ({
  typography: {
    fontFamily: `DM Sans Variable, Inter Variable, Helvetica, Arial, sans-serif`,

    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontFamily: 'DM Sans Variable',
      fontSize: 40,
      lineHeight: 1.4,
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'DM Sans Variable',
      fontSize: 32,
      lineHeight: 1.4,
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'DM Sans Variable',
      fontSize: 28,
      lineHeight: 1.4,
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'DM Sans Variable',
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'DM Sans Variable',
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'DM Sans Variable',
      fontSize: 18,
      lineHeight: 1.4,
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.71429,
    },
    body2: {
      fontFamily: 'Inter Variable',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body3: {
      fontFamily: 'Inter Variable',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    feature1: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    feature2: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    feature3: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    mono: {
      fontFamily: 'JetBrains Mono Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    caption1: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    caption2: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.5,
      textTransform: 'none',
    },
  },
});
