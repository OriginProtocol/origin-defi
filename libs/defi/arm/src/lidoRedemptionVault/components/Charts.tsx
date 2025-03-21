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
import { useArmDailyStatsQuery } from '@origin/defi/shared';
import {
  AreaChart,
  ExpandablePanel,
  InfoTooltip,
  InfoTooltipLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
  TrailingControls,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { movingAverages } from '@origin/shared/utils';
import dayjs from 'dayjs';
import { toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { Trailing, YKey } from '@origin/shared/components';
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
    { limit, offset: 1 },
    {
      select: (data) => {
        const dailyStats = data?.armDailyStats?.toReversed() ?? [];
        const apy = dailyStats.map((s) => s.apy * 100);
        const apies = movingAverages(apy, [7, 14, 30]);

        return dailyStats.map((s, idx) => ({
          timestamp: +dayjs
            .utc(s.timestamp)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0),
          apy: apy[idx],
          apy7: apies[0][idx],
          apy14: apies[1][idx],
          apy30: apies[2][idx],
        }));
      },
    },
  );

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'APY' })} />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {activeItem?.timestamp
                ? dayjs.utc(activeItem.timestamp).format('DD MMM YYYY')
                : dayjs.utc().format('DD MMM YYYY')}
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
            <LineChart
              width={width}
              height={containerHeight}
              data={data ?? []}
              series={[
                {
                  label: 'APY',
                  xKey: 'timestamp',
                  yKey: trailing,
                  color: theme.palette.primary.main,
                  curveType: 'base',
                },
              ]}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              tickYFormat={(value: NumberLike) => `${value}%`}
              tooltipLabels={[
                { label: (d) => dayjs.utc(d.timestamp).format('DD MMM') },
                {
                  label: 'APY',
                  value: (d) =>
                    `${intl.formatNumber(d.apy, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`,
                  color: theme.palette.primary.main,
                },
              ]}
            />
          )}
        </ExpandablePanel>
      )}
    </Card>
  );
};

export type TvlChartProps = {
  height: number;
} & CardProps;

export const TvlChart = ({ height, ...rest }: TvlChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data, isLoading } = useArmDailyStatsQuery(
    { limit, offset: 1 },
    {
      select: (data) => {
        return (
          data?.armDailyStats
            ?.map((s) => ({
              timestamp: +dayjs
                .utc(s.timestamp)
                .hour(0)
                .minute(0)
                .second(0)
                .millisecond(0),
              totalSupply: toNumber([
                BigInt(s?.totalSupply ?? 0),
                tokens.mainnet['ARM-WETH-stETH'].decimals,
              ]),
            }))
            .toReversed() ?? []
        );
      },
    },
  );

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {activeItem?.timestamp
                ? dayjs.utc(activeItem.timestamp).format('DD MMM YYYY')
                : dayjs.utc().format('DD MMM YYYY')}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {intl.formatNumber(activeItem?.totalSupply ?? 0)} ETH
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage({ defaultMessage: 'TVL' })}
        >
          {({ width, height: containerHeight }) => (
            <LineChart
              data={data ?? []}
              width={width}
              height={containerHeight}
              series={[
                {
                  label: 'TVL',
                  xKey: 'timestamp',
                  yKey: 'totalSupply',
                  color: theme.palette.primary.main,
                  curveType: 'base',
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
                  label: 'TVL',
                  value: (d) =>
                    intl.formatNumber(Number(d.totalSupply), {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                    }),
                  color: theme.palette.primary.main,
                },
              ]}
            />
          )}
        </ExpandablePanel>
      )}
    </Card>
  );
};

export type OwnershipChartProps = {
  height: number;
} & CardProps;

export const OwnershipChart = ({ height, ...rest }: OwnershipChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(7);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data, isLoading } = useArmDailyStatsQuery(
    { limit, offset: 1 },
    {
      select: (data) => {
        return (
          data?.armDailyStats
            ?.map((s) => {
              const weth = toNumber([
                BigInt(s?.assets0 ?? 0),
                tokens.mainnet.WETH.decimals,
              ]);
              const steth = toNumber([
                BigInt(s?.assets1 ?? 0),
                tokens.mainnet.stETH.decimals,
              ]);
              const redeemingSteth = toNumber([
                BigInt(s?.outstandingAssets1 ?? 0),
                tokens.mainnet.stETH.decimals,
              ]);
              const total = weth + steth + redeemingSteth;

              return {
                timestamp: +dayjs
                  .utc(s.timestamp)
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .millisecond(0),
                weth,
                steth,
                redeemingSteth,
                total,
              };
            })
            .toReversed() ?? []
        );
      },
    },
  );

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];
  const series = [
    {
      key: 'weth',
      label: 'WETH',
      lineColor: theme.palette.chart4,
      fillColor: alpha(theme.palette.chart4, 0.6),
    },
    {
      key: 'steth',
      label: 'stETH',
      lineColor: theme.palette.chart5,
      fillColor: alpha(theme.palette.chart5, 0.6),
    },
    {
      key: 'redeemingSteth',
      label: 'Redeeming stETH',
      lineColor: theme.palette.chart1,
      fillColor: alpha(theme.palette.chart1, 0.6),
    },
  ] as YKey<{
    timestamp: number;
    weth: number;
    steth: number;
    redeemingSteth: number;
    total: number;
  }>[];

  return (
    <Card {...rest}>
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage: `The amount of Vault-owned assets currently held in WETH, stETH, or Lido's stETH redemption queue.`,
            })}
          >
            {intl.formatMessage({
              defaultMessage: 'Vault Assets',
            })}
          </InfoTooltipLabel>
        }
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <Stack
              direction="row"
              sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, pt: 1 }}
              useFlexGap
            >
              {series
                .filter((s) => !!s.label)
                .map((s) => (
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
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage({ defaultMessage: 'Vault Assets' })}
        >
          {({ width, height: containerHeight }) => (
            <AreaChart
              width={width}
              height={containerHeight}
              data={data ?? []}
              xKey="timestamp"
              yKeys={series}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              curveType="step"
              tickYFormat={(value) =>
                intl.formatNumber(Number(value), {
                  maximumFractionDigits: 2,
                })
              }
              tooltipLabels={[
                {
                  label: (d) => dayjs.utc(d.timestamp).format('DD MMM'),
                },
                ...series.map((s) => ({
                  label: s.label,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value: (d: any) =>
                    intl.formatNumber(Number(d?.[s.key] ?? 0), {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                    }),
                  color: s.lineColor,
                })),
              ]}
            />
          )}
        </ExpandablePanel>
      )}
    </Card>
  );
};
