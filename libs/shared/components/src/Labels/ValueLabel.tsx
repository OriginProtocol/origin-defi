import { Skeleton, Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';
import { CurrencyLabel } from './CurrencyLabel';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

import type { Currency } from '../Controls';

export type ValueLabelProps = {
  label: ReactNode;
  value: ReactNode;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
  labelInfoTooltip?: string;
  isLoading?: boolean;
  sWidth?: number;
  currency?: Currency;
} & StackProps;

export const ValueLabel = ({
  label,
  value,
  labelProps,
  valueProps,
  labelInfoTooltip,
  isLoading,
  sWidth = 60,
  currency,
  ...rest
}: ValueLabelProps) => {
  return (
    <Stack
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {typeof label === 'string' ? (
        <Typography
          variant="body2"
          {...labelProps}
          sx={[
            {
              color: 'text.secondary',
            },
            ...(labelProps?.sx
              ? Array.isArray(labelProps.sx)
                ? labelProps.sx
                : [labelProps.sx]
              : []),
          ]}
        >
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
        <Typography
          {...valueProps}
          sx={[
            {
              display: 'flex',
              alignItems: 'baseline',
              gap: 0.5,
            },
            ...(Array.isArray(valueProps?.sx)
              ? valueProps.sx
              : [valueProps?.sx]),
          ]}
        >
          {isLoading ? (
            <Skeleton width={sWidth} />
          ) : (
            <CurrencyLabel currency={currency}>{value}</CurrencyLabel>
          )}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );
};
