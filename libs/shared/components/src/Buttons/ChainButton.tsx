import { alpha, Stack, Typography } from '@mui/material';
import { Dropdown } from '@origin/shared/icons';
import { arbitrum } from 'viem/chains';

import { ChainIcon } from '../Icons';

import type { StackProps } from '@mui/material';
import type { Chain } from 'viem';

export type ChainButtonProps = {
  chain: Chain;
  isDisabled?: boolean;
} & StackProps;

export const ChainButton = ({
  chain,
  isDisabled,
  ...rest
}: ChainButtonProps) => {
  return (
    <Stack
      direction="row"
      role="button"
      gap={1}
      {...rest}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 32,
        maxHeight: 32,
        borderRadius: 25,
        fontSize: '1rem',
        paddingLeft: 0.25,
        paddingRight: isDisabled ? 2 : 1,
        border: '1px solid transparent',
        paddingY: 0.25,
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: 'pointer',
        fontWeight: 500,
        boxSizing: 'border-box',
        position: 'relative',
        ':hover': {
          background: (theme) =>
            `linear-gradient(${theme.palette.grey[600]}, ${theme.palette.grey[600]}) padding-box, ` +
            `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.4)} 0%, ` +
            `${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
        },
        ...rest?.sx,
      }}
    >
      <ChainIcon chainId={chain.id} sx={{ height: '28px' }} />
      <Typography variant="inherit">
        {chain.id === arbitrum.id ? 'Arbitrum' : chain.name}
      </Typography>
      {!isDisabled && <Dropdown />}
    </Stack>
  );
};
