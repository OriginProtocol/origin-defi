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
import { last, takeLast } from 'ramda';
import { useIntl } from 'react-intl';

import { useCumulativeProtocolRevenue } from '../hooks';

import type { CardProps } from '@mui/material';

export type CumulativeProtocolRevenueCardProps = {
  height: number;
} & CardProps;

export const CumulativeProtocolRevenueCard = ({
  height,
  ...rest
}: CumulativeProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [currency, setCurrency] = useState<'ETH' | 'USD'>('ETH');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useCumulativeProtocolRevenue();

  const serie =
    limit === undefined
      ? (data?.serie ?? [])
      : takeLast(limit, data?.serie ?? []);
  const width = measures?.width ?? 0;
  const activeItem =
    hoverIdx === null ? last(data?.serie ?? []) : data?.serie?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Cumulative protocol revenue',
        })}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
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
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(activeItem?.totalCumulated ?? 0, {
                maximumFractionDigits: 3,
              })}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <CurrencyControls currency={currency} setCurrency={setCurrency} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <AreaChart
          width={width}
          height={height}
          serie={serie}
          xKey="timestamp"
          yKeys={[
            {
              key: 'ousdCumulated',
              label: 'OUSD',
              lineColor: theme.palette.chart1,
              fillColor: alpha(theme.palette.chart1, 0.4),
            },
            {
              key: 'oethCumulated',
              label: 'OETH',
              lineColor: theme.palette.chart2,
              fillColor: alpha(theme.palette.chart2, 0.4),
            },
            {
              key: 'superOethCumulated',
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
