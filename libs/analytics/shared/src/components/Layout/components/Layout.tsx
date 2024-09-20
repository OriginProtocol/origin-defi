import { Button, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { FaBarsRegular } from '@origin/shared/icons';
import { Outlet } from 'react-router-dom';

import { DRAWER_SM_OPEN_WIDTH, VIEWPORT_MIN_WIDTH } from '../constants';
import { useLayout } from '../hooks';
import { LayoutProvider } from '../state';
import { DrawerMenu } from './DrawerMenu';
import { LeftDrawer } from './LeftDrawer';

import type { RouteObject } from 'react-router-dom';

export type LayoutProps = { routes: RouteObject[] };

const LayoutWrapped = ({ routes }: LayoutProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [
    { isDrawerOpen, contentWidth },
    { handleToggleDrawer, handleSetDrawer },
  ] = useLayout();

  return (
    <Stack
      sx={{
        minWidth: VIEWPORT_MIN_WIDTH,
      }}
    >
      <Stack
        sx={(theme) => ({
          height: theme.mixins.toolbar.height,
          alignItems: 'flex-start',
          px: 2,
          py: 1,
        })}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleToggleDrawer}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <FaBarsRegular />
        </Button>
      </Stack>
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
            <DrawerMenu routes={routes} />
          </Drawer>
        ) : (
          <LeftDrawer>
            <DrawerMenu routes={routes} />
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

export const Layout = (props: LayoutProps) => {
  return (
    <LayoutProvider>
      <LayoutWrapped {...props} />
    </LayoutProvider>
  );
};
