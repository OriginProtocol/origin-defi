import { useCallback, useId, useMemo, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleUtc } from '@visx/scale';
import { LinePath } from '@visx/shape';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

import { chartMargins, curveTypes } from './constants';
import { getScaleDomains } from './utils';

import type { BoxProps, StackProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { EventType } from '@visx/event/lib/types';
import type { NumberLike } from '@visx/scale';
import type { ComponentType } from 'react';

import type { ChartData, Serie } from './types';

export type LineChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  series: Serie<Datum>[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  Tooltip?: ComponentType<{ series: Serie<Datum>[] | null } & StackProps>;
  margins?: typeof chartMargins;
  showGrid?: boolean;
  hideHoverLine?: boolean;
} & Omit<BoxProps, 'ref' | 'key'>;

export const LineChart = <Datum,>({
  width,
  height,
  series,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  Tooltip,
  margins = chartMargins,
  showGrid = true,
  hideHoverLine,
  ...rest
}: LineChartProps<Datum>) => {
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

  const { minX, maxX, minY, maxY } = getScaleDomains(series);

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

      const closestIndex = series[0].data.reduce(
        (prevIndex, curr, currIndex, array) => {
          const prevDate = array[prevIndex]?.[series[0].xKey] as number;
          const currDate = curr?.[series[0].xKey] as number;
          return Math.abs(currDate - x0) < Math.abs(prevDate - x0)
            ? currIndex
            : prevIndex;
        },
        0,
      );

      setActiveIdx(closestIndex);
      onHover?.(closestIndex);
      showTooltip({ tooltipLeft: x, tooltipTop: 0 });
    },
    [onHover, series, showTooltip, xScale],
  );

  if (!width || !height) return null;

  const activeSeries =
    activeIdx === null
      ? null
      : series.map((s) => ({
          ...s,
          data: [s.data[activeIdx]],
          yAccessor: s.yKey,
        }));
  const bottomTicks = xScale.ticks(Math.floor(width / 100));
  const rightTicks = yScale.ticks(height / 40);
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
      return formatInTimeZone(
        toZonedTime(value as number, 'UTC'),
        'UTC',
        'dd MMM',
      );
    });

  return (
    <Box
      {...rest}
      key={chartId}
      ref={containerRef}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { position: 'relative' },
      ]}
    >
      <svg width={width} height={height}>
        <defs>
          {series.map((s, i) =>
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
          stroke={theme.palette.text.secondary}
          top={height - margins.bottom}
          tickFormat={xFormat}
          numTicks={bottomTicks.length}
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
        {series.map((s, i) => (
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
            strokeWidth={s.strokeWidth ?? 3}
            strokeLinecap="round"
          />
        ))}
        {activeIdx !== null && !hideHoverLine ? (
          <line
            x1={xScale(series[0].data[activeIdx]?.[series[0].xKey] as number)}
            x2={xScale(series[0].data[activeIdx]?.[series[0].xKey] as number)}
            y1={margins.top}
            y2={height - margins.bottom}
            stroke={theme.palette.text.secondary}
            strokeWidth={0.5}
            strokeDasharray={2}
            strokeLinecap="round"
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
