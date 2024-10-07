import { DRAWER_MD_COLLAPSED_WIDTH, DRAWER_MD_OPEN_WIDTH } from './constants';

import type { Theme } from '@mui/material';

export const getWidthMixin = (isDrawerOpen: boolean, theme: Theme) =>
  isDrawerOpen
    ? {
        width: DRAWER_MD_OPEN_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      }
    : {
        width: DRAWER_MD_COLLAPSED_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
      };
