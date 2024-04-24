import type { ThemeOptions } from '@mui/material';

export const lightPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4356D2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#2E3137',
    },
    error: {
      main: '#C42525',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FACC15',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#0D7544',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#2E3137',
      secondary: '#797C8F',
      disabled: '#C6CCDA',
      tertiary: '#4356D2',
      success: '#0D7544',
      warning: '#7B6305',
      error: '#FF4E4E',
    },
    background: {
      default: '#EDEFF5',
      paper: '#F7F9FF',
      highlight: '#FFFFFF',
      primaryFaded: '#ECEBFE',
    },
    divider: '#D8DEE5',
    chart1: '#586CF8',
    chart2: '#48E4DB',
    chart3: '#D0246A',
    chart4: '#E85BFF',
    chart5: '#FFC298',
    chart6: '#8EA7FF',
    chart7: '#66C8FF',
  },
};

export const darkPalette: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5168FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D2E36',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F36A6A',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F1C512',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#18AB66',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8B8FA3',
      disabled: '#434959',
      tertiary: '#5168FF',
      success: '#18AB66',
      warning: '#B4920C',
      error: '#F36A6A',
    },
    background: {
      default: '#16181D',
      paper: '#1C1D22',
      highlight: '#121316',
      primaryFaded: '#252544',
    },
    divider: '#282A32',
    chart1: '#586CF8',
    chart2: '#48E4DB',
    chart3: '#D0246A',
    chart4: '#E85BFF',
    chart5: '#FFC298',
    chart6: '#8EA7FF',
    chart7: '#66C8FF',
  },
};
