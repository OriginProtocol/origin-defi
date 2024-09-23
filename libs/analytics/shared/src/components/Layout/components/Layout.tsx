import { Button, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { OriginProductIcon } from '@origin/shared/components';
import { FaBarsRegular } from '@origin/shared/icons';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { Breadcrumbs } from '../../Breadcrumbs';
import {
  DRAWER_MD_COLLAPSED_WIDTH,
  DRAWER_MD_OPEN_WIDTH,
  DRAWER_SM_OPEN_WIDTH,
  VIEWPORT_MIN_WIDTH,
} from '../constants';
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
        direction="row"
        sx={[
          (theme) => ({
            height: theme.mixins.toolbar.height,
            alignItems: 'center',
            justifyContent: 'space-between',
            pr: 2,
            py: 1,
            transition: theme.transitions.create('padding-left', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
          isDrawerOpen
            ? { pl: `${DRAWER_MD_OPEN_WIDTH + 16}px` }
            : isSm
              ? { pl: 0 }
              : { pl: `${DRAWER_MD_COLLAPSED_WIDTH + 16}px` },
        ]}
      >
        {isSm && (
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <OriginProductIcon
              name="Analytics"
              sx={{ display: { md: 'none' } }}
            />
          </RouterLink>
        )}
        <Breadcrumbs />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleToggleDrawer}
          sx={{ display: { md: 'none' } }}
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
