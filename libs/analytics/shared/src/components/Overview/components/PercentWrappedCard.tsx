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
  ExpandablePanel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { CHART_HEADER_HEIGHT } from '../constants';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { NumberLike } from '@visx/scale';

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
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
    offset: 1,
  });

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardHeader
        title={intl.formatMessage(
          { defaultMessage: 'Percentage of wrapped {symbol} (w{symbol})' },
          { symbol: token.symbol },
        )}
      />
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
              {intl.formatNumber(activeItem?.pctWrappedSupply ?? 0)}%
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width: 1, height }} />
      ) : (
        <ExpandablePanel
          height={height}
          title={intl.formatMessage(
            { defaultMessage: 'Percentage of wrapped {symbol} (w{symbol})' },
            { symbol: token.symbol },
          )}
        >
          {({ width, height: containerHeight }) => (
            <LineChart
              width={width}
              height={containerHeight}
              data={data ?? []}
              series={[
                {
                  label: '% wrapped',
                  xKey: 'timestamp',
                  yKey: 'pctWrappedSupply',
                  color: [theme.palette.chart1, theme.palette.chart2],
                  curveType: 'base',
                },
              ]}
              onHover={(idx) => {
                setHoverIdx(idx ?? null);
              }}
              tickYFormat={(value: NumberLike) => `${value}%`}
              tooltipLabels={[
                { label: (d) => dayjs.utc(d.timestamp).format('DD MMM') },
                {
                  label: intl.formatMessage({ defaultMessage: 'Wrapped' }),
                  value: (d) => `${intl.formatNumber(d.pctWrappedSupply)}%`,
                  color: [theme.palette.chart1, theme.palette.chart2],
                },
              ]}
            />
          )}
        </ExpandablePanel>
      )}
    </Card>
  );
};
