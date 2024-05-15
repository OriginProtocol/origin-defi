import { useRef, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Divider,
  Drawer,
  emphasize,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackEvent } from '@origin/defi/shared';
import { ClickAwayPopover } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaBarsRegular, OriginLabel } from '@origin/shared/icons';
import {
  AccountPanel,
  BalanceList,
  ChainMenuButton,
  OpenAccountModalButton,
  ThemeModeIconButton,
} from '@origin/shared/providers';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { DrawerMenu } from './DrawerMenu';
import { HoverMenu } from './HoverMenu';

export const Topnav = () => {
  const { isConnected } = useAccount();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const accountMenuAnchorEl = useRef(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: {
            xs: '56px',
            md: '72px',
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
            xs: '56px',
            md: '72px',
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
          <Grid2 xs={0} md={7}>
            {!isSm && <HoverMenu />}
          </Grid2>
          <Grid2
            xs={10}
            md={3}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.25,
            }}
          >
            <OpenAccountModalButton
              variant="nav"
              ref={accountMenuAnchorEl}
              onClick={(e) => {
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
                sx: { '&&&': { borderRadius: 2, minWidth: 80 } },
              }}
              hideAddress={isMd}
            />
            <ClickAwayPopover
              open={accountMenuOpen}
              anchorEl={accountMenuAnchorEl}
              onClose={() => {
                setAccountMenuOpen(false);
              }}
              paperProps={{
                sx: {
                  minWidth: 250,
                  mt: 1.5,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                },
              }}
            >
              <AccountPanel
                disconnectButtonProps={{ size: 'small' }}
                onDisconnect={() => {
                  setAccountMenuOpen(false);
                }}
              />
              <Divider />
              <BalanceList
                balanceTokens={[
                  tokens.mainnet.ETH,
                  tokens.mainnet.OETH,
                  tokens.mainnet.wOETH,
                  tokens.mainnet.WETH,
                  tokens.mainnet.rETH,
                  tokens.mainnet.frxETH,
                  tokens.mainnet.sfrxETH,
                  tokens.mainnet.stETH,
                ]}
              />
            </ClickAwayPopover>
            <ChainMenuButton
              variant="nav"
              color="secondary"
              hideChainName
              menuProps={{
                paperProps: {
                  sx: {
                    mt: 1.5,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 1,
                  },
                },
              }}
              menuItemProps={{
                sx: {
                  ...theme.typography.body3,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: emphasize(
                      theme.palette.background.default,
                      0.2,
                    ),
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'background.default',
                    '&:hover': {
                      backgroundColor: emphasize(
                        theme.palette.background.default,
                        0.2,
                      ),
                    },
                  },
                },
              }}
            />
            <ThemeModeIconButton
              variant="nav"
              color="secondary"
              sx={{ fontSize: 16 }}
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
