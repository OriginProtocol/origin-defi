import { Tooltip, Typography } from '@mui/material';
import { FaIcon } from '@origin/shared/icons';

import type { SvgIconProps } from '@mui/material';

export type InfoTooltipProps = {
  tooltipLabel: string;
  iconSize?: number;
  iconColor?: string;
} & SvgIconProps;

export function InfoTooltip({
  tooltipLabel,
  iconSize = 14,
  iconColor = 'text.secondary',
  ...rest
}: InfoTooltipProps) {
  return (
    <Tooltip
      title={
        <Typography color="text.secondary" variant="body2">
          {tooltipLabel}
        </Typography>
      }
    >
      <FaIcon
        {...rest}
        name="circle-info"
        sx={{
          width: iconSize,
          height: iconSize,
          color: iconColor,
          ...rest?.sx,
        }}
      />
    </Tooltip>
  );
}
