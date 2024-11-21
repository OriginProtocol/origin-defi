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
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
  TrailingControls,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { ChartTooltip } from '../Tooltips';
import { CHART_HEADER_HEIGHT } from './constants';

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
                new Date(activeItem?.timestamp ?? new Date().getTime()),
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
        <LineChart
          width={width}
          height={height}
          series={[
            {
              label: 'APY',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: trailing,
              color: [theme.palette.chart1, theme.palette.chart2],
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
