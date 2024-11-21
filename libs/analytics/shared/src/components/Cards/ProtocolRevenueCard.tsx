import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  CurrencyLabel,
  LimitControls,
  LoadingLabel,
  MovingAvgControls,
  Spinner,
  ValueLabel,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { format } from 'date-fns';
import { last } from 'ramda';
import { useIntl } from 'react-intl';

import { oTokenConfig } from '../../constants';
import { useTokenChartStats } from '../../hooks';
import { ColorLabel } from '../Tooltips';
import { CHART_HEADER_HEIGHT } from './constants';

import type { CardProps, StackProps } from '@mui/material';
import type { MovingAvg, ValueLabelProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

import type { ChartResult } from '../../hooks';

export type ProtocolRevenueCardProps = {
  token: Token;
  height: number;
  from?: string;
} & CardProps;

export const ProtocolRevenueCard = ({
  token,
  height,
  from,
  ...rest
}: ProtocolRevenueCardProps) => {
  const config = oTokenConfig[token.id as keyof typeof oTokenConfig];

  const intl = useIntl();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | undefined>(
    config?.protocolRevenueCardDefaultLimit ?? 182,
  );
  const [ma, setMa] = useState<MovingAvg>('feesMovingAvg30Days');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data: feesData, isLoading: isFeesLoading } = useTokenChartStats({
    token,
    limit,
    from: from ?? config?.from,
    offset: 1,
  });

  const width = measures?.width ?? 0;
  const activeItem =
    hoverIdx === null ? last(feesData ?? []) : feesData?.[hoverIdx];

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage(
          {
            defaultMessage: 'Protocol revenue for {symbol}',
          },
          { symbol: token.name },
        )}
      />
      <Divider />
      <CardContent sx={{ minHeight: CHART_HEADER_HEIGHT }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack spacing={1}>
            <LoadingLabel isLoading={isFeesLoading} color="text.secondary">
              {format(
                new Date(activeItem?.timestamp ?? new Date().getTime()),
                'dd MMM yyyy',
              )}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isFeesLoading}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber(activeItem?.feesETH ?? 0)}
            </LoadingLabel>
          </Stack>
          <Stack spacing={1} alignItems="flex-end">
            <LimitControls limit={limit} setLimit={setLimit} />
            <MovingAvgControls ma={ma} setMa={setMa} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}
          useFlexGap
        >
          <Stack direction="row" spacing={1} sx={{ minWidth: 260 }}>
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                background: `linear-gradient(90deg, ${theme.palette.chart5}, ${theme.palette.chart2});`,
              }}
            />
            <Typography
              variant="caption1"
              color="text.secondary"
              sx={{ fontWeight: 'medimum' }}
            >
              {intl.formatMessage({ defaultMessage: 'Moving avergage' })}
            </Typography>
            <Typography variant="caption1" sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber((activeItem?.[ma] as number) ?? 0, {
                notation: 'compact',
                minimumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      {isFeesLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <BarChart
          width={width}
          height={height}
          barData={feesData ?? []}
          xKey="timestamp"
          yKey="feesETH"
          lineData={{
            data: feesData ?? [],
            xKey: 'timestamp',
            yKey: ma,
            color: [theme.palette.chart5, theme.palette.chart2],
            strokeWidth: 3,
          }}
          onHover={(idx) => {
            setHoverIdx(idx ?? null);
          }}
          tickYFormat={(value) => `Ξ${value as number}`}
          barColor={theme.palette.chart7}
          activeBarColor={theme.palette.chart3}
          Tooltip={TooltipContent}
        />
      )}
    </Card>
  );
};

type TooltipContentProps = {
  activeItem: ChartResult | null;
} & StackProps;

const TooltipContent = ({ activeItem, ...rest }: TooltipContentProps) => {
  const intl = useIntl();
  const theme = useTheme();

  if (!activeItem) return null;

  const { timestamp, feesETH, feesMovingAvg7Days, feesMovingAvg30Days } =
    activeItem;

  return (
    <Stack
      spacing={0.5}
      {...rest}
      sx={[
        { backgroundColor: 'background.default', p: 1 },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Date' })}
        labelProps={{ variant: 'caption1' }}
        value={format(new Date(timestamp ?? 0), 'dd MMM yyyy')}
        {...valueLabelProps}
      />
      <ValueLabel
        label={
          <ColorLabel
            label={intl.formatMessage({ defaultMessage: 'Revenue' })}
            color={theme.palette.chart3}
            labelProps={{ variant: 'caption1' }}
          />
        }
        value={intl.formatNumber(feesETH ?? 0, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: '7 day avg' })}
        value={intl.formatNumber(feesMovingAvg7Days ?? 0, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: '30 day avg' })}
        value={intl.formatNumber(feesMovingAvg30Days ?? 0, {
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
