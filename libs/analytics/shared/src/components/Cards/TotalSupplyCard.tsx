import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { CurrencyLabel, LoadingLabel } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { formatInTimeZone } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { AreaChart } from '../Charts';
import { ChartTooltip } from '../ChartTooltip';
import { LimitControls } from '../Controls';
import { Spinner } from '../Spinner';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TotalSupplyCardProps = {
  token: Token;
  height: number;
  from?: string;
  currency?: 'ETH' | 'USD';
} & CardProps;

export const TotalSupplyCard = ({
  token,
  height,
  from,
  currency,
  ...rest
}: TotalSupplyCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Total supply' })}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {formatInTimeZone(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'UTC',
                'dd/MM/yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel isLoading={isLoading} sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency={currency} />
              {intl.formatNumber(activeItem?.totalSupply ?? 0)}
            </LoadingLabel>
          </Stack>
          <LimitControls limit={limit} setLimit={setLimit} />
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <AreaChart
          width={width}
          height={height}
          serie={data ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          xKey="timestamp"
          yKeys={[
            {
              key: 'circulatingSupply',
              fillColor: [theme.palette.chart1, theme.palette.chart2],
            },
            {
              key: 'protocolOwnedSupply',
              fillColor: [theme.palette.chart6, theme.palette.chart5],
            },
          ]}
          curveType="base"
          Tooltip={ChartTooltip}
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
