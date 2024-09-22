import { useState } from 'react';

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { LineChart } from '../Charts';
import { ChartTooltip } from '../ChartTooltip';
import { LimitControls, TrailingControls } from '../Controls';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { NumberLike } from '@visx/scale';

import type { Trailing } from '../Controls';

export type PercentWrappedCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const PercentWrappedCard = ({
  token,
  height,
  from,
  ...rest
}: PercentWrappedCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [trailing, setTrailing] = useState<Trailing>('apy30');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage(
                { defaultMessage: '% wrapped {symbol}' },
                { symbol: token.symbol },
              )}
            </Typography>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatNumber(activeItem?.pctWrappedSupply ?? 0)}%
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <TrailingControls trailing={trailing} setTrailing={setTrailing} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Stack
          sx={{
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={36} />
        </Stack>
      ) : (
        <LineChart
          width={width}
          height={height}
          series={[
            {
              label: '% wrapped',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: 'pctWrappedSupply',
              color: [theme.palette.chart1, theme.palette.chart2],
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
