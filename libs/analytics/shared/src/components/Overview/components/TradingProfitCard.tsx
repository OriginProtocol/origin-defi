import { useCallback, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  CurrencyControls,
  CurrencyLabel,
  ExpandablePanel,
  InfoTooltipLabel,
  LimitControls,
  LoadingLabel,
  MovingAvgControls,
  Spinner,
} from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import dayjs from 'dayjs';
import { last, pluck } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { CHART_HEADER_HEIGHT } from '../constants';

import type { CardProps } from '@mui/material';
import type { Currency, MovingAvg } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

import type { ChartResult } from '../../../hooks';

export type TradingProfitCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const TradingProfitCard = ({
  token,
  height,
  from,
  ...rest
}: TradingProfitCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [currency, setCurrency] = useState<Currency>(config.currency);
  const [limit, setLimit] = useState<number | undefined>(30);
  const [ma, setMa] = useState<MovingAvg>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data: feesData, isLoading: isFeesLoading } = useTokenChartStats(
    {
      token,
      limit,
      from: from ?? config?.from,
      offset: 1,
    },
    {
      select: useCallback(
        (data: ChartResult[]) => {
          const averages = movingAverages(
            pluck(currency === 'USD' ? 'feesUSD' : 'feesETH', data ?? []),
            [7, 30],
          );

          return data?.map((d, i) => ({
            ...d,
            feesETH: d.feesETH * 5,
            feesUSD: d.feesUSD * 5,
            feesMovingAvg7Days: averages[0][i] * 5,
            feesMovingAvg30Days: averages[1][i] * 5,
          }));
        },
        [currency],
      ),
    },
  );

  const activeItem =
    hoverIdx === null ? last(feesData ?? []) : feesData?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                '20% of those amounts are collected as performance fee',
            })}
          >
            {intl.formatMessage(
              {
                defaultMessage: 'Daily Trading Profit',
              },
              { symbol: token.name },
            )}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent sx={{ minHeight: CHART_HEADER_HEIGHT }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isFeesLoading} color="text.secondary">
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isFeesLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(
                currency === 'USD'
                  ? (activeItem?.feesUSD ?? 0)
                  : (activeItem?.feesETH ?? 0),
              )}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <Stack direction="row" spacing={1}>
              <CurrencyControls currency={currency} setCurrency={setCurrency} />
              <MovingAvgControls ma={ma} setMa={setMa} />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}
          useFlexGap
        >
          <Stack direction="row" spacing={1} sx={{ minWidth: 260 }}>
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                background: `linear-gradient(90deg, ${theme.palette.chart5}, ${theme.palette.chart2});`,
              }}
            />
            <Typography
              variant="caption1"
              color="text.secondary"
              sx={{ fontWeight: 'medimum' }}
            >
              {intl.formatMessage({ defaultMessage: 'Moving average' })}
            </Typography>
            <Typography variant="caption1" sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency={currency} />
              {intl.formatNumber((activeItem?.[ma] as number) ?? 0, {
                notation: 'compact',
                minimumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      {isFeesLoading ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage({ defaultMessage: 'Net Asset Value' })}
        >
          {({ width, height: containerHeight }) => (
            <BarChart
              width={width}
              height={containerHeight}
              data={feesData ?? []}
              xKey="timestamp"
              yKey={currency === 'USD' ? 'feesUSD' : 'feesETH'}
              lineData={{
                xKey: 'timestamp',
                yKey: ma,
                color: [theme.palette.chart5, theme.palette.chart2],
                strokeWidth: 3,
              }}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              tickYFormat={(value) =>
                `${currency === 'USD' ? '$' : 'Ξ'}${value as number}`
              }
              barColor={theme.palette.chart7}
              activeBarColor={theme.palette.chart3}
              tooltipLabels={[
                {
                  label: (d) => dayjs.utc(d?.timestamp).format('DD MMM'),
                },
                {
                  label: 'Trading profit',
                  value: (d) =>
                    intl.formatNumber(
                      currency === 'USD' ? d.feesUSD : d.feesETH,
                      {
                        notation: 'compact',
                      },
                    ),
                  color: theme.palette.chart3,
                  currency,
                },
                {
                  label: `${
                    {
                      feesMovingAvg7Days: '7-day',
                      feesMovingAvg30Days: '30-day',
                    }[ma]
                  } avg`,
                  value: (d) =>
                    intl.formatNumber(Number(d?.[ma] ?? 0), {
                      notation: 'compact',
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
