import { useCallback, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useArmDailyStatsQuery } from '@origin/analytics/shared';
import {
  BarChart,
  CurrencyControls,
  CurrencyLabel,
  LimitControls,
  MovingAvgControls,
  Spinner,
} from '@origin/shared/components';
import { LoadingLabel } from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import { useMeasure } from '@react-hookz/web';
import dayjs from 'dayjs';
import { mul, toNumber } from 'dnum';
import { last, pluck, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ArmDailyStatsQuery } from '@origin/analytics/shared';
import type { MovingAvg } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type TradingProfitChartProps = {
  height: number;
} & CardProps;

export const TradingProfitChart = ({
  height,
  ...rest
}: TradingProfitChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [currency, setCurrency] = useState<'ETH' | 'USD'>('ETH');
  const [ma, setMa] = useState<MovingAvg>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmDailyStatsQuery(
    {
      offset: 1,
    },
    {
      select: useCallback(
        (data: ArmDailyStatsQuery) => {
          const mapped = data.armDailyStats.toReversed().map((d) => {
            const rateUSD = d.rateUSD;
            const feesETH = [BigInt(d?.fees ?? 0), 18] as Dnum;

            return {
              timestamp: d.timestamp,
              date: d.date,
              feesETH: toNumber(feesETH) * 5,
              feesUSD: toNumber(mul(feesETH, rateUSD)) * 5,
            };
          });

          const feesAveragesETH = movingAverages(
            pluck('feesETH', mapped),
            [7, 30],
          );
          const feesAveragesUSD = movingAverages(
            pluck('feesUSD', mapped),
            [7, 30],
          );

          const res = mapped.map((m, i) => ({
            ...m,
            feesMovingAvg7DaysETH: feesAveragesETH[0][i],
            feesMovingAvg30DaysETH: feesAveragesETH[1][i],
            feesMovingAvg7DaysUSD: feesAveragesUSD[0][i],
            feesMovingAvg30DaysUSD: feesAveragesUSD[1][i],
          }));

          return limit ? takeLast(limit ?? 365, res) : res;
        },
        [limit],
      ),
    },
  );

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];
  const fees = currency === 'USD' ? activeItem?.feesUSD : activeItem?.feesETH;

  return (
    <Card
      {...rest}
      ref={ref}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Trading Profit',
        })}
      />
      <Divider />
      <CardContent sx={{ minHeight: 150 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Stack
            spacing={0.5}
            sx={{
              alignItems: 'flex-start',
            }}
          >
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <LoadingLabel
              variant="body1"
              isLoading={isLoading}
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(fees ?? 0, {
                maximumFractionDigits: 3,
              })}
            </LoadingLabel>
          </Stack>
          <Stack
            spacing={0.5}
            sx={{
              alignItems: 'flex-end',
            }}
          >
            <LimitControls limit={limit} setLimit={setLimit} />
            <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end' }}>
              <MovingAvgControls ma={ma} setMa={setMa} />
              <CurrencyControls currency={currency} setCurrency={setCurrency} />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <BarChart
          width={width}
          height={height}
          data={data ?? []}
          xKey="timestamp"
          yKey={currency === 'USD' ? 'feesUSD' : 'feesETH'}
          lineData={{
            label: intl.formatMessage({
              defaultMessage: 'Moving Average',
            }),
            xKey: 'timestamp',
            yKey: `${ma}${currency}`,
            color: [theme.palette.chart5, theme.palette.chart2],
            strokeWidth: 3,
            curveType: 'linear',
          }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'USD' ? '$' : 'Ξ'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
          barColor={theme.palette.chart3}
          activeBarColor={theme.palette.chart8}
          tooltipLabels={[
            {
              label: (d) => dayjs.utc(d.timestamp).format('DD MMM'),
            },
            {
              label: 'Fees',
              value: (d) =>
                intl.formatNumber(currency === 'USD' ? d.feesUSD : d.feesETH, {
                  notation: 'compact',
                }),
              currency,
              color: theme.palette.chart3,
            },
            {
              label: `${
                {
                  feesMovingAvg30Days: '30d',
                  feesMovingAvg7Days: '7d',
                }[ma]
              } avg`,
              value: (d) =>
                intl.formatNumber(d[`${ma}${currency}`] / 100, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }),
              color: [theme.palette.chart5, theme.palette.chart2],
            },
            {
              label: intl.formatMessage({
                defaultMessage: '20% of those revenues are protocol fees',
              }),
            },
          ]}
        />
      )}
    </Card>
  );
};
