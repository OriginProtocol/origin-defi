import { useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import {
  AreaChart,
  LimitControls,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../../constants';
import { useTokenChartStats } from '../../../hooks';
import { ChartTooltip } from '../../Tooltips';
import { CHART_HEADER_HEIGHT } from '../constants';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

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
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(182);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
    offset: 1,
  });

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(data ?? []) : data?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Wrapped supply' })}
      />
      <Divider />
      <CardContent sx={{ minHeight: CHART_HEADER_HEIGHT }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isLoading} color="text.secondary">
              {format(
                toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {intl.formatNumber(activeItem?.wrappedSupply ?? 0)}
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
              key: 'wrappedSupply',
              fillColor: [theme.palette.chart1, theme.palette.chart2],
            },
          ]}
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
