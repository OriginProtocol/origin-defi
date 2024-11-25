import { useMemo, useState } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  oTokenConfig,
  useArmDailyStatsQuery,
  useTokensChartStats,
} from '@origin/analytics/shared';
import {
  ColorLabel,
  CurrencyLabel,
  LoadingLabel,
  Spinner,
  StackedBarChart,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { mul, toNumber } from 'dnum';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';
import type { Dnum } from 'dnum';

export type ProtocolRevenueCardProps = {
  height: number;
} & CardProps;

type Item = {
  timestamp: number;
  oeth?: number;
  ousd?: number;
  superOeth?: number;
  arm?: number;
  total?: number;
};

export const ProtocolRevenueCard = ({
  height,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const { limit, offset, currency, from, to } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const width = measures?.width ?? 0;
  const { data: tokens, isLoading: isTokensLoading } = useTokensChartStats(
    limit,
    offset,
    from?.toISOString(),
    to?.toISOString(),
  );
  const { data: arms, isLoading: isArmLoading } = useArmDailyStatsQuery(
    {
      limit,
      offset,
    },
    {
      select: (data) =>
        data.armDailyStats.map((d) => {
          const rateUSD = d.rateUSD;
          const feesETH = [BigInt(d?.fees ?? 0), 18] as Dnum;

          return {
            timestamp: d.timestamp,
            date: d.date,
            feesETH: toNumber(feesETH),
            feesUSD: toNumber(mul(feesETH, rateUSD)),
          };
        }),
    },
  );

  const serie = useMemo(() => {
    const serie: Item[] = [];
    for (let i = 0; i < (tokens?.totals?.length ?? 0); i++) {
      const oeth = tokens?.['1:OETH'][i];
      const ousd = tokens?.['1:OUSD'][i];
      const superOeth = tokens?.['8453:superOETHb'][i];
      const arm = arms?.find((a) => a.date === oeth?.date) ?? {
        timestamp: oeth?.timestamp ?? 0,
        date: oeth?.date ?? '',
        feesETH: 0,
        feesUSD: 0,
      };
      const total = tokens?.totals[i];
      const totals = {
        ...(total ?? {}),
        feesUSD: (total?.feesUSD ?? 0) + arm.feesUSD,
        feesETH: (total?.feesETH ?? 0) + arm.feesETH,
      };

      serie.push({
        timestamp: oeth?.timestamp ?? 0,
        oeth: currency === 'USD' ? oeth?.feesUSD : oeth?.feesETH,
        ousd: currency === 'USD' ? ousd?.feesUSD : ousd?.feesETH,
        superOeth: currency === 'USD' ? superOeth?.feesUSD : superOeth?.feesETH,
        arm: currency === 'USD' ? arm?.feesUSD : arm?.feesETH,
        total: currency === 'USD' ? totals?.feesUSD : totals?.feesETH,
      });
    }
    return serie;
  }, [arms, currency, tokens]);

  const margins = { top: 5, left: 25, right: 60, bottom: 50 };
  const activeItem = hoverIdx === null ? last(serie ?? []) : serie?.[hoverIdx];
  const isLoading = isTokensLoading || isArmLoading;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Protocol Revenue',
        })}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1 }}>
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
            {intl.formatNumber(activeItem?.total ?? 0, {
              maximumFractionDigits: 3,
            })}
          </LoadingLabel>
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <StackedBarChart
          height={height}
          width={width}
          barData={serie}
          xKey="timestamp"
          yKeys={[
            { key: 'oeth', fillColor: oTokenConfig['1:OETH'].lineChartColor },
            { key: 'ousd', fillColor: oTokenConfig['1:OUSD'].lineChartColor },
            {
              key: 'superOeth',
              fillColor: oTokenConfig['8453:superOETHb'].lineChartColor,
            },
            {
              key: 'arm',
              fillColor: oTokenConfig['1:ARM-WETH-stETH'].lineChartColor,
            },
          ]}
          tickYFormat={(value: NumberLike) =>
            currency === 'USD'
              ? `$${intl.formatNumber(Number(value), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : `Ξ${intl.formatNumber(Number(value), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
          }
          margins={margins}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          Tooltip={TooltipContent}
        />
      )}
    </Card>
  );
};

type TooltipContentProps = {
  activeItem: Item | null;
} & StackProps;

const TooltipContent = ({ activeItem, ...rest }: TooltipContentProps) => {
  const intl = useIntl();

  if (!activeItem) return null;

  const { timestamp, oeth, ousd, superOeth, arm } = activeItem;

  return (
    <Stack
      {...rest}
      useFlexGap
      sx={[
        {
          backgroundColor: 'background.default',
          p: 1,
          border: '1px solid',
          borderColor: 'common.white',
          borderRadius: 3,
          gap: 0.5,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Typography variant="caption1" color="text.secondary" gutterBottom>
        {format(new Date(timestamp ?? 0), 'dd MMM yyyy')}
      </Typography>
      <ValueLabel
        label={
          <ColorLabel
            label={tokens.mainnet.OETH.name}
            color={oTokenConfig['1:OETH'].lineChartColor}
            labelProps={{ variant: 'caption1' }}
          />
        }
        value={intl.formatNumber(oeth ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={
          <ColorLabel
            label={tokens.mainnet.OUSD.name}
            color={oTokenConfig['1:OUSD'].lineChartColor}
            labelProps={{ variant: 'caption1' }}
          />
        }
        value={intl.formatNumber(ousd ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={
          <ColorLabel
            label={tokens.base.superOETHb.name}
            color={oTokenConfig['8453:superOETHb'].lineChartColor}
            labelProps={{ variant: 'caption1' }}
          />
        }
        value={intl.formatNumber(superOeth ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={
          <ColorLabel
            label="ARM"
            color={
              oTokenConfig[tokens.mainnet['ARM-WETH-stETH'].id].lineChartColor
            }
            labelProps={{ variant: 'caption1' }}
          />
        }
        value={intl.formatNumber(arm ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  spacing: 1,
  sx: {
    py: 0.25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelProps: {
    variant: 'caption1',
    sx: {
      minWidth: 50,
    },
  },
  valueProps: {
    variant: 'caption1',
    color: 'text.primary',
  },
};
