import { useState } from 'react';

import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { CurrencyLabel, LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { LineChart } from '../Charts';
import { ChartTooltip } from '../ChartTooltip';
import { LimitControls, TrailingControls } from '../Controls';
import { Spinner } from '../Spinner';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { Trailing } from '../Controls';

type SupportedCurrency = 'ETH' | 'USD';

export type RateCardProps = {
  token: Token;
  currency: SupportedCurrency;
  height: number;
  from?: string;
} & CardProps;

export const RateCard = ({
  token,
  currency,
  height,
  from,
  ...rest
}: RateCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [trailing, setTrailing] = useState<Trailing>('apy30');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage({ defaultMessage: 'Exchange rate' })}
            </Typography>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage(
                { defaultMessage: '{currency}{rate}' },
                {
                  currency: <CurrencyLabel currency={currency} />,
                  rate: intl.formatNumber(
                    currency === 'ETH'
                      ? (activeItem?.rateETH ?? 0)
                      : (activeItem?.rateUSD ?? 0),
                    {
                      maximumFractionDigits: 5,
                    },
                  ),
                },
              )}
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <TrailingControls trailing={trailing} setTrailing={setTrailing} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          width={width}
          height={height}
          series={[
            {
              label: 'Exchange rate',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: currency === 'ETH' ? 'rateETH' : 'rateUSD',
              color: [theme.palette.chart1, theme.palette.chart2],
              curveType: 'linear',
            },
          ]}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
          yScaleDomain={[0.95, 1.05]}
        />
      )}
    </Card>
  );
};
