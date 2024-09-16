import { useCallback, useState } from 'react';

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useOTokenStatsQuery } from '../../queries';
import { LineChart } from '../Charts';
import { LimitControls } from '../LimitControls';
import { TrailingControls } from '../TrailingControls';

import type { CardProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { OTokenStatsQuery } from '../../queries';
import type { ChartData } from '../Charts';
import type { Trailing } from '../TrailingControls';

export type ApyChartCardProps = {
  token: Token;
  width: number;
  height: number;
  from?: string;
} & CardProps;

export const ApyChartCard = ({
  token,
  width,
  height,
  from,
  ...rest
}: ApyChartCardProps) => {
  const intl = useIntl();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [trailing, setTrailing] = useState<Trailing>('apy30');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const { data, isLoading } = useOTokenStatsQuery(
    {
      token: token.address ?? ZERO_ADDRESS,
      chainId: token.chainId,
      limit,
      from,
    },
    {
      select: useCallback(
        (data: OTokenStatsQuery) =>
          data?.oTokenDailyStats?.toReversed().map((d) => ({
            x: new Date(d.timestamp).getTime(),
            y: d?.[trailing] * 100,
          })) ?? [],
        [trailing],
      ),
    },
  );

  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage({ defaultMessage: 'Apy' })}
            </Typography>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatNumber(activeItem?.y ?? 0)}%
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatDate(new Date(activeItem?.x ?? new Date()))}
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
          sx={{ width, height, justifyContent: 'center', alignItems: 'center' }}
        >
          <CircularProgress size={36} />
        </Stack>
      ) : (
        <LineChart
          width={width}
          height={height}
          data={data ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={Tooltip}
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
          { defaultMessage: 'Apy: {apy}%' },
          { apy: intl.formatNumber(data.y) },
        )}
      </Typography>
    </Stack>
  );
};
