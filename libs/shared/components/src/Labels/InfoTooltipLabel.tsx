import { Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

import type { InfoTooltipProps } from '../InfoTooltip';

export type InfoTooltipLabelProps = {
  children: ReactNode;
  tooltipLabel?: ReactNode;
  labelProps?: TypographyProps;
  infoTooltipProps?: Omit<InfoTooltipProps, 'tooltipLabel'>;
} & StackProps;

export const InfoTooltipLabel = ({
  children,
  tooltipLabel,
  labelProps,
  infoTooltipProps,
  ...rest
}: InfoTooltipLabelProps) => {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {typeof children === 'string' ? (
        <Typography variant="inherit" {...labelProps}>
          {children}
        </Typography>
      ) : (
        children
      )}
      {tooltipLabel && (
        <InfoTooltip tooltipLabel={tooltipLabel} {...infoTooltipProps} />
      )}
    </Stack>
  );
};
