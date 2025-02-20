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
import { oTokenConfig, useTokensChartStats } from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LineChart,
  LoadingLabel,
  Spinner,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import dayjs from 'dayjs';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps } from '@mui/material';
import type { Serie } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

export type TokenSupplyCardProps = {
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
  totalETH?: number;
  totalUSD?: number;
};

export const TokenSupplyCard = ({ height, ...rest }: TokenSupplyCardProps) => {
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
  const serie = useMemo(() => {
    const serie: Item[] = [];
    for (let i = 0; i < (data?.totals?.length ?? 0); i++) {
      const oeth = data?.['1:OETH'][i];
      const ousd = data?.['1:OUSD'][i];
      const superOeth = data?.['8453:superOETHb'][i];
      const os = data?.['146:OS'][i];
      const total = data?.totals[i];

      serie.push({
        timestamp: +dayjs
          .utc(oeth?.timestamp)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0),
        oethETH: oeth?.tvlETH,
        oethUSD: oeth?.tvlUSD,
        osETH: os?.tvlETH,
        osUSD: os?.tvlUSD,
        ousdETH: ousd?.tvlETH,
        ousdUSD: ousd?.tvlUSD,
        superOethETH: superOeth?.tvlETH,
        superOethUSD: superOeth?.tvlUSD,
        totalETH: total?.tvlETH,
        totalUSD: total?.tvlUSD,
      });
    }
    return serie;
  }, [data]);

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
  ];
  const width = measures?.width ?? 0;
  const activeItem = hoverIdx === null ? last(serie ?? []) : serie?.[hoverIdx];
  const totalTvl =
    currency === 'USD' ? activeItem?.totalUSD : activeItem?.totalETH;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Token Supply' })}
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
            {dayjs.utc(activeItem?.timestamp).format('DD MMM YYYY')}
          </LoadingLabel>
          <LoadingLabel
            variant="body1"
            isLoading={isLoading}
            sx={{ fontWeight: 'bold' }}
          >
            <CurrencyLabel currency={currency} />
            {intl.formatNumber(totalTvl ?? 0, {
              maximumFractionDigits: 0,
            })}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <LineChart
          data={serie ?? []}
          series={series as Serie<Item>[]}
          width={width}
          height={height}
          margins={{ top: 5, left: 25, right: 60, bottom: 50 }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value: NumberLike) =>
            `${currency === 'USD' ? '$' : 'Ξ'} ${intl.formatNumber(
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
