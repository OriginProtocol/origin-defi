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
  useArmDailyStatsQuery,
  useTokensChartStats,
} from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { format, isDate } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import dayjs from 'dayjs';
import { from as dfrom, mul, toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ChartResult } from '@origin/analytics/shared';
import type { Serie } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type TvlCardProps = {
  height: number;
} & CardProps;

type ChartData = {
  timestamp: number;
  circulatingSupplyETH: number;
  circulatingSupplyUSD: number;
};

export const TvlCard = ({ height, ...rest }: TvlCardProps) => {
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
  const { data: arms, isLoading: isArmLoading } = useArmDailyStatsQuery(
    {
      limit,
      offset,
    },
    { select: (data) => data?.armDailyStats },
  );
  const series = useMemo(() => {
    const arm: Partial<ChartResult>[] = [];

    if (data?.totals?.length && arms?.length) {
      for (const tot of data.totals) {
        const armItem = arms.find((a) =>
          dayjs.utc(a.date).isSame(dayjs.utc(tot.date), 'day'),
        );
        const tvlETH = [BigInt(armItem?.totalSupply ?? 0), 18] as Dnum;
        const rateUSD = dfrom(armItem?.rateUSD ?? 0);

        arm.push({
          timestamp: tot.timestamp,
          circulatingSupplyETH: toNumber(tvlETH),
          circulatingSupplyUSD: toNumber(mul(tvlETH, rateUSD), {
            decimalsRounding: 'ROUND_DOWN',
            digits: 2,
          }),
        });
      }
    }

    return Object.entries(data ?? {}).reduce<Serie<ChartData>[]>(
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
      [
        {
          label: intl.formatMessage({ defaultMessage: 'ARM' }),
          data: arm as ChartData[],
          xKey: 'timestamp',
          yKey:
            currency === 'ETH'
              ? 'circulatingSupplyETH'
              : 'circulatingSupplyUSD',
          color: [
            oTokenConfig[tokens.mainnet['ARM-WETH-stETH'].id].lineChartColor ??
              '#fff',
            emphasize(
              oTokenConfig[tokens.mainnet['ARM-WETH-stETH'].id]
                .lineChartColor ?? '#fff',
              0.5,
            ),
          ],
          strokeWidth: 2,
        },
      ],
    );
  }, [data, arms, intl, currency]);

  const width = measures?.width ?? 0;
  const activeItem =
    hoverIdx === null ? last(data?.totals ?? []) : data?.totals?.[hoverIdx];
  const totalCirculatingSupply =
    currency === 'ETH'
      ? activeItem?.circulatingSupplyETH
      : activeItem?.circulatingSupplyUSD;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
      <Divider />
      <CardContent>
        <Stack
          spacing={0.5}
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <LoadingLabel
            isLoading={isLoading || isArmLoading}
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
            isLoading={isLoading || isArmLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(totalCirculatingSupply ?? 0, {
              maximumFractionDigits: 0,
            })}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading || isArmLoading ? (
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
