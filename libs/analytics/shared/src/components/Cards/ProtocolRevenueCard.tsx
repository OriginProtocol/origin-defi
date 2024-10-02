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
  CurrencyLabel,
  LimitControls,
  LoadingLabel,
  MovingAvgControls,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';

import type { CardProps } from '@mui/material';
import type { MovingAvg } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

export type ProtocolRevenueCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const ProtocolRevenueCard = ({
  token,
  height,
  from,
  ...rest
}: ProtocolRevenueCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [ma, setMa] = useState<MovingAvg>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data: feesData, isLoading: isFeesLoading } = useTokenChartStats(
    { token, limit, from: from ?? config?.from },
    { select: (data) => data.map((d) => ({ x: d.timestamp, y: d.feesETH })) },
  );
  const { data: feesAvgData, isLoading: isFeesAvgLoading } = useTokenChartStats(
    { token, limit, from },
    {
      select: (data) => data.map((d) => ({ x: d.timestamp, y: d?.[ma] })),
    },
  );

  const width = measures?.width ?? 0;
  const activeItem =
    hoverIdx === null ? last(feesData ?? []) : feesData?.[hoverIdx];
  const activeMAItem =
    hoverIdx === null ? last(feesAvgData ?? []) : feesAvgData?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage(
          {
            defaultMessage: 'Protocol revenue for {symbol}',
          },
          { symbol: token.name },
        )}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              color="text.secondary"
            >
              {formatInTimeZone(
                new Date(activeItem?.x ?? new Date().getTime()),
                'UTC',
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber(activeItem?.y ?? 0)}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <MovingAvgControls ma={ma} setMa={setMa} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}
          useFlexGap
        >
          <Stack direction="row" spacing={1} sx={{ minWidth: 260 }}>
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                background: `linear-gradient(90deg, ${theme.palette.chart4}, ${theme.palette.chart5});`,
              }}
            />
            <Typography
              variant="caption1"
              color="text.secondary"
              sx={{ fontWeight: 'medimum' }}
            >
              {intl.formatMessage({ defaultMessage: 'Moving avergage' })}
            </Typography>
            <Typography variant="caption1" sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber((activeMAItem?.y as number) ?? 0, {
                notation: 'compact',
                minimumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      {isFeesLoading || isFeesAvgLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <BarChart
          width={width}
          height={height}
          barData={feesData ?? []}
          lineData={feesAvgData ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value) => `Ξ${value as number}`}
          tickXFormat={(value) =>
            formatInTimeZone(new Date(Number(value)), 'UTC', 'dd MM')
          }
          barColor={theme.palette.chart6}
          activeBarColor={theme.palette.chart4}
          lineColor={[theme.palette.chart5, theme.palette.chart4]}
        />
      )}
    </Card>
  );
};
