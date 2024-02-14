import { Button, Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useConfig, useSwitchChain } from 'wagmi';

import type { RequiredChildren } from '@origin/shared/utils';

export const EnsureNetworkProvider = ({ children }: RequiredChildren) => {
  const intl = useIntl();
  const { chains } = useConfig();
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleSwitchToDefaultNetwork = () => {
    switchChain({ chainId: chains[0].id });
  };

  const found = chains.find((c) => c.id === chain?.id);

  if (chain?.id && isNilOrEmpty(found)) {
    return (
      <Stack p={4} spacing={2}>
        <Typography variant="h1">
          {intl.formatMessage({ defaultMessage: 'Unsupported Network' })}
        </Typography>
        <Typography variant="h3">
          {intl.formatMessage({
            defaultMessage:
              'The selected network is not supported by the application.',
          })}
        </Typography>
        <Stack direction="row">
          <Button onClick={handleSwitchToDefaultNetwork}>
            {intl.formatMessage(
              { defaultMessage: 'Switch to {defaultChain}' },
              { defaultChain: chains[0].name },
            )}
          </Button>
        </Stack>
      </Stack>
    );
  }

  return children;
};
