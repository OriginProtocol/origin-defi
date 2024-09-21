import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  LimitControls,
  LineChart,
  useOriginStats,
} from '@origin/analytics/shared';
import { LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import type { CardProps, StackProps } from '@mui/material';
import type { ChartData } from '@origin/analytics/shared';
import type { NumberLike } from '@visx/scale';

export type OriginProtocolRevenueCardProps = {
  height: number;
} & CardProps;

export const OriginProtocolRevenueCard = ({
  height,
  ...rest
}: OriginProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOriginStats(limit);

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
                new Date(activeItem?.total.timestamp ?? new Date().getTime()),
                'UTC',
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              variant="body1"
              isLoading={isLoading}
              sx={{ fontWeight: 'bold' }}
            >
              $
              {intl.formatNumber(activeItem?.total.feesETH ?? 0, {
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
          data={
            data?.map((d) => ({
              x: d.total.timestamp,
              y: d.total.tvlUSD,
            })) ?? []
          }
          width={width}
          height={height}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={Tooltip}
          tickYFormat={(value: NumberLike) =>
            intl.formatNumber(Number(value), {
              notation: 'compact',
            })
          }
          lineColors={[theme.palette.chart1, theme.palette.chart2]}
          sx={{ width: 1 }}
        />
      )}
    </Card>
  );
};

type TooltipProps = { data: ChartData } & StackProps;

const Tooltip = ({ data, ...rest }: TooltipProps) => {
  const intl = useIntl();

  return (
    <Stack {...rest} sx={[{ backgroundColor: 'background.default' }]}>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {intl.formatMessage(
          { defaultMessage: 'Date: {date}' },
          { date: intl.formatDate(new Date(data.x)) },
        )}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {intl.formatMessage(
          { defaultMessage: 'TVL: ${totalSupply}' },
          {
            totalSupply: intl.formatNumber(data.y, {
              notation: 'compact',
              minimumFractionDigits: 2,
            }),
          },
        )}
      </Typography>
    </Stack>
  );
};
