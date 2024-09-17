import { Fragment, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { curveCatmullRom } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, BarRounded, LinePath } from '@visx/shape';

import { margin } from './constants';

import type { BoxProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';

import type { ChartData } from './types';

export type BarChartProps = {
  width: number;
  height: number;
  barData: ChartData[];
  lineData?: ChartData[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  yScaleDomain?: [number, number];
} & Omit<BoxProps, 'ref' | 'key'>;

export const BarChart = ({
  width,
  height,
  barData,
  lineData,
  onHover,
  tickXFormat,
  tickYFormat,
  yScaleDomain,
  ...rest
}: BarChartProps) => {
  const theme = useTheme();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    padding: 0.25,
    domain: barData.map((d) => d.x),
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: yScaleDomain ?? [0, Math.max(...barData.map((d) => d.y))],
  });

  if (!width || !height) return null;

  return (
    <Box
      {...rest}
      key={height + width}
      style={{ height, width, position: 'relative' }}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { width, height },
      ]}
      onMouseLeave={() => {
        setActiveIdx(null);
        onHover?.(null);
      }}
    >
      <svg width={width} height={height}>
        <defs>
          <LinearGradient
            id="gradient"
            from={theme.palette.chart5}
            to={theme.palette.chart4}
            fromOffset="20%"
            toOffset="80%"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          />
        </defs>
        <AxisRight
          scale={yScale}
          left={width - margin.right}
          stroke={theme.palette.text.secondary}
          tickFormat={tickYFormat}
          tickLabelProps={{
            fontSize: 11,
            fontFamily: theme.typography.body1.fontFamily,
            fill: theme.palette.text.secondary,
            textAnchor: 'start',
          }}
          numTicks={Math.floor(height / 40)}
        />
        <AxisBottom
          scale={xScale}
          stroke={theme.palette.text.secondary}
          top={height - margin.bottom}
          tickFormat={tickXFormat}
          tickLabelProps={{
            fontSize: 11,
            fontFamily: theme.typography.body1.fontFamily,
            fill: theme.palette.text.secondary,
          }}
        />
        <GridRows
          left={margin.left}
          scale={yScale}
          width={width - margin.right}
          strokeDasharray="2,4"
          stroke="#ffffff"
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
                height={height - margin.bottom - barHeight}
                fill={
                  activeIdx === idx
                    ? theme.palette.chart4
                    : theme.palette.chart6
                }
              />
              <Bar
                x={barX}
                y={0}
                width={barWidth}
                height={height - margin.bottom}
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
            stroke="url(#gradient)"
            strokeWidth={2}
          />
        )}
      </svg>
    </Box>
  );
};
