import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useArmDailyStatsQuery } from '@origin/defi/shared';
import {
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
import { div, toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
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
  const [limit, setLimit] = useState<number | undefined>(182);
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
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useArmDailyStatsQuery(
    { limit },
    {
      select: (data) => {
        return (
          data?.armDailyStats
            ?.map((s) => {
              const value = div(
                [
                  BigInt(s?.outstandingAssets1 ?? 0),
                  tokens.mainnet.stETH.decimals,
                ],
                [BigInt(s?.totalAssets ?? 0), tokens.mainnet.stETH.decimals],
              );

              return {
                timestamp: new Date(s.timestamp).getTime(),
                discounted: toNumber(value) * 100,
              };
            })
            .toReversed() ?? []
        );
      },
    },
  );

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'WETH liquidity available for withdrawals depends on how much WETH vs. stETH the vault owns. Most often, depositors can withdraw their ETH from the vault instantly. In some cases, they may need to wait for stETH to complete the withdrawal cycle.',
            })}
          >
            {intl.formatMessage({
              defaultMessage: 'Discounted stETH ownership',
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
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {intl.formatNumber(activeItem?.discounted ?? 0)}%
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
              label: 'Discounted stETH',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: 'discounted',
              color: theme.palette.primary.main,
              curveType: 'step',
            },
          ]}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          yScaleDomain={[0, 100]}
          tickYFormat={(value) => `${value}%`}
        />
      )}
    </Card>
  );
};
