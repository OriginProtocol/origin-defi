import { createTheme } from '@mui/material';

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
