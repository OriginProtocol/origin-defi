import { Fragment, useCallback, useId, useState } from 'react';

import { alpha, Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleUtc } from '@visx/scale';
import { AreaStack, LinePath } from '@visx/shape';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';
import { format } from 'date-fns';

import { chartMargins, curveTypes } from './constants';
import { getStackedScaleDomains } from './utils';

import type { BoxProps, StackProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { EventType } from '@visx/event/lib/types';
import type { NumberLike } from '@visx/scale';
import type { StackKey } from '@visx/shape/lib/types';
import type { ComponentType } from 'react';

import type { ChartColor, ChartData, Serie } from './types';

export type YKey<Datum = ChartData> = {
  key: keyof Datum;
  lineColor?: ChartColor;
  fillColor?: ChartColor;
  label?: string;
};

export type AreaChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  serie: Datum[];
  series?: Serie<Datum>[];
  xKey: keyof Datum;
  yKeys: YKey<Datum>[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  Tooltip?: ComponentType<{ series: Serie<Datum>[] | null } & StackProps>;
  margins?: typeof chartMargins;
  curveType?: keyof typeof curveTypes;
  showGrid?: boolean;
} & Omit<BoxProps, 'ref' | 'key'>;

export const AreaChart = <Datum,>({
  width,
  height,
  serie,
  series,
  xKey,
  yKeys,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  Tooltip,
  margins = chartMargins,
  curveType = 'natural',
  showGrid = true,
  ...rest
}: AreaChartProps<Datum>) => {
  const theme = useTheme();
  const chartId = useId();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { containerRef } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });
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

  const { minX, maxX, minY, maxY } = getStackedScaleDomains(
    serie,
    yKeys.map((yKey) => yKey.key),
    xKey,
  );

  const xScale = scaleUtc({
    range: [margins.left, width - margins.right],
    domain: [minX, maxX],
    clamp: true,
  });

  const yScale = scaleLinear({
    range: [height - margins.bottom, margins.top],
    domain: yScaleDomain ?? [minY, maxY],
    clamp: true,
  });

  const handlePointerMove = useCallback(
    (event: EventType) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x).getTime();

      const closestIndex = serie.reduce((prevIndex, curr, currIndex, array) => {
        const prevDate = array[prevIndex]?.[xKey] as number;
        const currDate = curr?.[xKey] as number;
        return Math.abs(currDate - x0) < Math.abs(prevDate - x0)
          ? currIndex
          : prevIndex;
      }, 0);

      setActiveIdx(closestIndex);
      onHover?.(closestIndex);
      showTooltip({ tooltipLeft: x, tooltipTop: 0 });
    },
    [onHover, serie, showTooltip, xKey, xScale],
  );

  if (!width || !height) return null;

  const activeSeries =
    activeIdx === null
      ? null
      : yKeys.map((yKey) => ({
          data: [serie[activeIdx]],
          label: yKey.label,
          xKey,
          yKey: yKey.key,
        }));
  const bottomTicks = xScale.ticks(Math.floor(width / 100));
  const rightTicks = yScale.ticks(Math.floor(height / 40));
  const tickXLabel = tickXLabelProps ?? {
    fontSize: 11,
    fontFamily: theme.typography.body1.fontFamily,
    fill: theme.palette.text.secondary,
    textAnchor: 'middle',
  };
  const tickYLabel = tickYLabelProps ?? {
    fontSize: 11,
    fontFamily: theme.typography.body1.fontFamily,
    fill: theme.palette.text.secondary,
    textAnchor: 'start',
  };
  const xFormat =
    tickXFormat ??
    ((value: NumberLike) => {
      const date = new Date(value as number);
      return format(date, 'dd MMM');
    });

  return (
    <Box
      {...rest}
      ref={containerRef}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { position: 'relative' },
      ]}
    >
      <svg width={width} height={height}>
        <defs>
          {yKeys.map((k) => {
            if (Array.isArray(k.fillColor) && k.fillColor.length === 2) {
              return (
                <LinearGradient
                  key={`gradient-fill-${chartId}-${k.key as string}`}
                  id={`gradient-fill-${chartId}-${k.key as string}`}
                  from={k.fillColor[0]}
                  to={k.fillColor[1]}
                  fromOffset="0%"
                  toOffset="100%"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="0%"
                />
              );
            }
            return null;
          })}
          {yKeys.map((k) => {
            if (Array.isArray(k.lineColor) && k.lineColor.length === 2) {
              return (
                <LinearGradient
                  key={`gradient-line-${chartId}-${k.key as string}`}
                  id={`gradient-line-${chartId}-${k.key as string}`}
                  from={k.lineColor[0]}
                  to={k.lineColor[1]}
                  fromOffset="0%"
                  toOffset="100%"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="0%"
                />
              );
            }
            return null;
          })}
          {series?.map((s, i) =>
            Array.isArray(s.color) && s.color.length === 2 ? (
              <LinearGradient
                key={`gradient-${chartId}-${i}`}
                id={`gradient-${chartId}-${i}`}
                from={s.color?.[0]}
                to={s.color?.[1]}
                fromOffset="0%"
                toOffset="100%"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              />
            ) : null,
          )}
        </defs>
        <AxisRight
          scale={yScale}
          left={width - margins.right}
          stroke={theme.palette.text.secondary}
          tickFormat={tickYFormat}
          tickLabelProps={tickYLabel}
          numTicks={rightTicks.length}
        />
        <AxisBottom
          scale={xScale}
          top={height - margins.bottom}
          tickFormat={xFormat}
          numTicks={bottomTicks.length}
          stroke={theme.palette.text.secondary}
          tickLabelProps={tickXLabel}
        />
        {showGrid && (
          <GridRows
            left={margins.left}
            scale={yScale}
            width={width - margins.right}
            strokeDasharray="2,4"
            stroke={theme.palette.text.secondary}
            strokeOpacity={0.1}
            numTicks={height / 80}
          />
        )}
        <AreaStack
          data={serie}
          keys={yKeys.map((yKey) => yKey.key) as StackKey[]}
          curve={curveTypes[curveType]}
          x={(d) => xScale(d.data?.[xKey] as number)}
          y0={(d) => yScale(d[0])}
          y1={(d) => yScale(d[1])}
        >
          {({ stacks, path }) =>
            stacks.map((stack, index) => {
              const yKey = yKeys[index];
              const lineColor = Array.isArray(yKey.lineColor)
                ? `url(#gradient-line-${chartId}-${String(yKey.key)})`
                : (yKey.lineColor ?? theme.palette.primary.main);
              const fillColor = Array.isArray(yKey.fillColor)
                ? `url(#gradient-fill-${chartId}-${String(yKey.key)})`
                : (yKey.fillColor ?? alpha(theme.palette.primary.main, 0.4));

              return (
                <Fragment key={`stack-${stack.key}`}>
                  <path
                    d={path(stack) || ''}
                    fill={fillColor}
                    strokeLinecap="round"
                  />
                  {!!yKey.lineColor && (
                    <LinePath
                      data={stack}
                      curve={curveTypes[curveType ?? 'natural']}
                      x={(d) => xScale(d.data[xKey] as number)}
                      y={(d) => yScale(d[1]) + 1}
                      stroke={lineColor}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  )}
                </Fragment>
              );
            })
          }
        </AreaStack>
        {series?.map((s, i) => (
          <LinePath
            key={`serie-${i}`}
            data={s.data}
            curve={curveTypes[s.curveType ?? 'natural']}
            x={(d) => xScale(d?.[s.xKey] as number)}
            y={(d) => yScale(d?.[s.yKey] as number)}
            stroke={
              Array.isArray(s.color)
                ? `url(#gradient-${chartId}-${i})`
                : (s.color ?? theme.palette.primary.main)
            }
            strokeWidth={s.strokeWidth ?? 1}
            strokeLinecap="round"
          />
        ))}
        {activeIdx !== null ? (
          <line
            x1={xScale(activeSeries?.[0].data[0][xKey] as number)}
            x2={xScale(activeSeries?.[0].data[0][xKey] as number)}
            y1={margins.top}
            y2={height - margins.bottom}
            stroke={theme.palette.text.secondary}
            strokeWidth={0.5}
            strokeDasharray={2}
          />
        ) : null}
        {width && height && (
          <rect
            x={margins.left}
            y={margins.top}
            width={width - margins.right}
            height={height - margins.bottom - margins.top}
            fill="transparent"
            onTouchStart={handlePointerMove}
            onTouchMove={handlePointerMove}
            onMouseMove={handlePointerMove}
            onMouseLeave={() => {
              setActiveIdx(null);
              onHover?.(null);
            }}
          />
        )}
      </svg>
      {tooltipOpen && activeIdx !== null && Tooltip ? (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            background: 'transparent',
          }}
        >
          <Tooltip series={activeSeries} />
        </TooltipWithBounds>
      ) : null}
    </Box>
  );
};
