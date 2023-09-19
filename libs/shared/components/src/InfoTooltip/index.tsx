import { Box, Tooltip, Typography } from '@mui/material';

export type InfoTooltipProps = {
  tooltipLabel: string;
  iconSize?: number;
  iconColor?: string;
};

export function InfoTooltip({
  tooltipLabel,
  iconSize = 12,
  iconColor = 'text.secondary',
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
        component="img"
        src="/images/info.svg"
        data-testid="swap-route-info"
        sx={{
          width: (theme) => theme.typography.pxToRem(iconSize),
          height: (theme) => theme.typography.pxToRem(iconSize),
          color: iconColor,
        }}
      ></Box>
    </Tooltip>
  );
}
