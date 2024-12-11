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
  InfoTooltip,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
  TrailingControls,
} from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { last, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ArmDailyStatsQuery } from '@origin/analytics/shared';
import type { Trailing } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

export type ApyChartProps = {
  height: number;
} & CardProps;

export const ApyChart = ({ height, ...rest }: ApyChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [trailing, setTrailing] = useState<Trailing>('apy30');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmDailyStatsQuery(
    { offset: 1 },
    {
      select: useCallback(
        (data: ArmDailyStatsQuery) => {
          const dailyStats = data?.armDailyStats?.toReversed() ?? [];
          const apy = dailyStats.map((s) => s.apy * 100);
          const apies = movingAverages(apy, [7, 14, 30]);
          const mapped = dailyStats.map((s, idx) => ({
            timestamp: new Date(s.date).getTime(),
            apy: apy[idx],
            apy7: apies[0][idx],
            apy14: apies[1][idx],
            apy30: apies[2][idx],
          }));

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
      <CardHeader title={intl.formatMessage({ defaultMessage: 'APY' })} />
      <Divider />
      <CardContent sx={{ minHeight: 120 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {format(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <LoadingLabel
                isLoading={isLoading}
                variant="body1"
                sx={{ fontWeight: 'bold' }}
              >
                {intl.formatNumber(activeItem?.[trailing] ?? 0)}%
              </LoadingLabel>
              <InfoTooltip
                iconColor="text.primary"
                tooltipLabel={intl.formatMessage({
                  defaultMessage:
                    'There are expected daily fluctuations in APY due to the way the vault earns yield. These will average out over longer time horizons.',
                })}
              />
            </Stack>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <TrailingControls trailing={trailing} setTrailing={setTrailing} />
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
              label: 'APY',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: trailing,
              color: [theme.palette.chart1, theme.palette.chart2],
              curveType: 'base',
            },
          ]}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value: NumberLike) => `${value}%`}
        />
      )}
    </Card>
  );
};
