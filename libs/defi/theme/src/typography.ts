import type { Theme, ThemeOptions } from '@mui/material';

export const typography = (base: Theme): ThemeOptions => ({
  typography: {
    fontFamily: 'dm, inter, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontFamily: 'dm',
      fontSize: 96,
      lineHeight: 1.041,
      letterSpacing: '-0.025em',
      fontWeight: 800,
      [base.breakpoints.down('sm')]: {
        fontSize: 80,
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
      },
    },
    h2: {
      fontFamily: 'dm',
      fontSize: 80,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      fontWeight: 800,
      [base.breakpoints.down('sm')]: {
        fontSize: 64,
        lineHeight: 1.0625,
      },
    },
    h3: {
      fontFamily: 'dm',
      fontSize: 64,
      lineHeight: 1.0625,
      letterSpacing: '-0.02em',
      fontWeight: 800,
      [base.breakpoints.down('sm')]: {
        fontSize: 56,
        lineHeight: 1.071,
        letterSpacing: '-0.01em',
      },
    },
    h4: {
      fontFamily: 'dm',
      fontSize: 56,
      lineHeight: 1.071,
      letterSpacing: '-0.015em',
      fontWeight: 800,
      [base.breakpoints.down('sm')]: {
        fontSize: 48,
        lineHeight: 1.083,
        letterSpacing: '-0.01em',
      },
    },
    h5: {
      fontFamily: 'dm',
      fontSize: 48,
      lineHeight: 1.083,
      letterSpacing: '-0.01em',
      fontWeight: 800,
      [base.breakpoints.down('sm')]: {
        fontSize: 36,
        lineHeight: 1,
        letterSpacing: '-0.01em',
      },
    },
    h6: {
      fontFamily: 'dm',
      fontSize: 36,
      lineHeight: 1.111,
      letterSpacing: '-0.005em',
      fontWeight: 800,
      [base.breakpoints.down('sm')]: {
        fontSize: 32,
        lineHeight: 1,
      },
    },
    body1: {
      fontFamily: 'inter',
      fontSize: 18,
      lineHeight: 1.555,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: 1.25,
      },
    },
    body2: {
      fontFamily: 'inter',
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontSize: 14,
        lineHeight: 1.25,
      },
    },
    body3: {
      fontFamily: 'inter',
      fontSize: 14,
      lineHeight: 1.428,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontSize: 13,
        lineHeight: 1.25,
      },
    },
    button: {
      fontFamily: 'inter',
      fontSize: 14,
      lineHeight: 1.428,
      fontWeight: 500,
      textTransform: 'none',
    },
    featured1: {
      fontFamily: 'inter',
      fontSize: 32,
      lineHeight: 1.25,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontSize: 24,
        lineHeight: 1.333,
      },
    },
    featured2: {
      fontFamily: 'inter',
      fontSize: 24,
      lineHeight: 1.333,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontSize: 20,
        lineHeight: 1.4,
      },
    },
    featured3: {
      fontFamily: 'inter',
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: 400,
    },
    mono: {
      fontFamily: 'mono',
      fontSize: 14,
      lineHeight: 1.428,
      fontWeight: 400,
    },
    caption1: {
      fontFamily: 'inter',
      fontSize: 12,
      lineHeight: 1.333,
      fontWeight: 400,
    },
    caption2: {
      fontFamily: 'inter',
      fontSize: 10,
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
});
