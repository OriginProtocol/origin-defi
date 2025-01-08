import { useId, useMemo } from 'react';

import { alpha, Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { curveCatmullRom } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, BarRounded, LinePath } from '@visx/shape';
import dayjs from 'dayjs';

import { usePoY } from '../hooks';

import type { BoxProps } from '@mui/material';
import type { NumberLike } from '@visx/scale';

export type ChartControllerProps = {
  width: number;
  height: number;
} & Omit<BoxProps, 'ref' | 'key'>;

export const ChartController = ({
  width,
  height,
  ...rest
}: ChartControllerProps) => {
  const theme = useTheme();
  const chartId = useId();
  const {
    chartData: data,
    xKey,
    yKey,
    lineKey,
    selectedId,
    hoveredIdx,
    handleSelect,
    handleItemHover,
  } = usePoY();
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [chartMargins.left, width - chartMargins.right],
        padding: 0.25,
        domain: data?.map((d) => d[xKey] as number) ?? [],
      }),
    [data, width, xKey],
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height - chartMargins.bottom, chartMargins.top],
        domain: [0, Math.max(...(data?.map((d) => d[yKey] as number) ?? []))],
      }),
    [data, height, yKey],
  );

  if (!width || !height) return null;

  const tickXLabel = {
    fontSize: 11,
    fontFamily: theme.typography.body1.fontFamily,
    fill: theme.palette.text.secondary,
    textAnchor: 'middle' as const,
  };
  const tickYLabel = {
    fontSize: 11,
    fontFamily: theme.typography.body1.fontFamily,
    fill: theme.palette.text.secondary,
    textAnchor: 'start' as const,
  };
  const xFormat = (value: NumberLike) =>
    dayjs.utc(value as number).format('DD MMM');
  const tickYFormat = (value: NumberLike) => `${value as number}`;
  const rightTicks = yScale.ticks(height / 40);
  const bottomTicks = getBarChartBottomTicks(width);

  return (
    <Box
      {...rest}
      key={chartId}
      onMouseLeave={() => {
        handleItemHover(-1);
      }}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { position: 'relative', '.bar': { cursor: 'pointer' } },
      ]}
    >
      <svg width={width} height={height}>
        <defs>
          <LinearGradient
            id={`gradient-line-${chartId}`}
            from={theme.palette.chart5}
            to={theme.palette.chart2}
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
          left={width - chartMargins.right}
          stroke={theme.palette.text.secondary}
          tickFormat={tickYFormat}
          tickLabelProps={tickYLabel}
          numTicks={rightTicks.length}
        />
        <AxisBottom
          scale={xScale}
          stroke={theme.palette.text.secondary}
          top={height - chartMargins.bottom}
          tickFormat={xFormat}
          tickLabelProps={tickXLabel}
          numTicks={bottomTicks}
        />
        <GridRows
          left={chartMargins.left}
          scale={yScale}
          width={width - chartMargins.right}
          strokeDasharray="2,4"
          stroke={theme.palette.text.secondary}
          strokeOpacity={0.1}
          numTicks={height / 80}
        />

        {data?.map((d, idx) => {
          const barHeight = yScale(d[yKey] as number) ?? 0;
          const barX = xScale(d[xKey] as number) ?? 0;
          const barWidth = xScale.bandwidth();
          const barColor =
            selectedId === d.id
              ? theme.palette.chart3
              : alpha(theme.palette.chart7, hoveredIdx === idx ? 1 : 0.5);

          return (
            <BarRounded
              key={`bar-${idx}`}
              radius={1}
              x={barX}
              y={barHeight}
              width={barWidth}
              height={height - chartMargins.bottom - barHeight}
              fill={barColor}
            />
          );
        })}
        <LinePath
          data={data ?? []}
          curve={curveCatmullRom}
          x={(d) => (xScale(d[xKey] as number) ?? 0) + xScale.bandwidth() / 2}
          y={(d) => yScale(d[lineKey] as number) ?? 0}
          stroke={`url(#gradient-line-${chartId})`}
          strokeWidth={2}
        />
        {data?.map((d, idx) => {
          const barX = xScale(d[xKey] as number) ?? 0;
          const barWidth = xScale.bandwidth();

          return (
            <Bar
              key={`bar-${idx}`}
              className="bar"
              x={barX}
              y={0}
              width={barWidth}
              height={height - chartMargins.bottom}
              fill="transparent"
              onMouseDown={() => {
                handleSelect(d.id);
              }}
              onMouseMove={() => {
                handleItemHover(idx);
              }}
            />
          );
        })}
      </svg>
    </Box>
  );
};

const chartMargins = { top: 5, left: 25, bottom: 50, right: 50 };

const getBarChartBottomTicks = (width: number) =>
  width < 400 ? 4 : width < 600 ? 8 : 10;
