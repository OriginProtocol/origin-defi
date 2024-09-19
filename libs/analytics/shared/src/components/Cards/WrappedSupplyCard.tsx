import { useState } from 'react';

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { AreaChart } from '../Charts';
import { LimitControls } from './components/LimitControls';

import type { CardProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { ChartData } from '../Charts';

export type WrappedSupplyCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const WrappedSupplyCard = ({
  token,
  height,
  from,
  ...rest
}: WrappedSupplyCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats(
    { token, limit, from: from ?? config?.from },
    {
      select: (data) =>
        data.map((d) => ({ x: d.timestamp, y: d.wrappedSupply })),
    },
  );

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
              {intl.formatMessage({ defaultMessage: 'Wrapped supply' })}
            </Typography>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatNumber(activeItem?.y ?? 0)}
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {formatInTimeZone(
                new Date(activeItem?.x ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
          </Stack>
          <LimitControls limit={limit} setLimit={setLimit} />
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
        <AreaChart
          width={width}
          height={height}
          data={data ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={Tooltip}
          tickYFormat={(value) =>
            intl.formatNumber(Number(value), {
              notation: 'compact',
            })
          }
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
          { defaultMessage: 'Wrapped supply: {supply}' },
          { supply: intl.formatNumber(data.y) },
        )}
      </Typography>
    </Stack>
  );
};
