import { Stack, Typography } from '@mui/material';
import { NetworkIcon } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { useSwitchChain } from 'wagmi';

import { ColorChip } from './ColorChip';

import type { StackProps } from '@mui/material';
import type { SupportedChain } from '@origin/shared/components';

type ChainsChipProps = {
  chainIds: readonly number[];
  iconSize?: number;
  disableChainSwitch?: boolean;
} & StackProps;

export const ChainsChip = ({
  chainIds,
  iconSize = 24,
  disableChainSwitch,
  ...rest
}: ChainsChipProps) => {
  const intl = useIntl();
  const { switchChain } = useSwitchChain();

  return (
    <ColorChip spacing={1.5} {...rest}>
      <Typography
        variant="caption1"
        sx={{
          color: 'primary.light',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Available on' })}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        {chainIds.map((id) => (
          <NetworkIcon
            key={id}
            chainId={id as SupportedChain}
            size={iconSize}
            {...(!disableChainSwitch && {
              onClick: () => {
                switchChain({ chainId: id });
              },
              role: 'button',
              sx: {
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              },
            })}
          />
        ))}
      </Stack>
    </ColorChip>
  );
};
