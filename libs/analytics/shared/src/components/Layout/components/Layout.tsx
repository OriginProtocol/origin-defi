import { Button, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { FaBarsRegular } from '@origin/shared/icons';
import { Outlet } from 'react-router-dom';

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
    { drawerWidth, isDrawerOpen, width },
    { handleToggleDrawer, handleSetDrawer },
  ] = useLayout();

  return (
    <Stack
      sx={{
        minWidth: 370,
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
                width: drawerWidth,
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
            alignItems: 'center',
            flexGrow: 1,
            width,
            overflowX: 'hidden',
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
