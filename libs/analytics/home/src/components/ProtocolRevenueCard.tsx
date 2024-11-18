import { Fragment, useId, useMemo, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { oTokenConfig, useTokensChartStats } from '@origin/analytics/shared';
import {
  CurrencyLabel,
  LoadingLabel,
  Spinner,
  ValueLabel,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { AxisRight } from '@visx/axis';
import { AxisBottom } from '@visx/axis';
import { localPoint } from '@visx/event';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { scaleBand } from '@visx/scale';
import { Bar, BarRounded, BarStack } from '@visx/shape';
import { defaultStyles, TooltipWithBounds, useTooltip } from '@visx/tooltip';
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

export const ProtocolRevenueCard = ({
  height,
  ...rest
}: ProtocolRevenueCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const id = useId();
  const { limit, offset, currency } = useHomeView();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const width = measures?.width ?? 0;
  const { data, isLoading } = useTokensChartStats(limit, offset);
  const {
    showTooltip,
    tooltipOpen,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<string>({
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
  });
  const serie = useMemo(() => {
    const serie = [];
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
  const keys = ['oeth', 'ousd', 'superOeth'];

  const xScale = scaleBand({
    range: [margins.left, width - margins.right],
    padding: 0.25,
    domain: serie.map((d) => d.timestamp),
  });
  const yScale = scaleLinear({
    range: [height - margins.bottom, margins.top],
    domain: [0, Math.max(...serie.map((d) => d.total ?? 0))],
  });
  const colorScale = scaleOrdinal({
    domain: keys,
    range: [
      oTokenConfig['1:OETH'].lineChartColor ?? '#282A32',
      oTokenConfig['1:OUSD'].lineChartColor ?? '#4E5967',
      oTokenConfig['8453:superOETHb'].lineChartColor ?? '#46474a',
    ],
  });
  const tickXLabel = {
    fontSize: 11,
    fontFamily: theme.typography.body1.fontFamily,
    fill: theme.palette.text.secondary,
    textAnchor: 'middle',
  } as const;
  const tickYLabel = {
    fontSize: 11,
    fontFamily: theme.typography.body1.fontFamily,
    fill: theme.palette.text.secondary,
    textAnchor: 'start',
  } as const;
  const xFormat = (value: NumberLike) => {
    const date = new Date(value as number);

    return format(date, 'dd MMM');
  };
  const yFormat = (value: NumberLike) => {
    const symbol = currency === 'USD' ? '$' : 'Ξ ';

    return `${symbol}${intl.formatNumber(Number(value), {
      notation: 'compact',
      maximumFractionDigits: 2,
    })}`;
  };
  const rightTicks = yScale.ticks(height / 40);
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
        <Box
          key={id}
          sx={{ height, width, position: 'relative' }}
          onMouseLeave={() => {
            setHoverIdx(null);
          }}
        >
          {tooltipOpen && hoverIdx !== null ? (
            <TooltipWithBounds
              left={tooltipLeft}
              top={tooltipTop}
              style={{
                ...defaultStyles,
                background: theme.palette.background.default,
              }}
            >
              <TooltipContent {...activeItem} />
            </TooltipWithBounds>
          ) : null}
          <svg width={width} height={height}>
            <BarStack
              data={serie}
              keys={keys}
              x={(d) => d.timestamp}
              xScale={xScale}
              yScale={yScale}
              color={colorScale}
            >
              {(barStacks) =>
                barStacks.map((barStack) =>
                  barStack.bars.map((bar, idx) => (
                    <Fragment key={`bar-${idx}`}>
                      <BarRounded
                        radius={2}
                        top={bar.key === 'ousd'}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={
                          bar.index !== hoverIdx
                            ? bar.key === 'ousd'
                              ? '#4E5967'
                              : bar.key === 'superOeth'
                                ? '#46474a'
                                : '#282A32'
                            : bar.key === 'ousd'
                              ? oTokenConfig['1:OUSD'].lineChartColor
                              : bar.key === 'superOeth'
                                ? oTokenConfig['8453:superOETHb'].lineChartColor
                                : oTokenConfig['1:OETH'].lineChartColor
                        }
                      />
                    </Fragment>
                  )),
                )
              }
            </BarStack>
            {serie.map((d, idx) => {
              const barX = xScale(d.timestamp) as number;
              const barWidth = xScale.bandwidth();

              return (
                <Fragment key={`bar-${idx}`}>
                  <Bar
                    x={barX}
                    y={0}
                    width={barWidth}
                    height={height - margins.bottom}
                    fill="transparent"
                    onMouseMove={(event) => {
                      const eventSvgCoords = localPoint(event);
                      setHoverIdx(idx);
                      showTooltip({
                        tooltipLeft: barX,
                        tooltipTop: eventSvgCoords?.y,
                      });
                    }}
                  />
                </Fragment>
              );
            })}
            <AxisRight
              scale={yScale}
              left={width - margins.right}
              stroke={theme.palette.text.secondary}
              tickFormat={yFormat}
              tickLabelProps={tickYLabel}
              numTicks={rightTicks.length}
            />
            <AxisBottom
              scale={xScale}
              stroke={theme.palette.text.secondary}
              tickStroke="transparent"
              top={height - margins.bottom}
              tickFormat={xFormat}
              tickLabelProps={tickXLabel}
              numTicks={6}
            />
          </svg>
        </Box>
      )}
    </Card>
  );
};

type TooltipContentProps = {
  timestamp?: number;
  oeth?: number;
  ousd?: number;
  superOeth?: number;
  total?: number;
} & StackProps;

const TooltipContent = ({
  timestamp,
  oeth,
  ousd,
  superOeth,
  total,
}: TooltipContentProps) => {
  const intl = useIntl();

  return (
    <Stack>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Date' })}
        value={format(new Date(timestamp ?? 0), 'dd MMM yyyy')}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'OETH' })}
        value={intl.formatNumber(oeth ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'OUSD' })}
        value={intl.formatNumber(ousd ?? 0, {
          notation: 'compact',
          minimumFractionDigits: 2,
          maximumFractionDigits: 5,
        })}
        {...valueLabelProps}
      />
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Super OETH' })}
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
