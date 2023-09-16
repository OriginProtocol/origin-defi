import { Box, Stack } from '@mui/material';

import type { SxProps } from '@mui/material';

interface Props {
  size?: number;
  sx?: SxProps;
}

export function Mix({ size = 2, sx }: Props) {
  const imgSrc = [
    '/images/currency/weth-icon-small.png',
    '/images/currency/reth-icon-small.png',
    '/images/currency/steth-icon-small.svg',
    '/images/currency/frxeth-icon-small.svg',
  ];

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
      {imgSrc.map((img, index, arr) => (
        <Box
          key={img}
          sx={{
            height: `${size}rem`,
            width: `${size}rem`,
            zIndex: arr.length - index,
            transform: `translateX(-${(index * size) / 2.66666}rem)`,
          }}
          src={img}
          component="img"
        />
      ))}
    </Stack>
  );
}
