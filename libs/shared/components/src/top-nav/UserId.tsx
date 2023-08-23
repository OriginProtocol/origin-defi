import { Typography } from '@mui/material';

import type { TypographyProps } from '@mui/material';

interface Props extends TypographyProps {
  userId: string;
}

export function UserId({ userId, sx, ...rest }: Props) {
  return (
    <Typography sx={{ fontVariantLigatures: 'no-contextual', ...sx }} {...rest}>
      {userId.slice(0, 4)}...
      {userId.slice(-4)}
    </Typography>
  );
}
