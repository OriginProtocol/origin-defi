import { useState } from 'react';

import { Box, Button, Stack } from '@mui/material';
import { trackEvent } from '@origin/governance/shared';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightRegular, PrimeStake } from '@origin/shared/icons';
import {
  AccountPopover,
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { BoxProps } from '@mui/material';

export function Topnav(props: BoxProps) {
  const intl = useIntl();
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
          <Button
            variant="outlined"
            href="https://docs.primestaked.com/prime-staked-eth/intro-to-primeeth"
            target="_blank"
            rel="noopener noreferrer nofollow"
            color="secondary"
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
              minHeight: { xs: 36, md: 44 },
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Docs' })}&nbsp;
            <FaArrowUpRightRegular />
          </Button>
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
              minHeight: { xs: 36, md: 44 },
            }}
            connectedProps={{ variant: 'outlined', color: 'secondary' }}
          />
          <AccountPopover
            anchor={accountModalAnchor}
            setAnchor={setAccountModalAnchor}
            balanceTokens={[tokens.mainnet.OGV, tokens.mainnet.veOGV]}
          />
        </Box>
      </Box>
    </>
  );
}
