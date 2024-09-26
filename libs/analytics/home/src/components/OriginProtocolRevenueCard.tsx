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
  AreaChart,
  ChartTooltip,
  CurrencyControls,
  LimitControls,
  Spinner,
  useOriginStats,
} from '@origin/analytics/shared';
import { CurrencyLabel, LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ChartResult } from '@origin/analytics/shared';

export type OriginProtocolRevenueCardProps = {
  height: number;
} & CardProps;

export const OriginProtocolRevenueCard = ({
  height,
  ...rest
}: OriginProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [feesKey, setFeesKey] =
    useState<Extract<keyof ChartResult, 'feesETH' | 'feesUSD'>>('feesETH');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOriginStats(limit, {
    select: (data) =>
      data.map((d) => ({
        timestamp: d.total.timestamp,
        total: d.total[feesKey],
        oeth: d.oeth[feesKey],
        ousd: d.ousd[feesKey],
        superOeth: d.superOeth[feesKey],
      })),
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Total protocol revenue' })}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <LoadingLabel
              isLoading={isLoading}
              color="text.secondary"
              sx={{ fontWeight: 'bold' }}
            >
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              variant="body1"
              isLoading={isLoading}
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency={feesKey === 'feesETH' ? 'ETH' : 'USD'} />
              {intl.formatNumber(activeItem?.total ?? 0, {
                maximumFractionDigits: 0,
              })}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <CurrencyControls
              currency={feesKey === 'feesETH' ? 'ETH' : 'USD'}
              setCurrency={(c) => {
                setFeesKey(c === 'ETH' ? 'feesETH' : 'feesUSD');
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <AreaChart
          width={width}
          height={height}
          serie={data ?? []}
          xKey="timestamp"
          yKeys={[
            {
              key: 'ousd',
              strokeColor: [theme.palette.chart1],
              fillColor: [theme.palette.chart1],
            },
            {
              key: 'oeth',
              strokeColor: [theme.palette.chart6, theme.palette.chart2],
              fillColor: [theme.palette.chart6, theme.palette.chart2],
            },
            {
              key: 'superOeth',
              strokeColor: [theme.palette.chart7, theme.palette.chart5],
              fillColor: [theme.palette.chart7, theme.palette.chart5],
            },
            // {
            //   key: 'total',
            //   strokeColor: [theme.palette.chart6, theme.palette.chart7],
            //   fillColor: [theme.palette.chart6, theme.palette.chart7],
            // },
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
          curveType="base"
        />
      )}
    </Card>
  );
};
