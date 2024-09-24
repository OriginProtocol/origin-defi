import { useState } from 'react';

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { CurrencyLabel, LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { BarChart } from '../Charts/BarChart';
import { LimitControls, MAControls } from '../Controls';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { MA } from '../Controls';

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
  const [limit, setLimit] = useState<number | undefined>(182);
  const [ma, setMa] = useState<MA>('feesMovingAvg30Days');
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

  return (
    <Card {...rest} ref={ref}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage({ defaultMessage: 'Protocol revenue' })}
            </Typography>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber(activeItem?.y ?? 0)}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              sx={{ fontWeight: 'bold' }}
            >
              {formatInTimeZone(
                new Date(activeItem?.x ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <MAControls ma={ma} setMa={setMa} />
          </Stack>
        </Stack>
      </CardContent>
      {isFeesLoading || isFeesAvgLoading ? (
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
        <BarChart
          width={width}
          height={height}
          barData={feesData ?? []}
          lineData={feesAvgData ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value) => `Ξ ${value as number}`}
          tickXFormat={(value) =>
            formatInTimeZone(new Date(Number(value)), 'UTC', 'dd MM')
          }
        />
      )}
    </Card>
  );
};
