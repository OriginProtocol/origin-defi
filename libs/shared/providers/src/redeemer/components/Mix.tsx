import { Box, Stack } from '@mui/material';

import type { SxProps } from '@mui/material';

interface MixProps {
  imgSrc: string[];
  size?: number;
  sx?: SxProps;
}

export function Mix({ imgSrc, size = 1.5, sx }: MixProps) {
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
          alt="mix_token"
          component="img"
        />
      ))}
    </Stack>
  );
}
