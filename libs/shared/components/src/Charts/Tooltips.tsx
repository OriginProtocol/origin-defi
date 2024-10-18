import { capitalize, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

import type { Serie } from './types';

export type ChartTooltipProps<ChartData> = {
  series: Serie<ChartData>[] | null;
} & StackProps;

export const ChartTooltip = <ChartData,>({
  series,
  ...rest
}: ChartTooltipProps<ChartData>) => {
  const intl = useIntl();

  if (!series) {
    return null;
  }

  return (
    <Stack
      {...rest}
      sx={[
        { backgroundColor: 'background.default' },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {intl.formatMessage(
          { defaultMessage: 'Date: {date}' },
          {
            date: intl.formatDate(
              new Date(series[0].data[0]?.[series[0].xKey] as number),
            ),
          },
        )}
      </Typography>
      {series.map((s, i) => (
        <Typography
          key={`tooltip-serie-${i}`}
          variant="body2"
          sx={{ color: 'text.primary' }}
        >
          {intl.formatMessage(
            { defaultMessage: '{label}: {value}' },
            {
              label: s?.label ?? capitalize(s.yKey as string) ?? 'Serie',
              value: intl.formatNumber(s.data?.[0]?.[s.yKey] as number, {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 5,
              }),
            },
          )}
        </Typography>
      ))}
    </Stack>
  );
};
