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
  CurrencyControls,
  CurrencyLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useArmTradingVolume } from '../hooks';

import type { CardProps } from '@mui/material';

export type TradingVolumeChartProps = {
  height: number;
} & CardProps;

export const TradingVolumeChart = ({
  height,
  ...rest
}: TradingVolumeChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [currency, setCurrency] = useState<'ETH' | 'USD'>('ETH');
  const [limit, setLimit] = useState<number | undefined>(30);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmTradingVolume(limit);

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card
      {...rest}
      ref={ref}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Total Trading Volume' })}
      />
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
                  currency === 'ETH' ? 'tradingVolumeETH' : 'tradingVolumeUSD'
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
        <LineChart<{
          timestamp: number;
          day: string;
          tradingVolumeETH: number;
          tradingVolumeUSD: number;
          swapVolumeETH: number;
          swapVolumeUSD: number;
        }>
          width={width}
          height={height}
          data={data ?? []}
          series={[
            {
              label: intl.formatMessage({
                defaultMessage: 'Trading Volume',
              }),
              xKey: 'timestamp',
              yKey:
                currency === 'ETH' ? 'tradingVolumeETH' : 'tradingVolumeUSD',
              color: [theme.palette.chart1, theme.palette.chart2],
              curveType: 'linear',
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
              label: (d) => dayjs.utc(d?.timestamp).format('DD MMM'),
            },
            {
              label: intl.formatMessage({ defaultMessage: 'Trading Volume' }),
              value: (d) =>
                intl.formatNumber(
                  (currency === 'ETH'
                    ? d.tradingVolumeETH
                    : d.tradingVolumeUSD) ?? 0,
                  {
                    notation: 'compact',
                  },
                ),
              color: [theme.palette.chart1, theme.palette.chart2],
              currency,
            },
          ]}
        />
      )}
    </Card>
  );
};
