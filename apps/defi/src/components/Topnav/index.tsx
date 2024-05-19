import { useState } from 'react';

import { alpha, Box, useMediaQuery, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackEvent } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpArrowDownLight, OriginLabel } from '@origin/shared/icons';
import {
  AccountPopover,
  ActivityButton,
  ChainSwitcherButton,
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { HoverMenu } from './components/HoverMenu';
import { ModalMenuButton } from './components/ModalMenu';

export const Topnav = () => {
  const { isConnected } = useAccount();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);

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
          <Grid2 xs={0} md={6}>
            {!isSm && <HoverMenu />}
          </Grid2>
          <Grid2
            xs={10}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.25,
            }}
          >
            <ChainSwitcherButton variant="nav" />
            <OpenAccountModalButton
              color="secondary"
              onClick={(e) => {
                if (isConnected) {
                  setAccountModalAnchor(e.currentTarget);
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
                minWidth: 36,
                maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
                minHeight: { xs: 36, md: 40 },
                paddingX: {
                  lg: 2,
                  xs: isConnected ? 0.75 : 2,
                },
                paddingY: 0.75,
              }}
              disconnectedProps={{ color: 'primary' }}
              hideAddress={isMd}
            />
            <AccountPopover
              anchor={accountModalAnchor}
              setAnchor={setAccountModalAnchor}
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
            {isConnected && (
              <ActivityButton
                iconSize={20}
                activityIcon={
                  <FaArrowUpArrowDownLight
                    sx={{ transform: 'rotate(45deg)' }}
                  />
                }
                sx={{
                  width: { xs: 36, md: 40 },
                  height: { xs: 36, md: 40 },
                  padding: {
                    xs: 0.75,
                    md: 1,
                  },
                }}
              />
            )}
            {isSm && <ModalMenuButton sx={{ minHeight: 36, minWidth: 36 }} />}
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
