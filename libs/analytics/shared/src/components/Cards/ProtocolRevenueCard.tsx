import { useState } from 'react';

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import { useTokenChartStats } from '../../hooks';
import { BarChart } from '../Charts/BarChart';
import { LimitControls } from '../LimitControls';

import type { SelectProps } from '@mui/material';
import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type ProtocolRevenueCardProps = {
  token: Token;
  width: number;
  height: number;
  from?: string;
} & CardProps;

export const ProtocolRevenueCard = ({
  token,
  width,
  height,
  from,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [ma, setMa] = useState<MA>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data: feesData, isLoading: isFeesLoading } = useTokenChartStats(
    { token, limit, from },
    { select: (data) => data.map((d) => ({ x: d.timestamp, y: d.fees })) },
  );
  const { data: feesAvgData, isLoading: isFeesAvgLoading } = useTokenChartStats(
    { token, limit, from },
    {
      select: (data) => data.map((d) => ({ x: d.timestamp, y: d?.[ma] })),
    },
  );

  const activeItem =
    hoverIdx === null ? last(feesData ?? []) : feesData?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage(
                { defaultMessage: 'Daily Protocol Revenue from {symbol}' },
                { symbol: token.symbol },
              )}
            </Typography>
            <LoadingLabel
              isLoading={isFeesLoading || isFeesAvgLoading}
              sx={{ fontWeight: 'bold' }}
            >
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
          sx={{ width, height, justifyContent: 'center', alignItems: 'center' }}
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

const maOptions = {
  feesMovingAvg7Days: defineMessage({ defaultMessage: '7-Day MA' }),
  feesMovingAvg30Days: defineMessage({ defaultMessage: '30-Day MA' }),
};

type MA = keyof typeof maOptions;

type MaControlsProps = {
  ma: MA;
  setMa: (value: MA) => void;
} & SelectProps;

const MAControls = ({ ma, setMa, ...rest }: MaControlsProps) => {
  const intl = useIntl();

  return (
    <Select
      {...rest}
      displayEmpty
      size="small"
      color="secondary"
      variant="outlined"
      value={ma}
      onChange={(event) => {
        setMa(event.target.value as MA);
      }}
      sx={[
        { fontSize: 13, minWidth: 40 },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
    >
      {Object.entries(maOptions).map(([avg, label]) => (
        <MenuItem key={avg} value={avg}>
          {intl.formatMessage(label)}
        </MenuItem>
      ))}
    </Select>
  );
};
