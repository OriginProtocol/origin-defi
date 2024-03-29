import { Button, Typography } from '@mui/material';
import { arbitrum } from 'viem/chains';

import { ChainIcon } from '../Icons';

import type { ButtonProps, SvgIconProps, TypographyProps } from '@mui/material';
import type { Chain } from 'viem';

export type ChainButtonProps = {
  chain: Chain;
  iconProps?: SvgIconProps;
  labelProps?: TypographyProps;
} & ButtonProps;

export const ChainButton = ({
  chain,
  iconProps,
  labelProps,
  ...rest
}: ChainButtonProps) => {
  return (
    <Button
      {...rest}
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        ...rest?.sx,
        paddingLeft: 1,
        '&.Mui-disabled': {
          color: 'text.primary',
        },
      }}
    >
      <ChainIcon chainId={chain.id} sx={{ fontSize: 24 }} {...iconProps} />
      <Typography variant="inherit" {...labelProps}>
        {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
      </Typography>
    </Button>
  );
};
