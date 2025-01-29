import { useEffect, useRef, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import {
  FaBarsRegular,
  FaCircleExclamationRegular,
  OriginLabel,
} from '@origin/shared/icons';
import {
  ChainMenuButton,
  OpenAccountModalButton,
  useIsRebaseDisabled,
} from '@origin/shared/providers';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router';
import { useAccount } from 'wagmi';

import { trackEvent } from '../../../clients';
import { useActivitiesStatus } from '../../Activities';
import { AccountPopover } from './AccountPopover';
import { AlertPopover } from './AlertPopover';
import { DrawerMenu } from './DrawerMenu';
import { HoverMenu } from './HoverMenu';

import type { RouteObject } from 'react-router';

export type TopnavProps = { routes: RouteObject[] };

export const Topnav = ({ routes }: TopnavProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.down('xl'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const accountMenuAnchorEl = useRef(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const alertMenuAnchorEl = useRef(null);
  const [alertMenuOpen, setAlertMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { status, pendingCount } = useActivitiesStatus();
  const isNonRebasingOETH = useIsRebaseDisabled(tokens.mainnet.OETH);
  const isNonRebasingOUSD = useIsRebaseDisabled(tokens.mainnet.OUSD);
  const isNonRebasingSuperOETHb = useIsRebaseDisabled(tokens.base.superOETHb);
  const isNonRebasingOS = useIsRebaseDisabled(tokens.sonic.OS);
  const once = useRef(true);

  useEffect(() => {
    if (
      once.current &&
      (isNonRebasingOETH ||
        isNonRebasingOUSD ||
        isNonRebasingSuperOETHb ||
        isNonRebasingOS)
    ) {
      setAlertMenuOpen(true);
      once.current = false;
    }
  }, [
    isNonRebasingOETH,
    isNonRebasingOS,
    isNonRebasingOUSD,
    isNonRebasingSuperOETHb,
  ]);

  const isLoading = status === 'pending' && pendingCount > 0;
  const showRebaseMenu =
    isNonRebasingOETH ||
    isNonRebasingOUSD ||
    isNonRebasingSuperOETHb ||
    isNonRebasingOS;

  return (
    <>
      <Box
        sx={{
          height: {
            xs: 56,
            md: 72,
          },
        }}
      />
      <Box
        component="nav"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          zIndex: theme.zIndex.appBar,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: 'blur(15px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: {
            xs: 2.5,
            md: 5,
          },
          height: {
            xs: 56,
            md: 72,
          },
        })}
      >
        <Grid2
          container
          sx={{
            height: 1,
            width: 1,
          }}
        >
          <Grid2
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            size={2}
          >
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                svg: { height: { xs: 16, md: 24 }, width: 1 },
              }}
            >
              <OriginLabel />
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 0,
              md: 7,
            }}
            offset={{
              md: 0.5,
            }}
          >
            {!isSm && <HoverMenu routes={routes} />}
          </Grid2>
          <Grid2
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.25,
            }}
            size={{
              xs: 10,
              md: 2.5,
            }}
          >
            <Button
              variant="nav"
              color="secondary"
              ref={alertMenuAnchorEl}
              onClick={() => {
                setAlertMenuOpen(not);
              }}
              sx={[!showRebaseMenu && { display: 'none' }]}
            >
              <FaCircleExclamationRegular
                sx={{ fontSize: 24, color: 'warning.main' }}
              />
            </Button>
            <AlertPopover
              open={alertMenuOpen}
              anchorEl={alertMenuAnchorEl}
              onClose={() => {
                setAlertMenuOpen(false);
              }}
            />
            <ChainMenuButton
              variant="nav"
              color="secondary"
              hideChainName={isLg}
              sx={{ flexShrink: 0 }}
              iconSize={24}
              menuProps={{
                paperProps: {
                  sx: {
                    mt: 1.5,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.highlight',
                    p: 1,
                  },
                },
              }}
              menuItemProps={{
                sx: {
                  ...theme.typography.body3,
                  borderRadius: 2,
                },
              }}
            />
            <OpenAccountModalButton
              variant="nav"
              ref={accountMenuAnchorEl}
              onClick={() => {
                if (isConnected) {
                  setAccountMenuOpen(true);
                  trackEvent({
                    name: 'open_account',
                  });
                } else {
                  trackEvent({
                    name: 'connect_click',
                  });
                }
              }}
              sx={{
                minWidth: { xs: 36, md: 40 },
                maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
                paddingX: {
                  md: 2,
                  xs: isConnected ? 0.75 : 2,
                },
              }}
              connectedProps={{ color: 'secondary' }}
              disconnectedProps={{
                color: 'primary',
                sx: { '&&&': { minWidth: 80, borderRadius: 2 } },
              }}
              hideAddress={isMd}
              hideWrongNetwork
            >
              {isLoading ? (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress size={16} />
                  {!isMd && (
                    <Typography
                      noWrap
                      sx={{
                        color: 'primary.main',
                      }}
                    >
                      {intl.formatMessage(
                        { defaultMessage: '{pendingCount} pending' },
                        { pendingCount },
                      )}
                    </Typography>
                  )}
                </Stack>
              ) : null}
            </OpenAccountModalButton>
            <AccountPopover
              open={accountMenuOpen}
              anchorEl={accountMenuAnchorEl}
              onClose={() => {
                setAccountMenuOpen(false);
              }}
            />
            {isSm && (
              <Button
                variant="nav"
                color="secondary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
              >
                <FaBarsRegular />
              </Button>
            )}
          </Grid2>
        </Grid2>
      </Box>
      <Drawer
        keepMounted
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        PaperProps={{ sx: { minWidth: 250 } }}
      >
        <DrawerMenu
          routes={routes}
          onClose={() => {
            setDrawerOpen(false);
          }}
        />
      </Drawer>
    </>
  );
};
