import { capitalize, Stack, Typography } from '@mui/material';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { useIntl } from 'react-intl';

import { ColorLabel, ValueLabel } from '../Labels';

import type { StackProps, TypographyProps } from '@mui/material';

import type { ValueLabelProps } from '../Labels';
import type { Serie } from './types';

export type ChartTooltipProps<ChartData> = {
  series: Serie<ChartData>[] | null;
  labelProps?: TypographyProps;
} & StackProps;

export const ChartTooltip = <ChartData,>({
  series,
  labelProps,
  ...rest
}: ChartTooltipProps<ChartData>) => {
  const intl = useIntl();

  if (!series) {
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
      <Typography {...labelProps} gutterBottom>
        {formatInTimeZone(
          toZonedTime(series[0].data[0]?.[series[0].xKey] as number, 'UTC'),
          'UTC',
          'dd MMM yyyy',
        )}
      </Typography>
      {series.map((s, i) => (
        <ValueLabel
          key={`tooltip-serie-${i}`}
          label={
            <ColorLabel
              label={s?.label ?? capitalize(s.yKey as string) ?? 'Serie'}
              color={s.color}
              labelProps={labelProps}
            />
          }
          value={intl.formatNumber(s.data?.[0]?.[s.yKey] as number, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })}
          {...valueLabelProps}
        />
      ))}
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  spacing: 1,
  sx: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  labelProps: {
    sx: {
      minWidth: 50,
    },
  },
  valueProps: {
    color: 'text.primary',
  },
};
