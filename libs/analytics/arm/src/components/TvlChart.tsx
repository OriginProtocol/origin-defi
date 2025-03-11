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
  CurrencyControls,
  CurrencyLabel,
  ExpandablePanel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import dayjs from 'dayjs';
import { toNumber } from 'dnum';
import { last, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ArmDailyStatsQuery } from '@origin/analytics/shared';
import type { Currency } from '@origin/shared/components';

export type TvlChartProps = {
  height: number;
} & CardProps;

export const TvlChart = ({ height, ...rest }: TvlChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [currency, setCurrency] = useState<Currency>('ETH');
  const [limit, setLimit] = useState<number | undefined>(30);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data, isLoading } = useArmDailyStatsQuery(
    { offset: 1 },
    {
      select: useCallback(
        (data: ArmDailyStatsQuery) => {
          const mapped =
            data?.armDailyStats
              ?.map((s) => {
                const totalSupplyETH = toNumber([
                  BigInt(s?.totalSupply ?? 0),
                  tokens.mainnet['ARM-WETH-stETH'].decimals,
                ]);
                const totalSupplyUSD = totalSupplyETH * s.rateUSD;

                return {
                  timestamp: +dayjs.utc(s.timestamp),
                  totalSupplyETH,
                  totalSupplyUSD,
                };
              })
              .toReversed() ?? [];

          return limit ? takeLast(limit ?? 365, mapped) : mapped;
        },
        [limit],
      ),
    },
  );

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card
      {...rest}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
      <Divider />
      <CardContent sx={{ minHeight: 120 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(
                activeItem?.[
                  currency === 'USD' ? 'totalSupplyUSD' : 'totalSupplyETH'
                ] ?? 0,
              )}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <CurrencyControls currency={currency} setCurrency={setCurrency} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage({ defaultMessage: 'TVL' })}
        >
          {({ width, height: containerHeight }) => (
            <LineChart
              width={width}
              height={containerHeight}
              data={data ?? []}
              series={[
                {
                  label: 'TVL',
                  xKey: 'timestamp',
                  yKey:
                    currency === 'USD' ? 'totalSupplyUSD' : 'totalSupplyETH',
                  color: [theme.palette.chart1, theme.palette.chart2],
                  curveType: 'base',
                },
              ]}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              tickYFormat={(value) =>
                intl.formatNumber(Number(value), {
                  notation: 'compact',
                })
              }
              tooltipLabels={[
                {
                  label: (d) => dayjs.utc(d.timestamp).format('DD MMM'),
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'TVL',
                  }),
                  value: (d) =>
                    intl.formatNumber(
                      d[
                        currency === 'USD' ? 'totalSupplyUSD' : 'totalSupplyETH'
                      ],
                    ),
                  color: [theme.palette.chart1, theme.palette.chart2],
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
