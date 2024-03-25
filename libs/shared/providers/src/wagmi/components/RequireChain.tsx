import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useSwitchChain } from 'wagmi';

import type { ReactNode } from 'react';
import type { Chain } from 'viem';

export const RequireChain = ({
  sectionName,
  children,
  chain,
}: {
  sectionName: string;
  children: ReactNode;
  chain: Chain;
}) => {
  const intl = useIntl();
  const { chain: currentChain } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleSwitchNetwork = () => {
    switchChain({ chainId: chain.id });
  };

  const correctChain = currentChain?.id === chain.id;

  let overlay: ReactNode = null;
  if (currentChain && !correctChain) {
    overlay = (
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
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {overlay}
      <Box sx={{ position: 'absolute', top: 0 }}>{children}</Box>
    </Box>
  );
};
