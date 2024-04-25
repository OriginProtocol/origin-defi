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
      fontSize: 96,
      lineHeight: 1.041,
      letterSpacing: '-0.025em',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'DM Sans Variable',
      fontSize: 80,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      fontWeight: 800,
    },
    h3: {
      fontFamily: 'DM Sans Variable',
      fontSize: 64,
      lineHeight: 1.0625,
      letterSpacing: '-0.02em',
      fontWeight: 800,
    },
    h4: {
      fontFamily: 'DM Sans Variable',
      fontSize: 56,
      lineHeight: 1.071,
      letterSpacing: '-0.015em',
      fontWeight: 800,
    },
    h5: {
      fontFamily: 'DM Sans Variable',
      fontSize: 48,
      lineHeight: 1.083,
      letterSpacing: '-0.01em',
      fontWeight: 800,
    },
    h6: {
      fontFamily: 'DM Sans Variable',
      fontSize: 36,
      lineHeight: 1.111,
      letterSpacing: '-0.005em',
      fontWeight: 800,
    },
    body1: {
      fontFamily: 'Inter Variable',
      fontSize: 18,
      lineHeight: 1.555,
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Inter Variable',
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body3: {
      fontFamily: 'Inter Variable',
      fontSize: 14,
      lineHeight: 1.428,
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Inter Variable',
      fontSize: 16,
      lineHeight: 1.5,
      textTransform: 'none',
      fontWeight: 500,
    },
    featured1: {
      fontFamily: 'Inter Variable',
      fontSize: 32,
      lineHeight: 1.25,
      fontWeight: 400,
    },
    featured2: {
      fontFamily: 'Inter Variable',
      fontSize: 24,
      lineHeight: 1.333,
      fontWeight: 400,
    },
    featured3: {
      fontFamily: 'Inter Variable',
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: 400,
    },
    mono: {
      fontFamily: 'JetBrains Mono Variable',
      fontSize: 14,
      lineHeight: 1.428,
      fontWeight: 400,
    },
    caption1: {
      fontFamily: 'Inter Variable',
      fontSize: 12,
      lineHeight: 1.333,
      fontWeight: 400,
    },
    caption2: {
      fontFamily: 'Inter Variable',
      fontSize: 10,
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
});
