import { Stack, Typography } from '@mui/material';

import { InfoTooltip } from '../InfoTooltip';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

import type { InfoTooltipProps } from '../InfoTooltip';

export type InfoTooltipLabelProps = {
  children: ReactNode;
  tooltipLabel: string;
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
    <Stack direction="row" alignItems="center" spacing={0.75} {...rest}>
      {typeof children === 'string' ? (
        <Typography variant="inherit" {...labelProps}>
          {children}
        </Typography>
      ) : (
        children
      )}
      <InfoTooltip tooltipLabel={tooltipLabel} {...infoTooltipProps} />
    </Stack>
  );
};
