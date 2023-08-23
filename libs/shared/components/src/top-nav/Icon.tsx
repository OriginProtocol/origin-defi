import { Box } from '@mui/material';

import type { BoxProps } from '@mui/material';

interface Props extends BoxProps {
  src: string;
}

export function Icon({ src, sx, ...rest }: Props) {
  return (
    <Box
      component="img"
      src={src}
      sx={{ width: (theme) => theme.typography.pxToRem(20), ...sx }}
      {...rest}
    />
  );
}
