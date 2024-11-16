import { Fragment, useState } from 'react';
import { useId } from 'react';

import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, BarRounded, BarStack } from '@visx/shape';
import { useTooltip } from '@visx/tooltip';
import { useTooltipInPortal } from '@visx/tooltip';
import { format } from 'date-fns';

import { chartMargins } from './constants';
import { getStackedScaleDomains } from './utils';

import type { BoxProps } from '@mui/material';
import type { TickLabelProps } from '@visx/axis';
import type { NumberLike } from '@visx/scale';

import type { curveTypes } from './constants';
import type { ChartData } from './types';

export type YKey<Datum = ChartData> = {
  key: keyof Datum;
  fillColor?: string;
  label?: string;
};

export type BarStackChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  serie: Datum[];
  xKey: keyof Datum;
  yKeys: YKey<Datum>[];
  tickFormat: (value: NumberLike) => string;
  onHover: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  margins?: typeof chartMargins;
  curveType?: keyof typeof curveTypes;
  showGrid?: boolean;
} & BoxProps;

export const BarStackChart = ({
  width,
  height,
  serie,
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
  showGrid,
  ...rest
}: BarStackChartProps) => {
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

  const xScale = scaleBand({
    range: [margins.left, width - margins.right],
    padding: 0.25,
    domain: serie.map((d) => d[xKey]),
  });

  const yScale = scaleLinear({
    range: [height - margins.bottom, margins.top],
    domain: yScaleDomain ?? [minY, maxY],
    clamp: true,
  });

  const activeItem = activeIdx === null ? null : serie[activeIdx];

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
  const xFormat =
    tickXFormat ??
    ((value: NumberLike) => {
      const date = new Date(value as number);

      return format(date, 'dd MMM');
    });

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
          tickFormat={xFormat}
          tickLabelProps={tickXLabel}
          tickStroke="transparent"
          stroke="#8493A688"
          strokeWidth="2"
          tickLength={18}
          top={height - margins.bottom}
        />

        <BarStack
          data={serie}
          keys={yKeys.map((yKey) => yKey.key)}
          x={(d) => d[xKey]}
          xScale={xScale}
          yScale={yScale}
          color={(key, index) =>
            yKeys[index].fillColor ?? theme.palette.primary.main
          }
        >
          {(barStacks) =>
            barStacks.map((barStack) =>
              barStack.bars.map((bar, idx) => (
                <Fragment key={`bar-${idx}`}>
                  <BarRounded
                    radius={2}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                  />
                </Fragment>
              )),
            )
          }
        </BarStack>

        {serie.map((d, idx) => {
          const barX = xScale(d.x) as number;
          const barWidth = xScale.bandwidth();

          return (
            <Fragment key={`bar-${idx}`}>
              <Bar
                x={barX}
                y={0}
                width={barWidth}
                height={height - margins.bottom}
                fill="transparent"
                onMouseMove={(event) => {
                  const eventSvgCoords = localPoint(event);
                  setActiveIdx(idx);
                  onHover(idx);
                  showTooltip({
                    tooltipLeft: barX,
                    tooltipTop: eventSvgCoords?.y,
                  });
                }}
              />
            </Fragment>
          );
        })}
      </svg>
    </Box>
  );
};
