import { useState } from 'react';

import { alpha, Box, Divider } from '@mui/material';
import { trackEvent } from '@origin/governance/shared';
import { tokens } from '@origin/shared/contracts';
import { PrimeStake } from '@origin/shared/icons';
import {
  AccountPopover,
  ActivityButton,
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Box
        sx={{
          height: (theme) => ({
            xs: '112px',
            md: `${theme.mixins.toolbar.height}px`,
          }),
        }}
      />
      <Box
        component="nav"
        {...props}
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          zIndex: theme.zIndex.appBar,
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: 'blur(15px)',
          height: {
            xs: '112px',
            md: `${theme.mixins.toolbar.height}px`,
          },
          display: 'grid',
          borderBottom: {
            xs: 'none',
            md: `1px solid ${theme.palette.background.paper}`,
          },
          columnGap: { xs: 1, md: 6 },
          rowGap: 0,
          alignItems: 'center',
          px: {
            xs: 1.5,
            md: 3,
          },
          pt: {
            xs: 1.5,
            md: 0,
          },
          gridTemplateColumns: {
            xs: '1fr 1fr',
            md: 'auto 1fr auto',
          },
        })}
      >
        <Box component={Link} to="/">
          <PrimeStake sx={{ width: 1, height: 40 }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
          }}
        >
          <OpenAccountModalButton
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
              borderRadius: 25,
              paddingX: {
                md: 3,
                xs: 2,
              },
              paddingY: {
                md: 1,
                xs: 0.75,
              },
              minWidth: 36,
              maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
              color: 'primary.contrastText',
              minHeight: { xs: 36, md: 44 },
            }}
          />
          <AccountPopover
            anchor={accountModalAnchor}
            setAnchor={setAccountModalAnchor}
            balanceTokens={[tokens.mainnet.OGV, tokens.mainnet.veOGV]}
          />
          <ActivityButton
            onClick={() => {
              trackEvent({ name: 'open_activity' });
            }}
            sx={{
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              padding: {
                xs: 0.75,
                md: 1,
              },
            }}
          />
        </Box>
        <Divider
          sx={{
            display: { xs: 'block', md: 'none' },
            gridColumn: 'span 2',
            gridRowStart: 1,
            borderColor: (theme) => theme.palette.background.paper,
            position: 'relative',
            width: 'calc(100% + 1.5rem)',
            bottom: '-3rem',
            left: '-0.75rem',
          }}
        />
      </Box>
    </>
  );
}
