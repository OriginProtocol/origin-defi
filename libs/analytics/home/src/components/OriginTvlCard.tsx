import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useOriginStats } from '@origin/analytics/shared';
import {
  ChartTooltip,
  CurrencyLabel,
  LimitControls,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last, pluck } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';

export type OriginTvlCardProps = {
  height: number;
} & CardProps;

export const OriginTvlCard = ({ height, ...rest }: OriginTvlCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOriginStats(limit, {
    select: (data) => pluck('total', data),
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Origin TVL' })}
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
              <CurrencyLabel currency="USD" />
              {intl.formatNumber(activeItem?.tvlUSD ?? 0, {
                maximumFractionDigits: 0,
              })}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
          </Stack>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          series={[
            {
              label: 'TVL',
              data: data ?? [],
              xKey: 'timestamp',
              yKey: 'tvlUSD',
              color: [theme.palette.chart1, theme.palette.chart2],
            },
          ]}
          width={width}
          height={height}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value: NumberLike) =>
            intl.formatNumber(Number(value), {
              notation: 'compact',
            })
          }
          yScaleDomain={[0, Math.max(...(data?.map((d) => d.tvlUSD) ?? []))]}
        />
      )}
    </Card>
  );
};
