import { Drawer, useTheme } from '@mui/material';

import { DRAWER_MD_COLLAPSED_WIDTH, DRAWER_MD_OPEN_WIDTH } from '../constants';
import { useLayout } from '../hooks';

import type { CSSObject, Theme } from '@mui/material';
import type { Children } from '@origin/shared/utils';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_MD_OPEN_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_MD_COLLAPSED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
});

export const LeftDrawer = ({ children }: Children) => {
  const theme = useTheme();
  const [{ isDrawerOpen }, { handleToggleDrawer }] = useLayout();

  const mixin = isDrawerOpen ? openedMixin(theme) : closedMixin(theme);

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      sx={[
        {
          width: mixin.width,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
        },
        mixin,
        { '& .MuiDrawer-paper': mixin },
      ]}
    >
      {children}
    </Drawer>
  );
};
