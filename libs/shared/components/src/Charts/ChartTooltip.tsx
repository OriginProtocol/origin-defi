import { Box, Stack, Typography } from '@mui/material';

import { CurrencyLabel } from '../Labels';

import type { StackProps } from '@mui/material';

import type { ChartTooltipLabel } from './types';

export type ChartTooltipProps<Datum> = {
  item: Datum | null;
  tooltipLabels?: ChartTooltipLabel<Datum>[];
} & StackProps;

export const ChartTooltip = <Datum,>({
  item,
  tooltipLabels,
  ...rest
}: ChartTooltipProps<Datum>) => {
  if (!item || !tooltipLabels?.length) {
    return null;
  }

  return (
    <Stack
      {...rest}
      useFlexGap
      sx={[
        {
          backgroundColor: 'background.default',
          p: 1,
          border: '1px solid',
          borderColor: 'common.white',
          borderRadius: 3,
          gap: 0.5,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {tooltipLabels.map((l, i) => {
        const label = typeof l.label === 'function' ? l.label(item) : l.label;
        const value = typeof l.value === 'function' ? l.value(item) : l.value;
        const color = typeof l.color === 'function' ? l.color(item) : l.color;
        const currency = l.currency;

        return (
          <Stack
            key={`${i}`}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            {typeof label === 'string' ? (
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background:
                      Array.isArray(color) && color.length === 2
                        ? `linear-gradient(90deg, ${color?.[0]}, ${color[1]});`
                        : color,
                  }}
                />
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: 12,
                    minWidth: 50,
                  }}
                >
                  {label}
                </Typography>
              </Stack>
            ) : (
              label
            )}
            {value ? (
              typeof value === 'string' ? (
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontSize: 12,
                  }}
                >
                  {currency ? (
                    <CurrencyLabel currency={currency}>{value}</CurrencyLabel>
                  ) : (
                    value
                  )}
                </Typography>
              ) : (
                value
              )
            ) : null}
          </Stack>
        );
      })}
    </Stack>
  );
};
