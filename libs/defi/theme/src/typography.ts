import type { Theme, ThemeOptions } from '@mui/material';

export const typography = (base: Theme): ThemeOptions => ({
  typography: {
    fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',

    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontFamily: 'Sailec',
      fontSize: 40,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 32,
        lineHeight: 1.25,
      },
    },
    h2: {
      fontFamily: 'Sailec',
      fontSize: 32,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 28,
        lineHeight: 1.25,
      },
    },
    h3: {
      fontFamily: 'Sailec',
      fontSize: 28,
      lineHeight: 1.4,
      fontWeight: 700,
      [base.breakpoints.down('sm')]: {
        fontSize: 24,
        lineHeight: 1.25,
      },
    },
    h4: {
      fontFamily: 'Sailec',
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontSize: 20,
        lineHeight: 1.25,
      },
    },
    h5: {
      fontFamily: 'Sailec',
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: 500,
      [base.breakpoints.down('sm')]: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight: 1.25,
      },
    },
    h6: {
      fontFamily: 'Sailec',
      fontSize: 18,
      lineHeight: 1.4,
      fontWeight: 400,
      [base.breakpoints.down('sm')]: {
        fontFamily: 'Inter',
        fontSize: 13,
        lineHeight: 1.25,
      },
    },
    subtitle1: {
      fontFamily: 'Sailec',
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: 1.25,
      },
    },
    subtitle2: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      [base.breakpoints.down('sm')]: {
        fontFamily: 'Inter',
        fontSize: 11,
        lineHeight: 1.25,
      },
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 1.71429,
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: 'Sailec',
      fontSize: 14,
      lineHeight: 1.5,
    },
  },
});
