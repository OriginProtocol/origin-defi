import { useState } from 'react';

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
  AreaChart,
  ChartTooltip,
  LimitControls,
  Spinner,
} from '@origin/analytics/shared';
import { CurrencyLabel, LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useOethDistribution } from '../hooks';

import type { CardProps } from '@mui/material';
import type { YKey } from '@origin/analytics/shared';

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
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOethDistribution(limit);

  const series = [
    {
      key: 'mainnet',
      label: intl.formatMessage({ defaultMessage: 'Ethereum' }),
      fillColor: [theme.palette.chart1, theme.palette.chart2],
    },
    {
      key: 'arbitrum',
      label: intl.formatMessage({ defaultMessage: 'Arbitrum' }),
      fillColor: [theme.palette.chart6, theme.palette.chart5],
    },
  ] as YKey<TvlCombined>[];
  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

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
          <Stack spacing={0.5}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber(activeItem?.total ?? 0)}
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
              sx={{ minWidth: 220 }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: `linear-gradient(90deg, ${s?.fillColor?.[0] ?? theme.palette.chart1}, ${s?.fillColor?.[1] ?? s?.fillColor?.[0] ?? theme.palette.chart2});`,
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
                  activeItem?.total === 0
                    ? 0
                    : (activeItem?.[s.key] as number) /
                        (activeItem?.total as number),
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
          yKeys={[
            {
              key: 'mainnet',
              fillColor: [theme.palette.chart1, theme.palette.chart2],
            },
            {
              key: 'arbitrum',
              fillColor: [theme.palette.chart6, theme.palette.chart5],
            },
          ]}
          curveType="base"
          Tooltip={ChartTooltip}
          yScaleDomain={[20000, 42000]}
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
