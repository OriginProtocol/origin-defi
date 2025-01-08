import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
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
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { ChartTooltip } from '../../Tooltips';
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
    apy30DayAvg: 'apy30' as Trailing,
    apy14DayAvg: 'apy14' as Trailing,
    apy7DayAvg: 'apy7' as Trailing,
  }[config?.defaultApyTrailing ?? 'apy30DayAvg'];

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
              {format(
                toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {intl.formatNumber(activeItem?.[trailing] ?? 0)}%
            </LoadingLabel>
            <Stack direction="row" spacing={0.75}>
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: `linear-gradient(90deg, ${theme.palette.chart5}, ${theme.palette.chart2});`,
                }}
              />
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medimum' }}
              >
                {intl.formatMessage(
                  {
                    defaultMessage: 'Average',
                  },
                  { trailing },
                )}
              </Typography>
              <Typography variant="caption1" sx={{ fontWeight: 'bold' }}>
                {intl.formatNumber((activeItem?.[trailing] as number) ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
              </Typography>
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
        <BarChart
          width={width}
          height={height}
          barData={data ?? []}
          xKey="timestamp"
          yKey="apy"
          lineData={{
            data: data ?? [],
            xKey: 'timestamp',
            yKey: trailing,
            color: [theme.palette.chart5, theme.palette.chart2],
            strokeWidth: 3,
          }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value: NumberLike) => `${value}%`}
          barColor={theme.palette.chart7}
          activeBarColor={theme.palette.chart3}
        />
      )}
    </Card>
  );
};
