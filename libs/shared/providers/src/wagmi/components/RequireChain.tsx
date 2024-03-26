import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useSwitchChain } from 'wagmi';

import type { ReactNode } from 'react';
import type { Chain } from 'viem';

export type RequireChainProps = {
  sectionName: string;
  children: ReactNode;
  allowedChains: Chain[];
};

export const RequireChain = ({
  sectionName,
  children,
  allowedChains,
}: RequireChainProps) => {
  const intl = useIntl();
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleSwitchNetwork = () => {
    switchChain({ chainId: allowedChains[0].id });
  };

  const isChainAllowed = allowedChains
    .map((c) => c.id)
    .includes(chain?.id ?? -1);

  if (chain && !isChainAllowed) {
    return (
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={(theme) => ({
            position: 'fixed',
            inset: 0,
            zIndex: 5,
            backgroundColor: alpha(theme.palette.background.default, 0.6),
            backdropFilter: 'blur(15px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Stack p={4} spacing={2}>
            <Typography variant="h1">
              {intl.formatMessage({ defaultMessage: 'Unsupported Network' })}
            </Typography>
            <Typography variant="h3">
              {intl.formatMessage(
                {
                  defaultMessage:
                    'The selected network is not supported by {sectionName}.',
                },
                { sectionName },
              )}
            </Typography>
            <Stack direction="row">
              <Button variant={'action'} onClick={handleSwitchNetwork}>
                {intl.formatMessage(
                  { defaultMessage: 'Switch to {chain}' },
                  { chain: chain.name },
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ position: 'absolute', top: 0 }}>{children}</Box>
      </Box>
    );
  }

  return children;
};
