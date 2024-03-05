import { forwardRef } from 'react';

import { Skeleton, Typography } from '@mui/material';

import type { SkeletonProps, TypographyProps } from '@mui/material';

export type LoadingLabelProps = {
  isLoading?: boolean;
  sWidth?: SkeletonProps['width'];
  skeletonProps?: SkeletonProps;
} & TypographyProps;

export const LoadingLabel = forwardRef<HTMLSpanElement, LoadingLabelProps>(
  ({ isLoading, children, sWidth = 40, skeletonProps, ...rest }, ref) => {
    return (
      <Typography {...rest} ref={ref}>
        {isLoading ? <Skeleton width={sWidth} {...skeletonProps} /> : children}
      </Typography>
    );
  },
);
LoadingLabel.displayName = 'LoadingLabel';
