import { useCallback, useId, useMemo, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { scaleLinear, scaleUtc } from '@visx/scale';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';
import { voronoi } from '@visx/voronoi';
import { format } from 'date-fns';

import { chartMargins } from './constants';
import { getScaleDomains } from './utils';

import type { BoxProps, StackProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { EventType } from '@visx/event/lib/types';
import type { NumberLike } from '@visx/scale';
import type { ComponentType } from 'react';

import type { ChartColor, Serie } from './types';

type BubbleChartData = {
  x: number;
  y: number;
  r: number;
};

export type BubbleSerie<Datum> = {
  data: Datum[];
  xKey: keyof Datum;
  yKey: keyof Datum;
  rKey: keyof Datum;
  color?: ChartColor;
  label?: string;
};

export type BubbleChartProps<Datum = BubbleChartData> = {
  width: number;
  height: number;
  series: BubbleSerie<Datum>[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  Tooltip?: ComponentType<{ series: Serie<Datum>[] | null } & StackProps>;
  margins?: typeof chartMargins;
  showGrid?: boolean;
} & BoxProps;

export const BubbleChart = <Datum,>({
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
  ...rest
}: BubbleChartProps<Datum>) => {
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

  const { minX, maxX, minY, maxY } = getScaleDomains(
    series,
    [1, 1.000001],
    [0.9999, 1.0001],
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
    [margins.bottom, height, margins.top, yScaleDomain, minY, maxY],
  );

  const allData = series.flatMap((s) => s.data);

  const voronoiLayout = useMemo(
    () =>
      voronoi<Datum>({
        x: (d) => xScale(d[series[0].xKey] as number) ?? 0,
        y: (d) => yScale(d[series[0].yKey] as number) ?? 0,
        width,
        height,
      })(allData),
    [width, height, allData, xScale, series, yScale],
  );

  const handlePointerMove = useCallback(
    (event: EventType) => {
      const point = localPoint(event);
      if (!point) return;
      const neighborRadius = 100;
      const closest = voronoiLayout.find(point.x, point.y, neighborRadius);

      if (closest) {
        showTooltip({
          tooltipLeft: xScale(closest.data[series[0].xKey] as number),
          tooltipTop: yScale(closest.data[series[0].yKey] as number),
        });
      }

      // setActiveIdx(closestIndex);
      // onHover?.(closestIndex);
      // showTooltip({ tooltipLeft: x, tooltipTop: y });
    },
    [series, showTooltip, voronoiLayout, xScale, yScale],
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
  const bottomTicks = xScale.ticks(width / 100);
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
      const date = new Date(value as number);

      return format(date, 'dd MMM hh:mm');
    });

  return (
    <Box
      {...rest}
      key={chartId}
      ref={containerRef}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        {
          position: 'relative',
          '.circle': {
            cursor: 'pointer',
            '&:hover': { opacity: 0.5 },
          },
        },
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
        {series.map((serie, i) => {
          const fillColor = serie?.color
            ? Array.isArray(serie.color)
              ? serie.color.length === 2
                ? `url(#gradient-${chartId}-${i})`
                : serie.color[0]
              : serie.color
            : theme.palette.primary.main;

          return serie.data.map((d, j) => {
            const cx = xScale(d[serie.xKey] as number);
            const cy = yScale(d[serie.yKey] as number);
            const r = Math.log((d[serie.rKey] as number) + 5) * 5;

            return (
              <circle
                key={`${String(serie.yKey)}}-${String(serie?.label ?? i)}-${j}`}
                cx={cx}
                cy={cy}
                r={r}
                fill={fillColor}
                fillOpacity={0.9}
                className="circle"
              />
            );
          });
        })}
        {/* {width && height && (
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
        )} */}
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
