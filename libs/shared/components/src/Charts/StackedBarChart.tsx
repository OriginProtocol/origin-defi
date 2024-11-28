import { Fragment, useId, useState } from 'react';

import { Box, darken, lighten, useTheme } from '@mui/material';
import { AxisRight } from '@visx/axis';
import { AxisBottom } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { scaleBand } from '@visx/scale';
import { Bar, BarRounded, BarStack, LinePath } from '@visx/shape';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';
import { format } from 'date-fns';

import { chartMargins, curveTypes } from './constants';
import { getBarChartBottomTicks } from './utils';

import type { BoxProps, StackProps } from '@mui/material';
import type { TickFormatter, TickLabelProps } from '@visx/axis';
import type { NumberLike } from '@visx/scale';
import type { ComponentType } from 'react';

import type { ChartData, Serie } from './types';

export type YKeyStackedBar<Datum = ChartData> = {
  key: keyof Datum;
  fillColor?: string;
  hoverFillColor?: string;
  label?: string;
};

export type StackedBarChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  barData: Datum[];
  xKey: keyof Datum;
  yKeys: YKeyStackedBar<Datum>[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: TickFormatter<string>;
  tickYFormat?: TickFormatter<NumberLike>;
  tickXLabelProps?: TickLabelProps<string>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  lineData?: Serie<Datum>;
  Tooltip?: ComponentType<{ series: Serie<Datum>[] | null } & StackProps>;
  margins?: typeof chartMargins;
  barPadding?: number;
  showGrid?: boolean;
} & Omit<BoxProps, 'ref' | 'key'>;

export const StackedBarChart = <Datum,>({
  height,
  width,
  barData,
  xKey,
  yKeys,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  lineData,
  Tooltip,
  margins = chartMargins,
  barPadding = 0.25,
  showGrid = false,
  ...rest
}: StackedBarChartProps<Datum>) => {
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

  const xScale = scaleBand({
    range: [margins.left, width - margins.right],
    padding: barPadding,
    domain: barData.map((d) => d[xKey] as string),
  });
  const yScale = scaleLinear({
    range: [height - margins.bottom, margins.top],
    domain: yScaleDomain ?? [
      0,
      Math.max(
        ...barData.reduce((acc, curr) => {
          return [...acc, yKeys.reduce((a, c) => a + Number(curr[c.key]), 0)];
        }, [] as number[]),
      ),
    ],
  });
  const colorScale = scaleOrdinal<string, string>({
    domain: yKeys.map((y) => y.key as string),
    range: yKeys.map((y) => y?.fillColor ?? theme.palette.primary.main),
  });
  const tickXLabel =
    tickXLabelProps ??
    ({
      fontSize: 11,
      fontFamily: theme.typography.body1.fontFamily,
      fill: theme.palette.text.secondary,
      textAnchor: 'middle',
    } as const);
  const tickYLabel =
    tickYLabelProps ??
    ({
      fontSize: 11,
      fontFamily: theme.typography.body1.fontFamily,
      fill: theme.palette.text.secondary,
      textAnchor: 'start',
    } as const);
  const xFormat =
    tickXFormat ??
    ((value: string) => {
      const date = new Date(Number(value));

      return format(date, 'dd MMM');
    });

  const rightTicks = yScale.ticks(height / 40);
  const bottomTicks = getBarChartBottomTicks(width);
  const activeItem = activeIdx === null ? null : barData[activeIdx];
  const activeSeries =
    activeIdx === null
      ? null
      : yKeys.map(
          (y) =>
            ({
              data: [activeItem],
              xKey,
              yKey: y.key,
              color: y.fillColor,
              label: y.label,
            }) as Serie<Datum>,
        );
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
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
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
          tickStroke="transparent"
          top={height - margins.bottom}
          tickFormat={xFormat}
          tickLabelProps={tickXLabel}
          numTicks={bottomTicks}
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
        <BarStack<Datum>
          data={barData}
          keys={yKeys.map((y) => y.key as string)}
          x={(d) => d[xKey] as string}
          xScale={xScale}
          yScale={yScale}
          color={(key) => colorScale(key as string)}
        >
          {(barStacks) =>
            barStacks.map((barStack) =>
              barStack.bars.map((bar, idx) => {
                const isActive = bar.index === activeIdx;
                const fillColor =
                  yKeys.find((y) => y.key === bar.key)?.fillColor ??
                  theme.palette.primary.main;
                const activeFillColor =
                  yKeys.find((y) => y.key === bar.key)?.hoverFillColor ??
                  (theme.palette.mode === 'dark'
                    ? lighten(fillColor, 0.3)
                    : darken(fillColor, 0.2)) ??
                  theme.palette.primary.light;

                return (
                  <Fragment key={`bar-${idx}`}>
                    <BarRounded
                      radius={2}
                      top={bar.index === barStack.bars.length - 1}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={isActive ? activeFillColor : fillColor}
                    />
                  </Fragment>
                );
              }),
            )
          }
        </BarStack>
        {lineData && (
          <LinePath
            data={lineData.data}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            curve={curveLine as any}
            x={(d) =>
              (xScale(d[lineData.xKey] as string) ?? 0) + xScale.bandwidth() / 2
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
          const barX = xScale(d[xKey] as string) as number;
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
                setActiveIdx(idx);
                onHover?.(idx);
                showTooltip({
                  tooltipLeft: barX,
                  tooltipTop: 0,
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
