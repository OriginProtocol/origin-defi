import { Box } from '@mui/material';

import { TokenIcon } from './TokenIcon';

import type { BoxProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type SwapTokensIconProps = {
  tokenIn: Token;
  tokenOut: Token;
  size?: number;
} & BoxProps;

export const SwapTokensIcon = ({
  tokenIn,
  tokenOut,
  size = 24,
  ...rest
}: SwapTokensIconProps) => {
  const iconSize = size * 0.7;

  return (
    <Box
      {...rest}
      sx={{
        position: 'relative',
        width: size,
        height: size,
        ...rest?.sx,
      }}
    >
      <TokenIcon
        key={tokenIn.symbol}
        token={tokenIn}
        outlined
        sx={{
          position: 'absolute',
          fontSize: iconSize,
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      />
      <TokenIcon
        key={tokenOut.symbol}
        token={tokenOut}
        outlined
        sx={{
          position: 'absolute',
          fontSize: iconSize,
          zIndex: 2,
          bottom: 0,
          right: 0,
        }}
      />
    </Box>
  );
};
