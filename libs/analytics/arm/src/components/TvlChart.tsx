import { useCallback, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { ChartTooltip, useArmDailyStatsQuery } from '@origin/analytics/shared';
import {
  CurrencyControls,
  CurrencyLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { toNumber } from 'dnum';
import { last, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ArmDailyStatsQuery } from '@origin/analytics/shared';

export type TvlChartProps = {
  height: number;
} & CardProps;

export const TvlChart = ({ height, ...rest }: TvlChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [currency, setCurrency] = useState<'ETH' | 'USD'>('ETH');
  const [limit, setLimit] = useState<number | undefined>(30);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
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
                  timestamp: toZonedTime(s.date, 'UTC').getTime(),
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

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card
      {...rest}
      ref={ref}
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
              {formatInTimeZone(
                toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
                'UTC',
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(
                activeItem?.[
                  currency === 'ETH' ? 'totalSupplyETH' : 'totalSupplyUSD'
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
        <Spinner sx={{ height }} />
      ) : (
        <LineChart
          width={width}
          height={height}
          series={[
            {
              label: 'TVL',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: currency === 'ETH' ? 'totalSupplyETH' : 'totalSupplyUSD',
              color: [theme.palette.chart1, theme.palette.chart2],
              curveType: 'base',
            },
          ]}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              notation: 'compact',
            })
          }
        />
      )}
    </Card>
  );
};
