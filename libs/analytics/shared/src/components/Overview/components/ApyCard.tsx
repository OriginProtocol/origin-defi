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
  BarChart,
  LimitControls,
  LoadingLabel,
  Spinner,
  TrailingControls,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { CHART_HEADER_HEIGHT } from '../constants';

import type { CardProps } from '@mui/material';
import type { Trailing } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { NumberLike } from '@visx/scale';

export type ApyCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const ApyCard = ({ token, height, from, ...rest }: ApyCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];
  const defaultTrailing = {
    apy30: 'apy30' as Trailing,
    apy14: 'apy14' as Trailing,
    apy7: 'apy7' as Trailing,
  }[config?.defaultApyTrailing ?? 'apy30'];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [trailing, setTrailing] = useState<Trailing>(defaultTrailing);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
    offset: 1,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'APY' })} />
      <Divider />
      <CardContent sx={{ minHeight: CHART_HEADER_HEIGHT }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {intl.formatNumber(activeItem?.[trailing] ?? 0)}%
            </LoadingLabel>
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
        <BarChart
          width={width}
          height={height}
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
              label: 'APY',
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
              } avg`,
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
    </Card>
  );
};
