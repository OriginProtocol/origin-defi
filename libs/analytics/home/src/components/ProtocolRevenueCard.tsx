import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import {
  oTokenConfig,
  useArmDailyStatsQuery,
  useTokensChartStats,
} from '@origin/analytics/shared';
import {
  CurrencyLabel,
  ExpandablePanel,
  LoadingLabel,
  Spinner,
  StackedBarChart,
} from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import dayjs from 'dayjs';
import { mul, toNumber } from 'dnum';
import { last, pluck } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { YKeyStackedBar } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type ProtocolRevenueCardProps = {
  height: number;
} & CardProps;

type Item = {
  timestamp: number;
  oeth?: number;
  os?: number;
  ousd?: number;
  superOeth?: number;
  arm?: number;
  total: number;
  avg: number;
};

export const ProtocolRevenueCard = ({
  height,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { limit, offset, currency, from, to } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data: tokens, isLoading: isTokensLoading } = useTokensChartStats(
    limit,
    from || to ? 0 : offset,
    from ? from.toISOString() : undefined,
    to ? to.toISOString() : undefined,
  );
  const { data: arms, isLoading: isArmLoading } = useArmDailyStatsQuery(
    {
      limit,
      offset,
    },
    {
      select: (data) =>
        data.armDailyStats.map((d) => {
          const rateUSD = d.rateUSD;
          const feesETH = [BigInt(d?.fees ?? 0), 18] as Dnum;

          return {
            timestamp: d.timestamp,
            date: d.date,
            feesETH: toNumber(feesETH),
            feesUSD: toNumber(mul(feesETH, rateUSD)),
          };
        }),
    },
  );

  const serie = useMemo(() => {
    const serie: Item[] = [];
    for (let i = 0; i < (tokens?.totals?.length ?? 0); i++) {
      const oeth = tokens?.['1:OETH'][i];
      const os = tokens?.['146:OS'][i];
      const ousd = tokens?.['1:OUSD'][i];
      const superOeth = tokens?.['8453:superOETHb'][i];
      const arm = arms?.find((a) => a.date === oeth?.date) ?? {
        timestamp: oeth?.timestamp ?? 0,
        date: oeth?.date ?? '',
        feesETH: 0,
        feesUSD: 0,
      };
      const total = tokens?.totals[i];
      const totals = {
        ...(total ?? {}),
        feesUSD: (total?.feesUSD ?? 0) + arm.feesUSD,
        feesETH: (total?.feesETH ?? 0) + arm.feesETH,
      };

      serie.push({
        timestamp: oeth?.timestamp ?? 0,
        oeth: currency === 'USD' ? oeth?.feesUSD : oeth?.feesETH,
        ousd: currency === 'USD' ? ousd?.feesUSD : ousd?.feesETH,
        os: currency === 'USD' ? os?.feesUSD : os?.feesETH,
        superOeth: currency === 'USD' ? superOeth?.feesUSD : superOeth?.feesETH,
        arm: currency === 'USD' ? arm?.feesUSD : arm?.feesETH,
        total: currency === 'USD' ? totals?.feesUSD : totals?.feesETH,
        avg: 0,
      });
    }

    const feesAverages = movingAverages(pluck('total', serie), [7]);

    return serie.map((a, i) => ({ ...a, avg: feesAverages[0][i] }));
  }, [arms, currency, tokens]);

  const series: YKeyStackedBar<Item>[] = [
    {
      key: 'oeth',
      label: 'Origin Ether',
      fillColor: oTokenConfig['1:OETH'].lineChartColor,
    },
    {
      key: 'os',
      label: 'Origin Sonic',
      fillColor: oTokenConfig['146:OS'].lineChartColor,
    },
    {
      key: 'ousd',
      label: 'Origin Dollar',
      fillColor: oTokenConfig['1:OUSD'].lineChartColor,
    },
    {
      key: 'superOeth',
      label: 'Super OETH',
      fillColor: oTokenConfig['8453:superOETHb'].lineChartColor,
    },
    {
      key: 'arm',
      label: 'ARM',
      fillColor: oTokenConfig['1:ARM-WETH-stETH'].lineChartColor,
    },
  ];

  const margins = { top: 5, left: 25, right: 60, bottom: 50 };
  const activeItem = hoverIdx === null ? last(serie ?? []) : serie?.[hoverIdx];
  const isLoading = isTokensLoading || isArmLoading;

  return (
    <Card {...rest}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Protocol Revenue',
        })}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          spacing={0.5}
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <LoadingLabel
            isLoading={isLoading}
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(activeItem?.total ?? 0, {
              maximumFractionDigits: 3,
            })}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage({ defaultMessage: 'Protocol Revenue' })}
        >
          {({ width, height: containerHeight }) => (
            <StackedBarChart
              height={containerHeight}
              width={width}
              data={serie}
              xKey="timestamp"
              yKeys={series}
              tickYFormat={(value: NumberLike) =>
                currency === 'USD'
                  ? `$${intl.formatNumber(Number(value), {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : `Ξ${intl.formatNumber(Number(value), {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
              }
              lineData={{
                label: intl.formatMessage({
                  defaultMessage: 'Moving Average',
                }),
                xKey: 'timestamp',
                yKey: 'avg',
                color: [theme.palette.chart5, theme.palette.chart2],
                strokeWidth: 3,
                curveType: 'linear',
              }}
              margins={margins}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              tooltipLabels={[
                { label: (d) => dayjs.utc(d.timestamp).format('DD MMM') },
                ...series.map((s) => ({
                  label: s.label,
                  value: (d: Item) =>
                    intl.formatNumber(d[s.key] ?? 0, {
                      notation: 'compact',
                      maximumFractionDigits: 2,
                    }),
                  color: s.fillColor,
                  currency,
                })),
                {
                  label: intl.formatMessage({ defaultMessage: '7-day avg' }),
                  value: (d: Item) =>
                    intl.formatNumber(d.avg, {
                      notation: 'compact',
                      maximumFractionDigits: 2,
                    }),
                  color: [theme.palette.chart5, theme.palette.chart2],
                  currency,
                },
              ]}
            />
          )}
        </ExpandablePanel>
      )}
    </Card>
  );
};
