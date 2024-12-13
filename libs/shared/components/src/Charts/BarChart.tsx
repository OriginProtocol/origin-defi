import { Fragment, useId, useMemo, useState } from 'react';

import { Box, darken, lighten, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, BarRounded, LinePath } from '@visx/shape';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

import { chartMargins, curveTypes } from './constants';
import { getBarChartBottomTicks } from './utils';

import type { BoxProps, StackProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { NumberLike } from '@visx/scale';
import type { ComponentType } from 'react';

import type { ChartColor, ChartData, Serie } from './types';

export type BarChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  barData: Datum[];
  xKey: keyof Datum;
  yKey: keyof Datum;
  barColor?: ChartColor;
  activeBarColor?: ChartColor;
  lineData?: Serie<Datum>;
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  Tooltip?: ComponentType<{ series: Serie<Datum>[] | null } & StackProps>;
  margins?: typeof chartMargins;
} & Omit<BoxProps, 'ref' | 'key'>;

export const BarChart = <Datum,>({
  width,
  height,
  barData,
  xKey,
  yKey,
  barColor,
  activeBarColor,
  lineData,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  Tooltip,
  margins = chartMargins,
  ...rest
}: BarChartProps<Datum>) => {
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

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [margins.left, width - margins.right],
        padding: 0.25,
        domain: barData.map((d) => d[xKey] as number),
      }),
    [margins.left, width, margins.right, barData, xKey],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height - margins.bottom, margins.top],
        domain: yScaleDomain ?? [
          0,
          Math.max(...barData.map((d) => d[yKey] as number)),
        ],
      }),
    [height, margins.bottom, margins.top, yScaleDomain, barData, yKey],
  );

  if (!width || !height) return null;

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

  const rightTicks = yScale.ticks(height / 40);
  const bottomTicks = getBarChartBottomTicks(width);
  const activeItem = activeIdx === null ? null : barData[activeIdx];
  const activeLineData =
    lineData && activeIdx !== null
      ? {
          data: [lineData.data[activeIdx]],
          xKey: lineData.xKey,
          yKey: lineData.yKey,
          color: lineData.color,
          label: lineData.label,
        }
      : null;
  const activeSeries =
    activeIdx === null
      ? null
      : [
          {
            data: [activeItem],
            xKey,
            yKey,
            color: barColor,
            label: yKey,
          } as Serie<Datum>,
          ...(activeLineData ? [activeLineData] : []),
        ];
  const curveLine =
    curveTypes[
      lineData?.curveType
        ? lineData.curveType === 'base'
          ? 'curveCatmullRom'
          : lineData.curveType
        : 'curveCatmullRom'
    ];

  return (
    <Box
      {...rest}
      key={chartId}
      ref={containerRef}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { position: 'relative' },
      ]}
      onMouseLeave={() => {
        setActiveIdx(null);
        onHover?.(null);
      }}
    >
      <svg width={width} height={height}>
        <defs>
          {lineData &&
          Array.isArray(lineData.color) &&
          lineData.color.length === 2 ? (
            <LinearGradient
              id={`gradient-line-${chartId}`}
              from={lineData.color[0]}
              to={lineData.color[1]}
              fromOffset="20%"
              toOffset="80%"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            />
          ) : null}
          {Array.isArray(barColor) && barColor.length === 2 ? (
            <LinearGradient
              id={`gradient-bar-${chartId}`}
              from={barColor[0]}
              to={barColor[1]}
              fromOffset="20%"
              toOffset="80%"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            />
          ) : null}
          {Array.isArray(activeBarColor) && activeBarColor.length === 2 ? (
            <LinearGradient
              id={`gradient-active-${chartId}`}
              from={activeBarColor[0]}
              to={activeBarColor[1]}
              fromOffset="20%"
              toOffset="80%"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            />
          ) : null}
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
          tickLabelProps={tickXLabel}
          numTicks={bottomTicks}
        />
        <GridRows
          left={margins.left}
          scale={yScale}
          width={width - margins.right}
          strokeDasharray="2,4"
          stroke={theme.palette.text.secondary}
          strokeOpacity={0.1}
          numTicks={height / 80}
        />

        {barData.map((d, idx) => {
          const barHeight = yScale(d[yKey] as number) ?? 0;
          const barX = xScale(d[xKey] as number) ?? 0;
          const barWidth = xScale.bandwidth();
          const inactiveBarColor = Array.isArray(barColor)
            ? `url(#gradient-bar-${chartId})`
            : (barColor ?? theme.palette.primary.main);
          const actBarColor = activeBarColor
            ? Array.isArray(activeBarColor)
              ? `url(#gradient-active-${chartId})`
              : activeBarColor
            : theme.palette.mode === 'light'
              ? darken(inactiveBarColor, 0.3)
              : lighten(inactiveBarColor, 0.2);

          return (
            <Fragment key={`bar-${idx}`}>
              <BarRounded
                radius={1}
                x={barX}
                y={barHeight}
                width={barWidth}
                height={height - margins.bottom - barHeight}
                fill={activeIdx === idx ? actBarColor : inactiveBarColor}
              />
              <Bar
                x={barX}
                y={0}
                width={barWidth}
                height={height - margins.bottom}
                fill="transparent"
                onMouseOver={() => {
                  setActiveIdx(idx);
                  onHover?.(idx);
                }}
              />
            </Fragment>
          );
        })}
        {lineData && (
          <LinePath
            data={lineData.data}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            curve={curveLine as any}
            x={(d) =>
              (xScale(d[lineData.xKey] as number) ?? 0) + xScale.bandwidth() / 2
            }
            y={(d) => yScale(d[lineData.yKey] as number) ?? 0}
            stroke={
              Array.isArray(lineData.color)
                ? `url(#gradient-line-${chartId})`
                : (lineData.color ?? theme.palette.primary.main)
            }
            strokeWidth={lineData.strokeWidth}
          />
        )}
        {barData.map((d, idx) => {
          const barX = xScale(d[xKey] as number) ?? 0;
          const barWidth = xScale.bandwidth();

          return (
            <Bar
              key={`bar-${idx}`}
              x={barX}
              y={0}
              width={barWidth}
              height={height - margins.bottom}
              fill="transparent"
              onMouseMove={(event) => {
                const eventSvgCoords = localPoint(event);
                setActiveIdx(idx);
                onHover?.(idx);
                showTooltip({
                  tooltipLeft: barX,
                  tooltipTop: eventSvgCoords?.y,
                });
              }}
            />
          );
        })}
      </svg>
      {Tooltip && tooltipOpen && activeIdx !== null ? (
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
