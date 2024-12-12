import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { ChartTooltip } from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
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
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber(activeItem?.tradingVolumeETH ?? 0)}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
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
              label: intl.formatMessage({
                defaultMessage: 'Trading Volume',
              }),
              data: data ?? [],
              xKey: 'timestamp',
              yKey: 'tradingVolumeETH',
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
              notation: 'compact',
            })
          }
        />
      )}
    </Card>
  );
};
