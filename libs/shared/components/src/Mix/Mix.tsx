import { Stack } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { TokenIcon } from '../Icons';

import type { SxProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

interface MixProps {
  tokens: Token[];
  size?: number;
  sx?: SxProps;
}

export function Mix({ tokens, size = 1.5, sx }: MixProps) {
  if (isNilOrEmpty(tokens)) {
    return null;
  }

  return (
    <Stack
      direction="row"
      sx={{
        width: `calc(${tokens.length * size}rem - ${
          (size / 2.66666) * (tokens.length - 1)
        }rem)`,
        ...sx,
      }}
    >
      {tokens.map((token, index, arr) => (
        <TokenIcon
          key={token.symbol}
          token={token}
          sx={{
            height: `${size}rem`,
            width: `${size}rem`,
            zIndex: arr.length - index,
            transform: `translateX(-${(index * size) / 2.66666}rem)`,
          }}
        />
      ))}
    </Stack>
  );
}
