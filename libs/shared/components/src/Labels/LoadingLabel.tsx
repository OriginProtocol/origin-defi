import { Skeleton, Typography } from '@mui/material';

import type { SkeletonProps, TypographyProps } from '@mui/material';

export type LoadingLabelProps = {
  isLoading?: boolean;
  sWidth?: SkeletonProps['width'];
  skeletonProps?: SkeletonProps;
} & TypographyProps;

export const LoadingLabel = ({
  isLoading,
  children,
  sWidth = 40,
  skeletonProps,
  ...rest
}: LoadingLabelProps) => {
  return (
    <Typography {...rest}>
      {isLoading ? <Skeleton width={sWidth} {...skeletonProps} /> : children}
    </Typography>
  );
};
