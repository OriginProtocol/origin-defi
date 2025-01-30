import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  emphasize,
  Stack,
  useTheme,
} from '@mui/material';
import {
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
import dayjs from 'dayjs';
import { from as dfrom, mul, toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { Serie } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type TvlCardProps = {
  height: number;
} & CardProps;

type Item = {
  timestamp: number;
  oethETH?: number;
  oethUSD?: number;
  osETH?: number;
  osUSD?: number;
  ousdETH?: number;
  ousdUSD?: number;
  superOethETH?: number;
  superOethUSD?: number;
  armETH?: number;
  armUSD?: number;
  totalETH?: number;
  totalUSD?: number;
};

export const TvlCard = ({ height, ...rest }: TvlCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { limit, offset, currency, from, to } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useTokensChartStats(
    limit,
    from || to ? 0 : offset,
    from ? from.toISOString() : undefined,
    to ? to.toISOString() : undefined,
  );
  const { data: arms, isLoading: isArmLoading } = useArmDailyStatsQuery(
    {
      limit,
      offset: from || to ? 0 : offset,
    },
    { select: (data) => data?.armDailyStats },
  );

  const serie = useMemo(() => {
    const serie: Item[] = [];
    for (let i = 0; i < (data?.totals?.length ?? 0); i++) {
      const oeth = data?.['1:OETH'][i];
      const ousd = data?.['1:OUSD'][i];
      const superOeth = data?.['8453:superOETHb'][i];
      const os = data?.['146:OS'][i];
      const total = data?.totals[i];
      const armItem = arms?.find((a) =>
        dayjs.utc(a.date).isSame(dayjs.utc(oeth?.date), 'day'),
      );
      const armTvlETH = toNumber([
        BigInt(armItem?.totalSupply ?? 0),
        18,
      ] as Dnum);
      const rateUSD = dfrom(armItem?.rateUSD ?? 0);
      const armTvlUSD = toNumber(mul(armTvlETH, rateUSD));

      serie.push({
        timestamp: +dayjs
          .utc(oeth?.timestamp)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0),
        oethUSD: oeth?.circulatingSupplyUSD,
        oethETH: oeth?.circulatingSupplyETH,
        osETH: os?.circulatingSupplyETH,
        osUSD: os?.circulatingSupplyUSD,
        ousdUSD: ousd?.circulatingSupplyUSD,
        ousdETH: ousd?.circulatingSupplyETH,
        superOethUSD: superOeth?.circulatingSupplyUSD,
        superOethETH: superOeth?.circulatingSupplyETH,
        armUSD: armTvlUSD,
        armETH: armTvlETH,
        totalUSD: (total?.circulatingSupplyUSD ?? 0) + armTvlUSD,
        totalETH: (total?.circulatingSupplyETH ?? 0) + armTvlETH,
      });
    }
    return serie;
  }, [arms, data]);

  const series: Serie<Item>[] = [
    {
      label: tokens.mainnet.OETH.name,
      xKey: 'timestamp',
      yKey: currency === 'USD' ? 'oethUSD' : 'oethETH',
      color: [
        oTokenConfig[tokens.mainnet.OETH.id].lineChartColor ?? '#fff',
        emphasize(
          oTokenConfig[tokens.mainnet.OETH.id].lineChartColor ?? '#fff',
          0.5,
        ),
      ],
      strokeWidth: 2,
    },
    {
      label: tokens.mainnet.OUSD.name,
      xKey: 'timestamp',
      yKey: currency === 'USD' ? 'ousdUSD' : 'ousdETH',
      color: [
        oTokenConfig[tokens.mainnet.OUSD.id].lineChartColor ?? '#fff',
        emphasize(
          oTokenConfig[tokens.mainnet.OUSD.id].lineChartColor ?? '#fff',
          0.5,
        ),
      ],
      strokeWidth: 2,
    },
    {
      label: tokens.base.superOETHb.name,
      xKey: 'timestamp',
      yKey: currency === 'USD' ? 'superOethUSD' : 'superOethETH',
      color: [
        oTokenConfig[tokens.base.superOETHb.id].lineChartColor ?? '#fff',
        emphasize(
          oTokenConfig[tokens.base.superOETHb.id].lineChartColor ?? '#fff',
          0.5,
        ),
      ],
      strokeWidth: 2,
    },
    {
      label: 'Origin Sonic',
      xKey: 'timestamp',
      yKey: currency === 'USD' ? 'osUSD' : 'osETH',
      color: [
        oTokenConfig[tokens.sonic.OS.id].lineChartColor ?? '#fff',
        emphasize(
          oTokenConfig[tokens.sonic.OS.id].lineChartColor ?? '#fff',
          0.5,
        ),
      ],
      strokeWidth: 2,
    },
    {
      label: 'ARM',
      xKey: 'timestamp',
      yKey: currency === 'USD' ? 'armUSD' : 'armETH',
      color: [
        oTokenConfig[tokens.mainnet['ARM-WETH-stETH'].id].lineChartColor ??
          '#fff',
        emphasize(
          oTokenConfig[tokens.mainnet['ARM-WETH-stETH'].id].lineChartColor ??
            '#fff',
          0.5,
        ),
      ],
      strokeWidth: 2,
    },
  ];

  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(serie ?? []) : serie?.[hoverIdx];

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
            {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading || isArmLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(
              currency === 'USD'
                ? (activeItem?.totalUSD ?? 0)
                : (activeItem?.totalETH ?? 0),
              {
                maximumFractionDigits: 0,
              },
            )}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading || isArmLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          data={serie}
          series={series}
          width={width}
          height={height}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'ETH' ? 'Ξ' : '$'} ${intl.formatNumber(
              Number(value),
              {
                notation: 'compact',
              },
            )}`
          }
          tooltipLabels={[
            { label: (d) => dayjs.utc(d.timestamp).format('DD MMM') },
            ...series.map((s) => ({
              label: s.label,
              value: (d: Item) =>
                intl.formatNumber(d[s.yKey as keyof Item] ?? 0, {
                  notation: 'compact',
                }),
              color: s.color,
              currency,
            })),
            {
              label: 'Total',
              value: (d: Item) =>
                intl.formatNumber(
                  currency === 'USD' ? (d.totalUSD ?? 0) : (d.totalETH ?? 0),
                  {
                    notation: 'compact',
                  },
                ),
              color: theme.palette.chart3,
              currency,
            },
          ]}
        />
      )}
    </Card>
  );
};
