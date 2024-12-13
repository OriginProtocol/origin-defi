import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  emphasize,
  Stack,
} from '@mui/material';
import {
  ChartTooltip,
  oTokenConfig,
  useTokensChartStats,
} from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format, isDate } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ChartResult } from '@origin/analytics/shared';
import type { Serie } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

export type CirculatingSupplyCardProps = {
  height: number;
} & CardProps;

export const CirculatingSupplyCard = ({
  height,
  ...rest
}: CirculatingSupplyCardProps) => {
  const intl = useIntl();
  const { limit, offset, currency, from, to } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokensChartStats(
    limit,
    offset,
    !!from && isDate(from) ? from.toISOString() : undefined,
    !!to && isDate(to) ? to.toISOString() : undefined,
  );
  const series = useMemo(
    () =>
      Object.entries(data ?? {}).reduce<Serie<ChartResult>[]>(
        (acc, [key, value]) => {
          if (!(value[0] as ChartResult)?.token) {
            return acc;
          }

          return [
            ...acc,
            {
              label: (value[0] as ChartResult).token.name,
              data: value as ChartResult[],
              xKey: 'timestamp',
              yKey:
                currency === 'ETH'
                  ? 'circulatingSupplyETH'
                  : 'circulatingSupplyUSD',
              color: [
                oTokenConfig[key].lineChartColor ?? '#fff',
                emphasize(oTokenConfig[key].lineChartColor ?? '#fff', 0.5),
              ],
              strokeWidth: 2,
            },
          ];
        },
        [],
      ),
    [data, currency],
  );

  const width = measures?.width ?? 0;
  const activeItem =
    hoverIdx === null ? last(data?.totals ?? []) : data?.totals?.[hoverIdx];
  const totalCirculatingSupply =
    currency === 'ETH'
      ? activeItem?.circulatingSupplyETH
      : activeItem?.circulatingSupplyUSD;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Circulating Supply' })}
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
              toZonedTime(activeItem?.timestamp ?? Date.now(), 'UTC'),
              'dd MMM yyyy',
            )}
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(totalCirculatingSupply ?? 0, {
              maximumFractionDigits: 0,
            })}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          series={series}
          width={width}
          height={height}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={ChartTooltip}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'ETH' ? 'Ξ' : '$'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
        />
      )}
    </Card>
  );
};
