import { Skeleton } from '@mui/material';

import type { SkeletonProps } from '@mui/material';

interface Props extends SkeletonProps {}

export function Loader({ sx, ...rest }: Props) {
  return (
    <Skeleton
      sx={{ backgroundColor: 'grey.900', borderRadius: 22, ...sx }}
      variant="text"
      animation="wave"
      {...rest}
    />
  );
}
