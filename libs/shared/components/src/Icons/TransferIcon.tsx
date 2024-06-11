import { Stack } from '@mui/material';
import { FaArrowRightRegular } from '@origin/shared/icons';

import { TokenIcon } from './TokenIcon';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TransferIconProps = {
  tokenIn: Token;
  tokenOut: Token;
  iconSize?: number;
} & StackProps;

export const TransferIcon = ({
  tokenIn,
  tokenOut,
  iconSize = 20,
  ...rest
}: TransferIconProps) => {
  const arrowSize = iconSize * 0.7;

  return (
    <Stack direction="row" alignItems="center" spacing={1} {...rest}>
      <TokenIcon token={tokenIn} sx={{ fontSize: iconSize }} />
      <FaArrowRightRegular sx={{ fontSize: arrowSize }} />
      <TokenIcon token={tokenOut} sx={{ fontSize: iconSize }} />
    </Stack>
  );
};
