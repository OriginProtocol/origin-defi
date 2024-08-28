import { alpha } from '@mui/material';

import type { ThemeOptions } from '@mui/material';

export const lightPalette: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0074F0',
      faded: '#DEEEFE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      faded: alpha('#2D2E36', 0.2),
      contrastText: '#2E3137',
    },
    error: {
      main: '#C42525',
      faded: '#FDEDED',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FACC15',
      faded: '#FAEDBB',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#0D7544',
      faded: '#EDFDF5',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0074F0',
      faded: '#DEEEFE',
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
      default: '#F7F9FF',
      paper: '#EDEFF5',
      highlight: '#FFFFFF',
      faded: '#F3F4F6',
      gradientBlue:
        'linear-gradient(90deg, rgba(140, 102, 252, 0.20) -28.99%, rgba(2, 116, 241, 0.20) 144.97%)',
      gradientPurple:
        'linear-gradient(90deg, rgba(179, 97, 230, 0.50) -28.99%, rgba(106, 54, 252, 0.50) 144.97%)',
      gradientOrange: 'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
      gradientBlueDark: `linear-gradient(97deg, #DE66DC -32.69%, #0074F0 122.04%)`,
    },
    action: {
      hoverOpacity: 0.05,
      hover: alpha('#ECEBFE', 0.5),
      disabledOpacity: 0.5,
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
      main: '#1285FF',
      faded: '#1E2A36',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2D2E36',
      faded: alpha('#2D2E36', 0.2),
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F36A6A',
      faded: '#3E1F1F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F1C512',
      faded: alpha('#F1C512', 0.2),
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#18AB66',
      faded: '#1F2A23',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#1285FF',
      faded: '#1E2A36',
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
      default: '#1C1D22',
      paper: '#16181D',
      highlight: '#121316',
      faded: '#222835',
      gradientBlue:
        'linear-gradient(90deg, rgba(140, 102, 252, 0.20) -28.99%, rgba(2, 116, 241, 0.20) 144.97%)',
      gradientPurple:
        'linear-gradient(90deg, rgba(179, 97, 230, 0.50) -28.99%, rgba(106, 54, 252, 0.50) 144.97%)',
      gradientOrange: 'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
      gradientBlueDark: `linear-gradient(97deg, #DE66DC -32.69%, #0074F0 122.04%)`,
    },
    action: {
      hoverOpacity: 0.05,
      hover: alpha('#121316', 0.5),
      disabledOpacity: 0.5,
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
