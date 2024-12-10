import { useMemo, useState } from 'react';

import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import {
  ChartTooltip,
  oTokenConfig,
  useArmDailyStatsQuery,
  useTokensChartStats,
} from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LoadingLabel,
  Spinner,
  StackedBarChart,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format, isDate } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { mul, toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type ProtocolRevenueCardProps = {
  height: number;
} & CardProps;

type Item = {
  timestamp: number;
  oeth?: number;
  ousd?: number;
  superOeth?: number;
  arm?: number;
  total?: number;
};

export const ProtocolRevenueCard = ({
  height,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const { limit, offset, currency, from, to } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const width = measures?.width ?? 0;
  const { data: tokens, isLoading: isTokensLoading } = useTokensChartStats(
    limit,
    offset,
    !!from && isDate(from) ? from.toISOString() : undefined,
    !!to && isDate(to) ? to.toISOString() : undefined,
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
        superOeth: currency === 'USD' ? superOeth?.feesUSD : superOeth?.feesETH,
        arm: currency === 'USD' ? arm?.feesUSD : arm?.feesETH,
        total: currency === 'USD' ? totals?.feesUSD : totals?.feesETH,
      });
    }
    return serie;
  }, [arms, currency, tokens]);

  const margins = { top: 5, left: 25, right: 60, bottom: 50 };
  const activeItem = hoverIdx === null ? last(serie ?? []) : serie?.[hoverIdx];
  const isLoading = isTokensLoading || isArmLoading;

  return (
    <Card {...rest} ref={ref}>
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
            {format(
              toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
              'dd MMM yyyy',
            )}
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
        <Spinner sx={{ width, height }} />
      ) : (
        <StackedBarChart
          height={height}
          width={width}
          barData={serie}
          xKey="timestamp"
          yKeys={[
            {
              key: 'oeth',
              label: 'Origin Ether',
              fillColor: oTokenConfig['1:OETH'].lineChartColor,
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
          ]}
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
          margins={margins}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
        />
      )}
    </Card>
  );
};
