import { Stack } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { TokenIcon } from '../Icons';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type MultiTokenIconProps = {
  tokens: Token[];
  size?: number;
  zOrder?: 'first' | 'last';
  spacing?: number;
} & StackProps;

export const MultiTokenIcon = ({
  tokens,
  size = 1.5,
  zOrder = 'first',
  spacing = 2.66666,
  ...rest
}: MultiTokenIconProps) => {
  if (isNilOrEmpty(tokens)) {
    return null;
  }

  return (
    <Stack
      direction="row"
      {...rest}
      sx={{
        width: `calc(${tokens.length * size}rem - ${
          (size / spacing) * (tokens.length - 1)
        }rem)`,
        ...rest?.sx,
      }}
    >
      {tokens.map((token, index, arr) => (
        <TokenIcon
          key={token.symbol}
          token={token}
          outlined
          sx={{
            height: `${size}rem`,
            width: `${size}rem`,
            zIndex: zOrder === 'first' ? arr.length - index : index,
            transform: `translateX(-${(index * size) / spacing}rem)`,
          }}
        />
      ))}
    </Stack>
  );
};
