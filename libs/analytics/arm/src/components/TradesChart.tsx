import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  ColorLabel,
  InfoTooltipLabel,
  LimitControls,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { subDays } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { useIntl } from 'react-intl';

import { useArmTrades } from '../hooks';
import { BubbleChart } from './BubbleChart';

import type { CardProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';

export type TradesChartProps = {
  height: number;
} & CardProps;

export const TradesChart = ({ height, ...rest }: TradesChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(3);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmTrades(limit);

  const width = measures?.width ?? 0;

  const dateStart = formatInTimeZone(
    toZonedTime(subDays(Date.now(), limit ?? 365), 'UTC'),
    'UTC',
    'dd MMM yyyy',
  );
  const dateEnd = formatInTimeZone(
    toZonedTime(Date.now(), 'UTC'),
    'UTC',
    'dd MMM yyyy',
  );

  return (
    <Card
      {...rest}
      ref={ref}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The price at which users are selling stETH to the ARM vs. buying it from the ARM.',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Trader Buy v. Sell' })}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent sx={{ minHeight: 120 }}>
        <Stack>
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography color="text.secondary">
              {intl.formatMessage(
                { defaultMessage: '{dateStart} - {dateEnd}' },
                {
                  dateStart,
                  dateEnd,
                },
              )}
            </Typography>
            <LimitControls limit={limit} setLimit={setLimit} span="week" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <ColorLabel
              label={intl.formatMessage({ defaultMessage: 'Buy' })}
              color={theme.palette.chart1}
            />
            <ColorLabel
              label={intl.formatMessage({ defaultMessage: 'Sell' })}
              color={theme.palette.chart4}
            />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ height }} />
      ) : (
        <BubbleChart
          width={width}
          height={height}
          data={data ?? []}
          serie={{
            label: (d) =>
              d?.swapType === 'buy'
                ? intl.formatMessage({ defaultMessage: 'Buy' })
                : intl.formatMessage({ defaultMessage: 'Sell' }),
            xKey: 'timestamp',
            yKey: 'price',
            rKey: 'amountIn',
            colorFn: (d) =>
              d?.swapType === 'buy'
                ? theme.palette.chart1
                : theme.palette.chart4,
          }}
          tickYFormat={(d: NumberLike) =>
            intl.formatNumber(Number(d), { maximumFractionDigits: 4 })
          }
        />
      )}
    </Card>
  );
};
