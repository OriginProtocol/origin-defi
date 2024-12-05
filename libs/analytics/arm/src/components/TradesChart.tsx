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
import { ChartTooltip } from '@origin/analytics/shared';
import { BubbleChart, LimitControls, Spinner } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useIntl } from 'react-intl';

import { useArmTrades } from '../hooks';

import type { CardProps } from '@mui/material';
import type { BubbleSerie } from '@origin/shared/components';

import type { ArmTradeData } from '../hooks';
export type TradesChartProps = {
  height: number;
} & CardProps;

export const TradesChart = ({ height, ...rest }: TradesChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(3);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmTrades();

  const series: BubbleSerie<ArmTradeData>[] = [
    {
      data: data?.buy ?? [],
      label: intl.formatMessage({ defaultMessage: 'Buy' }),
      xKey: 'timestamp',
      yKey: 'price',
      rKey: 'amountIn',
      color: [theme.palette.chart5, theme.palette.chart4],
    },
    {
      data: data?.sell ?? [],
      label: intl.formatMessage({ defaultMessage: 'Sell' }),
      xKey: 'timestamp',
      yKey: 'price',
      rKey: 'amountIn',
      color: [theme.palette.chart1, theme.palette.chart2],
    },
  ];

  const width = measures?.width ?? 0;

  const dateStart = format(
    toZonedTime(subDays(new Date(), limit ?? 365), 'UTC'),
    'dd MMM yyyy',
  );
  const dateEnd = format(toZonedTime(new Date(), 'UTC'), 'dd MMM yyyy');

  return (
    <Card
      {...rest}
      ref={ref}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Trades Buy/Sell' })}
      />
      <Divider />
      <CardContent sx={{ minHeight: 120 }}>
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
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ height }} />
      ) : (
        <BubbleChart
          width={width}
          height={height}
          series={series}
          onHover={(idx) => setHoverIdx(idx)}
          Tooltip={ChartTooltip}
        />
      )}
    </Card>
  );
};
