import { Button, emphasize, Typography } from '@mui/material';
import { arbitrum } from 'viem/chains';

import { NetworkIcon } from '../Icons';

import type { ButtonProps, TypographyProps } from '@mui/material';
import type { Chain } from 'viem';

import type { SupportedChain } from '../Icons';

export type ChainButtonProps = {
  chain: Chain;
  iconSize?: number;
  labelProps?: TypographyProps;
} & ButtonProps;

export const ChainButton = ({
  chain,
  iconSize,
  labelProps,
  ...rest
}: ChainButtonProps) => {
  return (
    <Button
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 40,
        gap: 1,
        borderRadius: 120,
        color: 'text.primary',
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        pl: 1,
        pr: rest?.disabled ? 1 : 1.5,
        py: 0.75,
        flexShrink: 0,
        '&:hover': {
          borderColor: (theme) => emphasize(theme.palette.divider, 0.2),
          background: (theme) =>
            emphasize(theme.palette.background.default, 0.2),
        },
        '&.Mui-disabled': {
          color: 'text.primary',
          backgroundColor: 'background.default',
          pr: 2,
        },
        ...rest?.sx,
      }}
    >
      <NetworkIcon chainId={chain.id as SupportedChain} size={iconSize} />
      <Typography variant="inherit" {...labelProps}>
        {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
      </Typography>
    </Button>
  );
};
