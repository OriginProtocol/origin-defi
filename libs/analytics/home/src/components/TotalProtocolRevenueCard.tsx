import { useState } from 'react';

import {
  alpha,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useOriginStats } from '@origin/analytics/shared';
import {
  AreaChart,
  ChartTooltip,
  CurrencyControls,
  CurrencyLabel,
  LimitControls,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { ChartResult } from '@origin/analytics/shared';

export type TotalProtocolRevenueCardProps = {
  height: number;
} & CardProps;

export const TotalProtocolRevenueCard = ({
  height,
  ...rest
}: TotalProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(30);
  const [feesKey, setFeesKey] =
    useState<Extract<keyof ChartResult, 'feesETH' | 'feesUSD'>>('feesETH');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOriginStats(limit, {
    select: (data) =>
      data.map((d) => ({
        timestamp: d.total.timestamp,
        total: d.total[feesKey],
        oeth: d['1:OETH'][feesKey],
        ousd: d['1:OUSD'][feesKey],
        superOeth: d['8453:superOETHb'][feesKey],
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
              {format(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
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
              label: 'OUSD',
              lineColor: theme.palette.chart1,
              fillColor: alpha(theme.palette.chart1, 0.4),
            },
            {
              key: 'oeth',
              label: 'OETH',
              lineColor: theme.palette.chart2,
              fillColor: alpha(theme.palette.chart2, 0.4),
            },
            {
              key: 'superOeth',
              label: 'SuperOETH',
              lineColor: theme.palette.chart3,
              fillColor: alpha(theme.palette.chart3, 0.4),
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
          curveType="base"
        />
      )}
    </Card>
  );
};
