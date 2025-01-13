import { useState } from 'react';

import {
  alpha,
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
  AreaChart,
  CurrencyControls,
  CurrencyLabel,
  LimitControls,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useOethDistribution } from '../hooks';

import type { CardProps } from '@mui/material';
import type { Currency, YKey } from '@origin/shared/components';

import type { TvlCombined } from '../hooks';

export type OethDistributionCardProps = {
  height: number;
  from?: string;
} & CardProps;

export const OethDistributionCard = ({
  height,
  from,
  ...rest
}: OethDistributionCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [currency, setCurrency] = useState<Currency>('ETH');
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOethDistribution(limit);

  const series = [
    {
      key: currency === 'ETH' ? 'arbitrumETH' : 'arbitrumUSD',
      label: intl.formatMessage({ defaultMessage: 'Arbitrum' }),
      lineColor: theme.palette.chart5,
      fillColor: alpha(theme.palette.chart5, 0.4),
    },
    {
      key: currency === 'ETH' ? 'baseETH' : 'baseUSD',
      label: intl.formatMessage({ defaultMessage: 'Base' }),
      lineColor: theme.palette.chart3,
      fillColor: alpha(theme.palette.chart3, 0.4),
    },
    {
      key: currency === 'ETH' ? 'mainnetETH' : 'mainnetUSD',
      label: intl.formatMessage({ defaultMessage: 'Ethereum' }),
      lineColor: [theme.palette.chart1, theme.palette.chart2],
      fillColor: [
        alpha(theme.palette.chart1, 0.4),
        alpha(theme.palette.chart2, 0.4),
      ],
    },
  ] as YKey<TvlCombined>[];
  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];
  const activeTotal =
    currency === 'ETH'
      ? (activeItem?.totalETH ?? 0)
      : (activeItem?.totalUSD ?? 0);

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Network distribution' })}
      />
      <Divider />
      <CardContent>
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
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(activeTotal)}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
            <LimitControls limit={limit} setLimit={setLimit} />
            <CurrencyControls currency={currency} setCurrency={setCurrency} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, pt: 1 }}
          useFlexGap
        >
          {series.map((s) => (
            <Stack
              key={s.key}
              direction="row"
              spacing={1}
              sx={{ minWidth: 220 }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: Array.isArray(s.lineColor)
                    ? `linear-gradient(90deg, ${s?.lineColor?.[0] ?? theme.palette.chart1}, ${s?.lineColor?.[1] ?? s?.lineColor?.[0] ?? theme.palette.chart2});`
                    : s.lineColor,
                }}
              />
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medimum' }}
              >
                {s?.label ?? 'Serie'}
              </Typography>
              <LoadingLabel variant="caption1" sx={{ fontWeight: 'bold' }}>
                {intl.formatNumber((activeItem?.[s.key] as number) ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
              </LoadingLabel>
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medium' }}
              >
                •
              </Typography>
              <LoadingLabel isLoading={isLoading} variant="caption1">
                {intl.formatNumber(
                  activeTotal === 0
                    ? 0
                    : (activeItem?.[s.key] as number) / (activeTotal as number),
                  { style: 'percent', maximumFractionDigits: 2 },
                )}
              </LoadingLabel>
            </Stack>
          ))}
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <AreaChart
          width={width}
          height={height}
          data={data ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          xKey="timestamp"
          yKeys={series}
          curveType="base"
          showGrid
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              notation: 'compact',
            })
          }
          tooltipLabels={[
            {
              label: (d) => dayjs.utc(d?.timestamp).format('DD MMM'),
            },
            ...series.map((s) => ({
              label: s.label,
              value: (d: TvlCombined) =>
                intl.formatNumber(d?.[s.key] ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                }),
              color: s.lineColor,
              currency,
            })),
          ]}
        />
      )}
    </Card>
  );
};
