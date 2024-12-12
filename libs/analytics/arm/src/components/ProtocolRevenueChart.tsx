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
  ChartTooltip,
  CurrencyControls,
  CurrencyLabel,
  LimitControls,
  MovingAvgControls,
  Spinner,
} from '@origin/shared/components';
import { LoadingLabel } from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { mul, toNumber } from 'dnum';
import { last, pluck } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ArmDailyStatsQuery } from '@origin/analytics/shared';
import type { Currency, MovingAvg } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type ProtocolRevenueChartProps = {
  height: number;
} & CardProps;

export const ProtocolRevenueChart = ({
  height,
  ...rest
}: ProtocolRevenueChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [currency, setCurrency] = useState<Currency>('ETH');
  const [ma, setMa] = useState<MovingAvg>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmDailyStatsQuery(
    {
      limit,
      offset: 1,
    },
    {
      select: useCallback((data: ArmDailyStatsQuery) => {
        const mapped = data.armDailyStats.toReversed().map((d) => {
          const rateUSD = d.rateUSD;
          const feesETH = [BigInt(d?.fees ?? 0), 18] as Dnum;

          return {
            timestamp: d.timestamp,
            date: d.date,
            feesETH: toNumber(feesETH),
            feesUSD: toNumber(mul(feesETH, rateUSD)),
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

        return mapped.map((m, i) => ({
          ...m,
          feesMovingAvg7DaysETH: feesAveragesETH[0][i],
          feesMovingAvg30DaysETH: feesAveragesETH[1][i],
          feesMovingAvg7DaysUSD: feesAveragesUSD[0][i],
          feesMovingAvg30DaysUSD: feesAveragesUSD[1][i],
        }));
      }, []),
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
          defaultMessage: 'Protocol Revenue',
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
              {formatInTimeZone(
                toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
                'UTC',
                'dd MMM yyyy',
              )}
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
          barData={data ?? []}
          xKey="timestamp"
          yKey={currency === 'ETH' ? 'feesETH' : 'feesUSD'}
          lineData={{
            label: intl.formatMessage({
              defaultMessage: 'Moving Average',
            }),
            data: data ?? [],
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
            `${currency === 'ETH' ? 'Ξ' : '$'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
          barColor={theme.palette.chart3}
          activeBarColor={theme.palette.chart8}
          Tooltip={ChartTooltip}
        />
      )}
    </Card>
  );
};
