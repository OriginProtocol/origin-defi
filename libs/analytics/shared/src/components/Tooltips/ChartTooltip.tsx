import { capitalize, Stack, Typography } from '@mui/material';
import { ColorLabel, ValueLabel } from '@origin/shared/components';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { Serie, ValueLabelProps } from '@origin/shared/components';

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

  const timestamp = series?.[0]?.data?.[0]?.[series?.[0]?.xKey] as number;

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
      {timestamp && (
        <Typography variant="caption1" color="text.secondary" gutterBottom>
          {formatInTimeZone(
            toZonedTime(timestamp, 'UTC'),
            'UTC',
            'dd MMM yyyy',
          )}
        </Typography>
      )}
      {series.map((s, i) => (
        <ValueLabel
          key={`tooltip-serie-${i}`}
          label={
            <ColorLabel
              label={s?.label ?? capitalize(s.yKey as string) ?? 'Serie'}
              color={s.color}
              labelProps={valueLabelProps.labelProps}
            />
          }
          value={intl.formatNumber(s.data?.[0]?.[s.yKey] as number, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
    py: 0.25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelProps: {
    variant: 'caption1',
    sx: {
      minWidth: 50,
    },
  },
  valueProps: {
    variant: 'caption1',
    color: 'text.primary',
  },
};
