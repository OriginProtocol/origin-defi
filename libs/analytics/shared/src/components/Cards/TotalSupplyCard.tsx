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
  ChartTooltip,
  CurrencyLabel,
  LimitControls,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { CHART_HEADER_HEIGHT } from './constants';

import type { CardProps } from '@mui/material';
import type { YKey } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

import type { ChartResult } from '../../hooks';

export type TotalSupplyCardProps = {
  token: Token;
  height: number;
  from?: string;
  currency?: 'ETH' | 'USD';
} & CardProps;

export const TotalSupplyCard = ({
  token,
  height,
  from,
  currency,
  ...rest
}: TotalSupplyCardProps) => {
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
  });

  const series = [
    {
      key: 'circulatingSupply',
      label: intl.formatMessage({ defaultMessage: 'Circulating supply' }),
      fillColor: [
        alpha(theme.palette.chart1, 0.4),
        alpha(theme.palette.chart2, 0.4),
      ],
      lineColor: [theme.palette.chart1, theme.palette.chart2],
    },
    {
      key: 'protocolOwnedSupply',
      label: intl.formatMessage({ defaultMessage: 'Protocol owned' }),
      fillColor: alpha(theme.palette.chart5, 0.4),
      lineColor: theme.palette.chart5,
    },
  ] as YKey<ChartResult>[];
  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Total supply' })}
      />
      <Divider />
      <CardContent sx={{ minHeight: CHART_HEADER_HEIGHT }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(activeItem?.totalSupply ?? 0)}
            </LoadingLabel>
          </Stack>
          <LimitControls limit={limit} setLimit={setLimit} />
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
              sx={{ minWidth: 260 }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: Array.isArray(s.lineColor)
                    ? `linear-gradient(90deg, ${s?.lineColor?.[0] ?? theme.palette.chart1}, ${s?.lineColor?.[1] ?? s?.lineColor?.[0] ?? theme.palette.chart2});`
                    : s?.lineColor,
                }}
              />
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medimum' }}
              >
                {s?.label ?? 'Serie'}
              </Typography>
              <Typography variant="caption1" sx={{ fontWeight: 'bold' }}>
                {intl.formatNumber((activeItem?.[s.key] as number) ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
              </Typography>
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medimum' }}
              >
                •
              </Typography>
              <Typography variant="caption1">
                {intl.formatNumber(
                  activeItem?.totalSupply === 0
                    ? 0
                    : (activeItem?.[s.key] as number) /
                        (activeItem?.totalSupply as number),
                  { style: 'percent', maximumFractionDigits: 2 },
                )}
              </Typography>
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
          serie={data ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          xKey="timestamp"
          yKeys={series}
          curveType="base"
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
