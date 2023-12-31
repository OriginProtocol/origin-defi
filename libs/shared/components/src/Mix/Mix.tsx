import { Stack } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';

import { TokenIcon } from '../Icons';

import type { SxProps } from '@mui/material';

interface MixProps {
  imgSrc: string[];
  size?: number;
  sx?: SxProps;
}

export function Mix({ imgSrc, size = 1.5, sx }: MixProps) {
  if (isNilOrEmpty(imgSrc)) {
    return null;
  }

  return (
    <Stack
      direction="row"
      sx={{
        width: `calc(${imgSrc.length * size}rem - ${
          (size / 2.66666) * (imgSrc.length - 1)
        }rem)`,
        ...sx,
      }}
    >
      {imgSrc.map((symbol, index, arr) => (
        <TokenIcon
          key={symbol}
          symbol={symbol}
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
