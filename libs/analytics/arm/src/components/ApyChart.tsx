import { useCallback, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useArmDailyStatsQuery } from '@origin/analytics/shared';
import {
  BarChart,
  ExpandablePanel,
  InfoTooltip,
  LimitControls,
  LoadingLabel,
  Spinner,
  TrailingControls,
} from '@origin/shared/components';
import { movingAverages } from '@origin/shared/utils';
import dayjs from 'dayjs';
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
  const { data, isLoading } = useArmDailyStatsQuery(
    { offset: 1 },
    {
      select: useCallback(
        (data: ArmDailyStatsQuery) => {
          const dailyStats = data?.armDailyStats?.toReversed() ?? [];
          const apy = dailyStats.map((s) => s.apy * 100);
          const apies = movingAverages(apy, [7, 14, 30]);
          const mapped = dailyStats.map((s, idx) => ({
            timestamp: +dayjs.utc(s.date),
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

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card
      {...rest}
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
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
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
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage({ defaultMessage: 'APY' })}
        >
          {({ width, height: containerHeight }) => (
            <BarChart
              width={width}
              height={containerHeight}
              data={data ?? []}
              xKey="timestamp"
              yKey="apy"
              lineData={{
                xKey: 'timestamp',
                yKey: trailing,
                color: [theme.palette.chart5, theme.palette.chart2],
                strokeWidth: 3,
              }}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              tickYFormat={(value: NumberLike) => `${value}%`}
              barColor={theme.palette.chart7}
              activeBarColor={theme.palette.chart3}
              tooltipLabels={[
                {
                  label: (d) => dayjs.utc(d.timestamp).format('DD MMM'),
                },
                {
                  label: `APY`,
                  value: (d) =>
                    intl.formatNumber(d.apy / 100, {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }),
                  color: theme.palette.chart3,
                },
                {
                  label: `${
                    {
                      apy30: '30d',
                      apy14: '14d',
                      apy7: '7d',
                    }[trailing]
                  } avg APY`,
                  value: (d) =>
                    intl.formatNumber(d[trailing] / 100, {
                      style: 'percent',
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }),
                  color: [theme.palette.chart5, theme.palette.chart2],
                },
              ]}
            />
          )}
        </ExpandablePanel>
      )}
    </Card>
  );
};
