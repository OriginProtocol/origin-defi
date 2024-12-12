import { useState } from 'react';

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
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

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
    { limit, offset: 1 },
    {
      select: (data) => {
        return (
          data?.armDailyStats
            ?.map((s) => ({
              timestamp: toZonedTime(s.date, 'UTC').getTime(),
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
    <Card
      {...rest}
      ref={ref}
      sx={[{ height: 1 }, ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
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
              color: [theme.palette.chart1, theme.palette.chart2],
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
