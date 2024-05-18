import { createTheme } from '@mui/material';
import { takeLast } from 'ramda';

import { components } from './components';
import { darkPalette, lightPalette } from './palette';
import { typography } from './typography';

import type { Theme, ThemeOptions } from '@mui/material';

const baseLight = createTheme(lightPalette);
const baseDark = createTheme(darkPalette);

const commons = (base: Theme): ThemeOptions => ({
  shape: {
    borderRadius: 4,
  },
  // @ts-expect-error fill with defaults
  shadows: [
    'none',
    '0px 2px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10);',
    '0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 25px 0px rgba(0, 0, 0, 0.07)',
    '0px 1.7955275774002075px 5.32008171081543px 0px rgba(0, 0, 0, 0.03), 0px 6.030803203582764px 17.869047164916992px 0px rgba(0, 0, 0, 0.04), 0px 27px 80px 0px rgba(0, 0, 0, 0.07)',
    ...takeLast(22, base.shadows),
  ],
  mixins: {
    toolbar: {
      height: 72,
      [base.breakpoints.down('sm')]: {
        height: 56,
      },
    },
  },
});

export const light = createTheme({
  ...lightPalette,
  ...typography(baseLight),
  ...components(baseLight),
  ...commons(baseLight),
});

export const dark = createTheme({
  ...darkPalette,
  ...typography(baseDark),
  ...components(baseDark),
  ...commons(baseDark),
});
