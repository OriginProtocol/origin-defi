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
  ChartTooltip,
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

import { useArmDailyStatsQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { NumberLike } from '@visx/scale';

export type ApyChartProps = {
  token: Token;
  height: number;
} & CardProps;

export const ApyChart = ({ token, height, ...rest }: ApyChartProps) => {
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
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {intl.formatNumber(activeItem?.apy ?? 0)}%
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
              label: 'APY',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: 'apy',
              color: theme.palette.primary.main,
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
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const TvlChart = ({ token, height, from, ...rest }: TvlChartProps) => {
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
              {intl.formatNumber(activeItem?.totalSupply ?? 0)}
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
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const OwnershipChart = ({
  token,
  height,
  from,
  ...rest
}: OwnershipChartProps) => {
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
              outstandingAssets1: toNumber([
                BigInt(s?.outstandingAssets1 ?? 0),
                tokens.mainnet.stETH.decimals,
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
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Discounted stETH ownership',
        })}
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
              {intl.formatNumber(activeItem?.outstandingAssets1 ?? 0)}
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
              yKey: 'outstandingAssets1',
              color: theme.palette.primary.main,
              curveType: 'step',
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
