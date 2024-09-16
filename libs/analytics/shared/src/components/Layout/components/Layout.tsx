import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { LayoutProvider } from '../state';
import { DrawerMenu } from './DrawerMenu';
import { LeftDrawer } from './LeftDrawer';

import type { RouteObject } from 'react-router-dom';

export type LayoutProps = { routes: RouteObject[] };

const LayoutWrapped = ({ routes }: LayoutProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        minWidth: 370,
      }}
    >
      <LeftDrawer>
        <DrawerMenu routes={routes} />
      </LeftDrawer>
      <Stack
        component="main"
        sx={{
          alignItems: 'center',
          flexGrow: 1,
          py: 3,
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
