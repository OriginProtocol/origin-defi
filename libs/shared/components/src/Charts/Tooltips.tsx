import { capitalize, Stack } from '@mui/material';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';

import { ValueLabel } from '../Labels';

import type { StackProps } from '@mui/material';

import type { ValueLabelProps } from '../Labels';
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
      spacing={0.5}
      {...rest}
      sx={[
        { backgroundColor: 'background.default' },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Date' })}
        value={format(
          new Date(series[0].data[0]?.[series[0].xKey] as number),
          'dd MMM yyyy',
        )}
        {...valueLabelProps}
      />
      {series.map((s, i) => (
        <ValueLabel
          key={`tooltip-serie-${i}`}
          label={s?.label ?? capitalize(s.yKey as string) ?? 'Serie'}
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
