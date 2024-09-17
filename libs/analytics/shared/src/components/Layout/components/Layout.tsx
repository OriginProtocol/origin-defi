import {
  Button,
  Drawer,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
  const [{ drawerWidth, isDrawerOpen }, { handleToggleDrawer }] = useLayout();

  return (
    <Stack
      sx={{
        minWidth: 370,
      }}
    >
      <Toolbar>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleToggleDrawer}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <FaBarsRegular />
        </Button>
      </Toolbar>
      {isSm ? (
        <Drawer
          open={isDrawerOpen}
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
          flexGrow: 1,
          py: 3,
          px: 2,
          overflowX: 'hidden',
        }}
      >
        <Outlet />
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
