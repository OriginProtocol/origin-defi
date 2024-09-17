import { useCallback, useState } from 'react';

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

import { curveTypes, margin } from './constants';

import type { BoxProps, StackProps } from '@mui/material';
import type { EventType } from '@visx/event/lib/types';
import type { NumberLike } from '@visx/scale';
import type { ComponentType } from 'react';

import type { ChartData } from './types';

export type LineChartProps = {
  width: number;
  height: number;
  data: ChartData[];
  onHover?: (idx: number | null) => void;
  curveType?: keyof typeof curveTypes;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  Tooltip?: ComponentType<{ data: ChartData } & StackProps>;
} & Omit<BoxProps, 'ref' | 'key'>;

export const LineChart = ({
  width,
  height,
  data,
  onHover,
  curveType = 'natural',
  tickXFormat,
  tickYFormat,
  Tooltip,
  ...rest
}: LineChartProps) => {
  const theme = useTheme();
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

  const xScale = scaleUtc({
    range: [margin.left, width - margin.right],
    domain: [
      Math.min(...data.map((d) => d.x)),
      Math.max(...data.map((d) => d.x)),
    ],
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map((d) => d.y))],
  });

  const handlePointerMove = useCallback(
    (event: EventType) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x).getTime();

      const closestIndex = data.reduce((prevIndex, curr, currIndex, array) => {
        const prevDate = array[prevIndex].x;
        const currDate = curr.x;
        return Math.abs(currDate - x0) < Math.abs(prevDate - x0)
          ? currIndex
          : prevIndex;
      }, 0);

      setActiveIdx(closestIndex);
      onHover?.(closestIndex);
      showTooltip({ tooltipLeft: x, tooltipTop: 0 });
    },
    [showTooltip, data, xScale, onHover],
  );

  if (!width || !height) return null;

  const activeItem = activeIdx === null ? null : data[activeIdx];

  return (
    <Box
      {...rest}
      ref={containerRef}
      key={height + width}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { width, height, position: 'relative' },
      ]}
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
        <LinePath
          data={data}
          curve={curveTypes[curveType]}
          x={(d) => xScale(d.x)}
          y={(d) => yScale(d.y)}
          stroke="url(#gradient)"
          strokeWidth={1}
        />
        {width && height && (
          <rect
            x={margin.left}
            y={margin.top}
            width={width - margin.right}
            height={height - margin.bottom - margin.top}
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
        {!activeItem ? null : (
          <line
            x1={xScale(activeItem.x)}
            x2={xScale(activeItem.x)}
            y1={margin.top}
            y2={height - margin.bottom}
            stroke="#0074F0"
            strokeWidth={0.5}
            strokeDasharray={2}
          />
        )}
      </svg>
      {tooltipOpen && activeItem && Tooltip ? (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            background: theme.palette.background.default,
          }}
        >
          <Tooltip data={activeItem} />
        </TooltipWithBounds>
      ) : null}
    </Box>
  );
};
