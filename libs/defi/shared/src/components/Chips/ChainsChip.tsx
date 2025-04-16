import { Stack, Typography } from '@mui/material';
import { NetworkIcon, SliderSwitch } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { useAccount, useSwitchChain } from 'wagmi';

import type { StackProps, Theme } from '@mui/material';
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
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleChainChange = (newVal: string | number) => {
    switchChain({ chainId: newVal as SupportedChain });
  };

  const chainOptions = chainIds.map((id) => ({
    label: (
      <NetworkIcon
        key={id}
        chainId={id as SupportedChain}
        size={iconSize}
        sx={{ p: 0, m: 0 }}
      />
    ),
    value: id,
  }));

  return (
    <Stack
      direction="row"
      spacing={1.5}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Typography
        variant="caption1"
        sx={{
          color: 'primary.light',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Available on' })}
      </Typography>
      <SliderSwitch
        options={chainOptions}
        value={chainId ?? chainOptions[0].value}
        onChange={handleChainChange}
        sx={{ borderRadius: 2, backgroundColor: 'background.default' }}
        selectedSx={{
          borderRadius: 2,
          backgroundColor: 'background.highlight',
          boxShadow: (theme: Theme) =>
            `inset 0 0 0 2px ${theme.palette.background.default},inset 0 0 0 3px ${theme.palette.divider}`,
        }}
      />
      {/* <Stack
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
      </Stack> */}
    </Stack>
  );
};
