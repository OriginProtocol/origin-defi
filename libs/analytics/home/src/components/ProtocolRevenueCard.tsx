import { useMemo, useState } from 'react';

import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { oTokenConfig, useTokensChartStats } from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LoadingLabel,
  Spinner,
  StackedBarChart,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { useHomeView } from '../hooks';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

export type ProtocolRevenueCardProps = {
  height: number;
} & CardProps;

type Item = {
  timestamp: number;
  oeth?: number;
  ousd?: number;
  superOeth?: number;
  total?: number;
};

export const ProtocolRevenueCard = ({
  height,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const { limit, offset, currency } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const width = measures?.width ?? 0;
  const { data, isLoading } = useTokensChartStats(limit, offset);
  const serie = useMemo(() => {
    const serie: Item[] = [];
    for (let i = 0; i < (data?.totals?.length ?? 0); i++) {
      const oeth = data?.['1:OETH'][i];
      const ousd = data?.['1:OUSD'][i];
      const superOeth = data?.['8453:superOETHb'][i];
      const totals = data?.totals[i];

      serie.push({
        timestamp: oeth?.timestamp ?? 0,
        oeth: currency === 'USD' ? oeth?.feesUSD : oeth?.feesETH,
        ousd: currency === 'USD' ? ousd?.feesUSD : ousd?.feesETH,
        superOeth: currency === 'USD' ? superOeth?.feesUSD : superOeth?.feesETH,
        total: currency === 'USD' ? totals?.feesUSD : totals?.feesETH,
      });
    }
    return serie;
  }, [currency, data]);

  const margins = { top: 5, left: 25, right: 60, bottom: 50 };
  const activeItem = hoverIdx === null ? last(serie ?? []) : serie?.[hoverIdx];

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

const TooltipContent = ({ activeItem }: TooltipContentProps) => {
  const intl = useIntl();

  if (!activeItem) return null;

  const { timestamp, oeth, ousd, superOeth, total } = activeItem;

  return (
    <Stack>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Date' })}
        value={format(new Date(timestamp ?? 0), 'dd MMM yyyy')}
        {...valueLabelProps}
      />
      <ValueLabel
        label={tokens.mainnet.OETH.name}
        value={intl.formatNumber(oeth ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={tokens.mainnet.OUSD.name}
        value={intl.formatNumber(ousd ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={tokens.base.superOETHb.name}
        value={intl.formatNumber(superOeth ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Total' })}
        value={intl.formatNumber(total ?? 0, {
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
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  labelProps: {
    sx: {
      minWidth: 50,
    },
  },
  valueProps: {
    color: 'text.primary',
  },
};
