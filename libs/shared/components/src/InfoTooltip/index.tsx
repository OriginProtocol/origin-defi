import { SvgIcon, Tooltip, Typography } from '@mui/material';
import { CircleInfo } from '@origin/shared/icons';

import type { SvgIconProps, TooltipProps } from '@mui/material';
import type { ReactNode } from 'react';

export type InfoTooltipProps = {
  tooltipLabel: ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  iconSize?: number;
  iconColor?: string;
} & SvgIconProps;

export function InfoTooltip({
  tooltipLabel,
  tooltipProps,
  iconSize = 14,
  iconColor = 'text.secondary',
  ...rest
}: InfoTooltipProps) {
  return (
    <Tooltip
      {...tooltipProps}
      title={
        <Typography color="text.secondary" variant="body2">
          {tooltipLabel}
        </Typography>
      }
    >
      <SvgIcon
        {...rest}
        sx={{
          width: iconSize,
          height: iconSize,
          color: iconColor,
          ...rest?.sx,
        }}
      >
        <CircleInfo />
      </SvgIcon>
    </Tooltip>
  );
}
