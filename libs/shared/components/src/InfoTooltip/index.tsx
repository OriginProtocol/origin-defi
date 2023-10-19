import { Box, Tooltip, Typography } from '@mui/material';

import type { BoxProps } from '@mui/material';

export type InfoTooltipProps = {
  tooltipLabel: string;
  iconSize?: number;
  iconColor?: string;
} & BoxProps;

export function InfoTooltip({
  tooltipLabel,
  iconSize = 12,
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
      <Box
        {...rest}
        component="img"
        src="/images/info.svg"
        alt="info"
        sx={{
          width: (theme) => theme.typography.pxToRem(iconSize),
          height: (theme) => theme.typography.pxToRem(iconSize),
          color: iconColor,

          ...rest?.sx,
        }}
      ></Box>
    </Tooltip>
  );
}
