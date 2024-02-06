import { useState } from 'react';

import { Box, Stack } from '@mui/material';
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
          height: (theme) => `${theme.mixins.toolbar.height}px`,
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
          height: `${theme.mixins.toolbar.height}px`,
          display: 'grid',
          columnGap: { xs: 1, md: 6 },
          rowGap: 0,
          alignItems: 'center',
          px: {
            xs: 1.5,
            md: 3,
          },
          gridTemplateColumns: '1fr 1fr',
        })}
      >
        <Stack
          direction="row"
          component={Link}
          to="/"
          justifyContent="flex-start"
        >
          <PrimeStake sx={{ width: 147, height: { xs: 36, sm: 44 } }} />
        </Stack>
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
      </Box>
    </>
  );
}
