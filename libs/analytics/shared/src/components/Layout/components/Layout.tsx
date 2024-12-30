import { Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router';

import { DRAWER_SM_OPEN_WIDTH, VIEWPORT_MIN_WIDTH } from '../constants';
import { useLayout } from '../hooks';
import { LayoutProvider } from '../state';
import { DrawerMenu } from './DrawerMenu';
import { DrawerMenuNarrow } from './DrawerMenuNarrow';
import { LeftDrawer } from './LeftDrawer';
import { Topnav } from './Topnav';

import type { RouteObject } from 'react-router';

export type LayoutProps = { routes: RouteObject[] };

const LayoutWrapped = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [{ isDrawerOpen, contentWidth }, { handleSetDrawer }] = useLayout();

  return (
    <Stack
      sx={{
        minWidth: VIEWPORT_MIN_WIDTH,
      }}
    >
      <Topnav />
      <Stack direction="row" justifyContent="space-between">
        {isSm ? (
          <Drawer
            open={isDrawerOpen}
            onClose={() => {
              handleSetDrawer(false);
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_SM_OPEN_WIDTH,
              },
            }}
          >
            <DrawerMenu />
          </Drawer>
        ) : (
          <LeftDrawer>
            {isDrawerOpen ? <DrawerMenu /> : <DrawerMenuNarrow />}
          </LeftDrawer>
        )}
        <Stack
          component="main"
          sx={{
            alignItems: 'stretch',
            flexGrow: 1,
            width: contentWidth,
            overflowX: 'hidden',
            px: { xs: 1, md: 2 },
            pb: 4,
          }}
        >
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const Layout = ({ routes }: LayoutProps) => {
  return (
    <LayoutProvider routes={routes}>
      <LayoutWrapped />
    </LayoutProvider>
  );
};
