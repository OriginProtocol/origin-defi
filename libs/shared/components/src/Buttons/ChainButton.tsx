import { Button, Typography } from '@mui/material';
import { arbitrum } from 'viem/chains';

import { ChainIcon } from '../Icons';

import type { ButtonProps } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { TypographyTypeMap } from '@mui/material/Typography/Typography';
import type { Chain } from 'viem';

import type { ChainIconProps } from '../Icons';

export type ChainButtonProps = {
  chain: Chain;
  iconProps?: Partial<ChainIconProps>;
  labelProps?: Partial<OverridableComponent<TypographyTypeMap>>;
  isDisabled?: boolean;
} & ButtonProps;

export const ChainButton = ({
  chain,
  iconProps,
  labelProps,
  isDisabled,
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
      }}
    >
      <ChainIcon chainId={chain.id} sx={{ height: '28px' }} {...iconProps} />
      <Typography variant="inherit" {...labelProps}>
        {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
      </Typography>
    </Button>
  );
};
