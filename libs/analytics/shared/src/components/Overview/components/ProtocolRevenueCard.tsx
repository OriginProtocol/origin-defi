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
  LimitControls,
  LoadingLabel,
  MovingAvgControls,
  Spinner,
} from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import { useMeasure } from '@react-hookz/web';
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

export type ProtocolRevenueCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const ProtocolRevenueCard = ({
  token,
  height,
  from,
  ...rest
}: ProtocolRevenueCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [currency, setCurrency] = useState<Currency>(config.currency);
  const [limit, setLimit] = useState<number | undefined>(
    config?.protocolRevenueCardDefaultLimit ?? 182,
  );
  const [ma, setMa] = useState<MovingAvg>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data: feesData, isLoading: isFeesLoading } = useTokenChartStats(
    {
      token,
      limit,
      from: from ?? config?.from,
      offset: 1,
      currency,
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
            feesMovingAvg7Days: averages[0][i],
            feesMovingAvg30Days: averages[1][i],
          }));
        },
        [currency],
      ),
    },
  );

  const width = measures?.width ?? 0;
  const activeItem =
    hoverIdx === null ? last(feesData ?? []) : feesData?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Protocol revenue',
        })}
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
              <CurrencyLabel currency={currency}>
                {intl.formatNumber(
                  currency === 'USD'
                    ? (activeItem?.feesUSD ?? 0)
                    : (activeItem?.feesETH ?? 0),
                )}
              </CurrencyLabel>
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <Stack direction="row" spacing={1}>
              <CurrencyControls
                currency={currency}
                setCurrency={setCurrency}
                options={config?.currencyOptions}
              />
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
              <CurrencyLabel currency={currency}>
                {intl.formatNumber((activeItem?.[ma] as number) ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
              </CurrencyLabel>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      {isFeesLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <BarChart
          width={width}
          height={height}
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
            `${currency === 'ETH' ? 'Ξ' : currency === 'USD' ? '$' : ''}${value as number}${currency === 'S' ? ' S' : ''}`
          }
          barColor={theme.palette.chart7}
          activeBarColor={theme.palette.chart3}
          tooltipLabels={[
            {
              label: (d) => dayjs.utc(d?.timestamp).format('DD MMM'),
            },
            {
              label: 'Protocol revenue',
              value: (d) =>
                intl.formatNumber(currency === 'USD' ? d.feesUSD : d.feesETH, {
                  notation: 'compact',
                }),
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
              currency,
              color: [theme.palette.chart5, theme.palette.chart2],
            },
          ]}
        />
      )}
    </Card>
  );
};
