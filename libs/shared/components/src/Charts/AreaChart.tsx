import { Fragment, useCallback, useId, useMemo, useState } from 'react';

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
import dayjs from 'dayjs';

import { ChartTooltip } from './ChartTooltip';
import { chartMargins, curveTypes } from './constants';
import { getStackedScaleDomains } from './utils';

import type { BoxProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { EventType } from '@visx/event/lib/types';
import type { NumberLike } from '@visx/scale';
import type { StackKey } from '@visx/shape/lib/types';

import type { ChartColor, ChartData, ChartTooltipLabel, Serie } from './types';

export type YKey<Datum = ChartData> = {
  key: keyof Datum;
  lineColor?: ChartColor;
  fillColor?: ChartColor;
  label?: string;
};

export type AreaChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  data: Datum[];
  series?: Serie<Datum>[];
  xKey: keyof Datum;
  yKeys: YKey<Datum>[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  margins?: typeof chartMargins;
  curveType?: keyof typeof curveTypes;
  showGrid?: boolean;
  tooltipLabels?: ChartTooltipLabel<Datum>[];
} & Omit<BoxProps, 'ref' | 'key'>;

export const AreaChart = <Datum,>({
  width,
  height,
  data,
  series,
  xKey,
  yKeys,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  margins = chartMargins,
  curveType = 'natural',
  showGrid = true,
  tooltipLabels,
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
    data,
    yKeys.map((yKey) => yKey.key),
    xKey,
  );

  const xScale = useMemo(
    () =>
      scaleUtc({
        range: [margins.left, width - margins.right],
        domain: [minX, maxX],
        clamp: true,
      }),
    [margins.left, width, margins.right, minX, maxX],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height - margins.bottom, margins.top],
        domain: yScaleDomain ?? [minY, maxY],
        clamp: true,
      }),
    [height, margins.bottom, margins.top, yScaleDomain, minY, maxY],
  );

  const handlePointerMove = useCallback(
    (event: EventType) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x).getTime();

      const closestIndex = data.reduce((prevIndex, curr, currIndex, array) => {
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
    [onHover, data, showTooltip, xKey, xScale],
  );

  if (!width || !height) return null;

  const activeItem = activeIdx === null ? null : data[activeIdx];
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
      return dayjs.utc(value as number).format('DD MMM');
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
          data={data}
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
            data={data}
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
        {activeItem ? (
          <line
            x1={xScale(activeItem[xKey] as number)}
            x2={xScale(activeItem[xKey] as number)}
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
      {tooltipOpen && activeIdx !== null && tooltipLabels?.length ? (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <ChartTooltip<Datum>
            item={activeItem}
            tooltipLabels={tooltipLabels}
          />
        </TooltipWithBounds>
      ) : null}
    </Box>
  );
};
