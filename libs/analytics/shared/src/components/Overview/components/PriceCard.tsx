import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import {
  CurrencyLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { CHART_HEADER_HEIGHT } from '../constants';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

type SupportedCurrency = 'ETH' | 'USD';

export type PriceCardProps = {
  token: Token;
  currency: SupportedCurrency;
  height: number;
  from?: string;
} & CardProps;

export const PriceCard = ({
  token,
  currency,
  height,
  from,
  ...rest
}: PriceCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
    offset: 1,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage(
          { defaultMessage: '1 {symbol} equals' },
          { symbol: token.symbol },
        )}
      />
      <Divider />
      <CardContent sx={{ minHeight: CHART_HEADER_HEIGHT }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {format(
                toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
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
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          width={width}
          height={height}
          data={data ?? []}
          series={[
            {
              label: 'Exchange rate',
              xKey: 'timestamp',
              yKey: currency === 'ETH' ? 'rateETH' : 'rateUSD',
              color: [theme.palette.chart1, theme.palette.chart2],
              curveType: 'linear',
            },
          ]}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
          yScaleDomain={[0.95, 1.05]}
          tooltipLabels={[
            { label: (d) => dayjs.utc(d.timestamp).format('DD MMM') },
            {
              label: intl.formatMessage({ defaultMessage: 'Exchange rate' }),
              value: (d) =>
                intl.formatNumber(currency === 'ETH' ? d.rateETH : d.rateUSD, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              currency,
            },
          ]}
        />
      )}
    </Card>
  );
};
