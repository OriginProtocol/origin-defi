import { useEffect, useRef, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackEvent, useActivitiesStatus } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import {
  FaBarsRegular,
  FaCircleExclamationRegular,
  OriginLabel,
} from '@origin/shared/icons';
import {
  ChainMenuButton,
  OpenAccountModalButton,
  useIsRebaseBannerVisible,
} from '@origin/shared/providers';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { AccountPopover } from './AccountPopover';
import { AlertPopover } from './AlertPopover';
import { DrawerMenu } from './DrawerMenu';
import { HoverMenu } from './HoverMenu';

export const Topnav = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const accountMenuAnchorEl = useRef(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const alertMenuAnchorEl = useRef(null);
  const [alertMenuOpen, setAlertMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { status, pendingCount } = useActivitiesStatus();
  const isNonRebasingOETH = useIsRebaseBannerVisible(tokens.mainnet.OETH);
  const isNonRebasingOUSD = useIsRebaseBannerVisible(tokens.mainnet.OUSD);
  const once = useRef(true);

  useEffect(() => {
    if (once.current && (isNonRebasingOETH || isNonRebasingOUSD)) {
      setAlertMenuOpen(true);
      once.current = false;
    }
  }, [isNonRebasingOETH, isNonRebasingOUSD]);

  const isLoading = status === 'pending' && pendingCount > 0;
  const showRebaseMenu = isNonRebasingOETH || isNonRebasingOUSD;

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
        <Grid2 container height={1} width={1}>
          <Grid2
            xs={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
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
          <Grid2 xs={0} md={7} mdOffset={0.5}>
            {!isSm && <HoverMenu />}
          </Grid2>
          <Grid2
            xs={10}
            md={2.5}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.25,
            }}
          >
            {showRebaseMenu && (
              <>
                <Button
                  variant="nav"
                  color="secondary"
                  ref={alertMenuAnchorEl}
                  onClick={() => {
                    setAlertMenuOpen(not);
                  }}
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
              </>
            )}
            <ChainMenuButton
              variant="nav"
              color="secondary"
              hideChainName={isMd}
              sx={{ flexShrink: 0 }}
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
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} />
                  {!isMd && (
                    <Typography noWrap color="primary.main">
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
          onClose={() => {
            setDrawerOpen(false);
          }}
        />
      </Drawer>
    </>
  );
};
