import { useCallback, useState } from 'react';

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { last } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useOTokenStatsQuery } from '../../queries';
import { AreaChart } from '../Charts';
import { LimitControls } from '../LimitControls';

import type { CardProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { OTokenStatsQuery } from '../../queries';
import type { ChartData } from '../Charts';

export type TotalSupplyChartCardProps = {
  token: Token;
  width: number;
  height: number;
  from?: string;
} & CardProps;

export const TotalSupplyChartCard = ({
  token,
  width,
  height,
  from,
  ...rest
}: TotalSupplyChartCardProps) => {
  const intl = useIntl();
  const [limit, setLimit] = useState<number | undefined>(undefined);
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
            y: +formatUnits(
              BigInt(d.totalSupply),
              tokens.mainnet.OETH.decimals,
            ),
          })) ?? [],
        [],
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
              {intl.formatMessage({ defaultMessage: 'Total supply' })}
            </Typography>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatNumber(activeItem?.y ?? 0)}
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatDate(new Date(activeItem?.x ?? new Date()))}
            </LoadingLabel>
          </Stack>
          <LimitControls limit={limit} setLimit={setLimit} />
        </Stack>
      </CardContent>
      {isLoading ? (
        <Stack
          sx={{ width, height, justifyContent: 'center', alignItems: 'center' }}
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
          { defaultMessage: 'Total supply: {supply}' },
          { supply: intl.formatNumber(data.y) },
        )}
      </Typography>
    </Stack>
  );
};
