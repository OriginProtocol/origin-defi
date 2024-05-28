import { Skeleton, Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ValueLabelProps = {
  label: ReactNode;
  value: ReactNode;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
  labelInfoTooltip?: string;
  isLoading?: boolean;
  sWidth?: number;
} & StackProps;

export const ValueLabel = ({
  label,
  value,
  labelProps,
  valueProps,
  labelInfoTooltip,
  isLoading,
  sWidth = 60,
  ...rest
}: ValueLabelProps) => {
  return (
    <Stack spacing={1} alignItems="center" {...rest}>
      {typeof label === 'string' ? (
        <Typography color="text.secondary" variant="body2" {...labelProps}>
          {label}
          {labelInfoTooltip ? (
            <InfoTooltip
              tooltipLabel={labelInfoTooltip}
              sx={{ ml: 0.75, transform: 'translateY(2px)' }}
            />
          ) : null}
        </Typography>
      ) : (
        label
      )}
      {['string', 'number'].includes(typeof value) ? (
        <Typography {...valueProps}>
          {isLoading ? <Skeleton width={sWidth} /> : value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );
};
