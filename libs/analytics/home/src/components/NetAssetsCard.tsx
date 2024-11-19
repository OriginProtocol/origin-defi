import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useTokensChartStats } from '@origin/analytics/shared';
import {
  BarChart,
  CurrencyLabel,
  LoadingLabel,
} from '@origin/shared/components';
import { Spinner } from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';

export type NetAssetsCardProps = {
  height: number;
} & CardProps;

export const NetAssetsCard = ({ height, ...rest }: NetAssetsCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { limit, offset, currency } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokensChartStats(limit, offset);
  const series = useMemo(
    () =>
      data?.totals?.map((d) => ({
        x: d.timestamp,
        y: currency === 'USD' ? d.circulatingSupplyUSD : d.circulatingSupplyETH,
      })),

    [data, currency],
  );

  const activeItem =
    hoverIdx === null ? last(data?.totals ?? []) : data?.totals?.[hoverIdx];
  const width = measures?.width ?? 0;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Net Assets' })}
      />
      <Divider />
      <CardContent>
        <Stack
          spacing={0.5}
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <LoadingLabel
            isLoading={isLoading}
            color="text.secondary"
            sx={{ fontWeight: 'bold' }}
          >
            {format(
              new Date(activeItem?.timestamp ?? new Date().getTime()),
              'dd MMM yyyy',
            )}
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(
              activeItem?.[currency === 'ETH' ? 'tvlETH' : 'tvlUSD'] ?? 0,
              {
                maximumFractionDigits: 0,
              },
            )}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <BarChart
          width={width}
          height={height}
          barData={series ?? []}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'ETH' ? 'Ξ' : '$'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
          barColor={theme.palette.chart3}
          activeBarColor={theme.palette.chart8}
          lineColor={[theme.palette.chart5, theme.palette.chart4]}
        />
      )}
    </Card>
  );
};
