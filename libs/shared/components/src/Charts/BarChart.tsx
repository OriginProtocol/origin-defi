import { Fragment, useId, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { curveCatmullRom } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, BarRounded, LinePath } from '@visx/shape';

import { chartMargins } from './constants';

import type { BoxProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { NumberLike } from '@visx/scale';

import type { ChartColor, ChartData } from './types';

export type BarChartProps = {
  width: number;
  height: number;
  barData: ChartData[];
  barColor?: ChartColor;
  activeBarColor?: ChartColor;
  lineData?: ChartData[];
  lineColor?: ChartColor;
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  margins?: typeof chartMargins;
} & Omit<BoxProps, 'ref' | 'key'>;

export const BarChart = ({
  width,
  height,
  barData,
  barColor,
  activeBarColor,
  lineData,
  lineColor,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  margins = chartMargins,
  ...rest
}: BarChartProps) => {
  const theme = useTheme();
  const chartId = useId();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const xScale = scaleBand({
    range: [margins.left, width - margins.right],
    padding: 0.25,
    domain: barData.map((d) => d.x),
  });

  const yScale = scaleLinear({
    range: [height - margins.bottom, margins.top],
    domain: yScaleDomain ?? [0, Math.max(...barData.map((d) => d.y))],
  });

  if (!width || !height) return null;

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

  return (
    <Box
      {...rest}
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
          {Array.isArray(lineColor) && lineColor.length === 2 ? (
            <LinearGradient
              id={`gradient-line-${chartId}`}
              from={lineColor[0]}
              to={lineColor[1]}
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
          tickFormat={tickXFormat}
          tickLabelProps={tickXLabel}
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
          const barHeight = yScale(d.y);
          const barX = xScale(d.x) as number;
          const barWidth = xScale.bandwidth();

          return (
            <Fragment key={`bar-${idx}`}>
              <BarRounded
                radius={1}
                x={barX}
                y={barHeight}
                width={barWidth}
                height={height - margins.bottom - barHeight}
                fill={
                  activeIdx === idx
                    ? Array.isArray(activeBarColor)
                      ? `url(#gradient-active-${chartId})`
                      : (activeBarColor ?? theme.palette.primary.light)
                    : Array.isArray(barColor)
                      ? `url(#gradient-bar-${chartId})`
                      : (barColor ?? theme.palette.primary.main)
                }
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
            data={lineData}
            curve={curveCatmullRom}
            x={(d) => (xScale(d.x) as number) + xScale.bandwidth() / 2}
            y={(d) => yScale(d.y)}
            stroke={
              Array.isArray(lineColor)
                ? `url(#gradient-line-${chartId})`
                : (lineColor ?? theme.palette.primary.main)
            }
            strokeWidth={2}
          />
        )}
      </svg>
    </Box>
  );
};
