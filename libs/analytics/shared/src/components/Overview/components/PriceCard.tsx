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
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { CHART_HEADER_HEIGHT } from '../constants';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type PriceCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const PriceCard = ({ token, height, from, ...rest }: PriceCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];
  const currency = config?.currency ?? 'ETH';

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
    currency,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  const yKey = `rate${currency}` as const;

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
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency={currency}>
                {intl.formatNumber(activeItem?.[yKey] ?? 0, {
                  maximumFractionDigits: 5,
                })}
              </CurrencyLabel>
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
              yKey,
              color: theme.palette.chart2,
              curveType: 'linear',
              strokeWidth: 2,
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
                intl.formatNumber(d[yKey], {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }),
              color: theme.palette.chart2,
              currency,
            },
          ]}
        />
      )}
    </Card>
  );
};
