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
  ChartTooltip,
  InfoTooltip,
  InfoTooltipLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { YKey } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

export type ApyChartProps = {
  height: number;
} & CardProps;

export const ApyChart = ({ height, ...rest }: ApyChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmDailyStatsQuery(
    { limit },
    {
      select: (data) => {
        return (
          data?.armDailyStats
            ?.map((s) => ({
              timestamp: new Date(s.timestamp).getTime(),
              apy: s.apy * 100,
            }))
            .toReversed() ?? []
        );
      },
    },
  );

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'APY' })} />
      <Divider />
      <CardContent>
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
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <LoadingLabel
                isLoading={isLoading}
                variant="body1"
                sx={{ fontWeight: 'bold' }}
              >
                {intl.formatNumber(activeItem?.apy ?? 0)}%
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
              yKey: 'apy',
              color: theme.palette.primary.main,
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

export type TvlChartProps = {
  height: number;
} & CardProps;

export const TvlChart = ({ height, ...rest }: TvlChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmDailyStatsQuery(
    { limit },
    {
      select: (data) => {
        return (
          data?.armDailyStats
            ?.map((s) => ({
              timestamp: new Date(s.timestamp).getTime(),
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
  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
      <Divider />
      <CardContent>
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
        <Spinner sx={{ height }} />
      ) : (
        <LineChart
          width={width}
          height={height}
          series={[
            {
              label: 'TVL',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: 'totalSupply',
              color: theme.palette.primary.main,
              curveType: 'base',
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

export type OwnershipChartProps = {
  height: number;
} & CardProps;

export const OwnershipChart = ({ height, ...rest }: OwnershipChartProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(7);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
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
                timestamp: new Date(s.timestamp).getTime(),
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

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];
  const series = [
    {
      key: 'redeemingSteth',
      label: 'Redeeming stETH',
      lineColor: theme.palette.chart1,
      fillColor: alpha(theme.palette.chart1, 0.6),
    },
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
  ] as YKey<{
    timestamp: number;
    weth: number;
    steth: number;
    redeemingSteth: number;
    total: number;
  }>[];

  return (
    <Card {...rest} ref={ref}>
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
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd MMM yyyy',
              )}
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
        <Spinner sx={{ height }} />
      ) : (
        <AreaChart
          width={width}
          height={height}
          serie={data ?? []}
          xKey="timestamp"
          yKeys={series}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          curveType="step"
          Tooltip={ChartTooltip}
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              maximumFractionDigits: 2,
            })
          }
        />
      )}
    </Card>
  );
};
