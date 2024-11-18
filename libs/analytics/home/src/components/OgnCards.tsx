import { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { useOgnInfo, useXOgnStakingApy } from '@origin/analytics/shared';
import {
  ChartTooltip,
  LimitControls,
  LineChart,
  Spinner,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { getTokenPriceKey, useTokenPrice } from '@origin/shared/providers';
import { useMeasure } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';
import { format, from } from 'dnum';
import { drop } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';

import { ognDailyQueryOptions } from '../hooks';
import { useOgnStatsQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

export const OgnPriceCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.mainnet.OGN),
  );
  const { data: stats, isLoading: isStatsLoading } = useOgnStatsQuery();

  return (
    <Card {...props}>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ justifyContent: 'space-between' }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Price' })}
          value={format(price ?? from(0), 3)}
          isLoading={isPriceLoading}
          currency="USD"
          {...ognPriceCardValueLabelProps}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Market Cap' })}
          value={intl.formatNumber(
            stats?.ognDailyStats?.[0].marketCapUSD ?? 0,
            {
              notation: 'compact',
              maximumFractionDigits: 2,
            },
          )}
          isLoading={isStatsLoading}
          currency="USD"
          {...ognPriceCardValueLabelProps}
        />
      </Stack>
    </Card>
  );
};

const ognPriceCardValueLabelProps: Partial<ValueLabelProps> = {
  sx: { alignItems: 'flex-start', width: 1, p: 1.5 },
  labelProps: { variant: 'body3', sx: { fontWeight: 'medium' } },
  valueProps: { variant: 'body1', sx: { fontWeight: 'medium' } },
};

export const OgnStatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const { data: stats, isLoading: isStatsLoading } = useOgnStatsQuery();
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    undefined,
    12,
  );

  return (
    <Card {...props}>
      <Stack divider={<Divider flexItem />}>
        <Stack
          direction="row"
          spacing={0.5}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Holders' })}
            value={intl.formatNumber(
              stats?.ognDailyStats?.[0].holdersOverThreshold ?? 0,
            )}
            isLoading={isStatsLoading}
            {...ognStatsCardValueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Circ. Supply' })}
            value={intl.formatNumber(stats?.ognStats?.circulatingSupply ?? 0, {
              notation: 'compact',
              maximumFractionDigits: 2,
            })}
            isLoading={isStatsLoading}
            {...ognStatsCardValueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Total Supply' })}
            value={intl.formatNumber(stats?.ognStats?.totalSupply ?? 0, {
              notation: 'compact',
              maximumFractionDigits: 2,
            })}
            isLoading={isStatsLoading}
            {...ognStatsCardValueLabelProps}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={0.5}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Staking Max vAPY' })}
            value={intl.formatNumber(staking?.xOgnApyPercentage ?? 0, {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            isLoading={isStakingLoading}
            {...ognStatsCardValueLabelProps}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: '% Staked' })}
            value={intl.formatNumber(info?.ognTotalLockedPercent ?? 0, {
              style: 'percent',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
            isLoading={isInfoLoading}
            {...ognStatsCardValueLabelProps}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

const ognStatsCardValueLabelProps: Partial<ValueLabelProps> = {
  spacing: 0.5,
  sx: { alignItems: 'flex-start', width: 1, p: 1.5 },
  labelProps: { variant: 'caption1' },
  valueProps: { variant: 'caption1' },
};

export const OgnPerformanceCard = (props: CardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const [metric, setMetric] = useState<'price' | 'mc'>('price');
  const [limit, setLimit] = useState<number | undefined>(182);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data: dailyStats, isLoading: isDailyStatsLoading } = useQuery({
    ...ognDailyQueryOptions,
    select: (data) =>
      drop(
        365 - (limit ?? 365),
        metric === 'price' ? data?.prices : data?.marketCaps,
      ),
  });

  const width = measures?.width ?? 0;

  return (
    <Card {...props} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'OGN Performance' })}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <ButtonGroup size="small" variant="outlined" color="secondary">
            {[
              {
                label: defineMessage({ defaultMessage: 'Price' }),
                value: 'price',
              },
              { label: defineMessage({ defaultMessage: 'MC' }), value: 'mc' },
            ].map(({ label, value }) => (
              <Button
                key={value}
                onClick={() => {
                  setMetric(value as 'price' | 'mc');
                }}
                sx={[
                  ...(value === metric
                    ? [{ backgroundColor: 'secondary.main' }]
                    : []),
                ]}
              >
                {intl.formatMessage(label)}
              </Button>
            ))}
          </ButtonGroup>
          <LimitControls limit={limit} setLimit={setLimit} />
        </Stack>
      </CardContent>
      {isDailyStatsLoading ? (
        <Spinner sx={{ height: 400 }} />
      ) : (
        <LineChart
          width={width}
          height={412}
          series={[
            {
              label: metric === 'price' ? 'Price' : 'Market Cap',
              data: dailyStats ?? [],
              xKey: 'timestamp',
              yKey: 'value',
              color: [theme.palette.chart1, theme.palette.chart2],
            },
          ]}
          Tooltip={ChartTooltip}
          tickYFormat={(value: NumberLike) =>
            metric === 'price'
              ? `$${value}`
              : intl.formatNumber(Number(value), {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                })
          }
        />
      )}
    </Card>
  );
};
