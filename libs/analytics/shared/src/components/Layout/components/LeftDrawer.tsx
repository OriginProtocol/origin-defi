import { Drawer, useTheme } from '@mui/material';

import { useLayout } from '../hooks';

import type { CSSObject, Theme } from '@mui/material';
import type { Children } from '@origin/shared/utils';

const openedMixin = (width: number, theme: Theme): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const LeftDrawer = ({ children }: Children) => {
  const theme = useTheme();
  const [{ isDrawerOpen, drawerWidth }, { handleToggleDrawer }] = useLayout();

  const mixin = isDrawerOpen
    ? openedMixin(drawerWidth, theme)
    : closedMixin(theme);

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      open={isDrawerOpen}
      onClose={handleToggleDrawer}
      sx={[
        {
          width: 300,
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
