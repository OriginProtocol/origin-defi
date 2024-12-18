import { Button, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material';
import { OriginProductIcon } from '@origin/shared/components';
import { FaArrowUpRightRegular, FaBarsRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router';
import { Link as RouterLink } from 'react-router';

import { Breadcrumbs } from '../../Breadcrumbs';
import {
  DRAWER_MD_COLLAPSED_WIDTH,
  DRAWER_MD_OPEN_WIDTH,
  DRAWER_SM_OPEN_WIDTH,
  VIEWPORT_MIN_WIDTH,
} from '../constants';
import { useDappHref, useLayout } from '../hooks';
import { LayoutProvider } from '../state';
import { DrawerMenu } from './DrawerMenu';
import { LeftDrawer } from './LeftDrawer';

import type { RouteObject } from 'react-router';

export type LayoutProps = { routes: RouteObject[] };

const LayoutWrapped = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const dappHref = useDappHref();
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
          isSm
            ? { pl: 2 }
            : isDrawerOpen
              ? { pl: `${DRAWER_MD_OPEN_WIDTH + 16}px` }
              : { pl: `${DRAWER_MD_COLLAPSED_WIDTH + 16}px` },
        ]}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {isSm ? (
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <OriginProductIcon name="Analytics" />
            </RouterLink>
          ) : (
            <Breadcrumbs />
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleToggleDrawer}
            sx={{ display: { md: 'none' } }}
          >
            <FaBarsRegular />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href={dappHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {intl.formatMessage({ defaultMessage: 'Launch App' })}&nbsp;
            <FaArrowUpRightRegular />
          </Button>
        </Stack>
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
            <DrawerMenu />
          </Drawer>
        ) : (
          <LeftDrawer>
            <DrawerMenu />
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
