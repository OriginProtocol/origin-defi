import { Fragment, useCallback, useId, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { scaleLinear, scaleUtc } from '@visx/scale';
import { AreaStack, LinePath } from '@visx/shape';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';

import { chartMargins, curveTypes } from './constants';
import { getStackedScaleDomains } from './utils';

import type { BoxProps, StackProps } from '@mui/material';
import type { EventType } from '@visx/event/lib/types';
import type { NumberLike } from '@visx/scale';
import type { StackKey } from '@visx/shape/lib/types';
import type { ComponentType } from 'react';

import type { ChartColor, ChartData, Serie } from './types';

export type YKey<Datum = ChartData> = {
  key: keyof Datum;
  lineColor?: ChartColor;
  fillColor?: ChartColor;
  label?: string;
};

export type AreaChartProps<Datum = ChartData> = {
  width: number;
  height: number;
  serie: Datum[];
  xKey: keyof Datum;
  yKeys: YKey<Datum>[];
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  yScaleDomain?: [number, number];
  Tooltip?: ComponentType<{ series: Serie<Datum>[] | null } & StackProps>;
  margins?: typeof chartMargins;
  curveType?: keyof typeof curveTypes;
} & Omit<BoxProps, 'ref' | 'key'>;

export const AreaChart = <Datum,>({
  width,
  height,
  serie,
  xKey,
  yKeys,
  onHover,
  tickXFormat,
  tickYFormat,
  yScaleDomain,
  Tooltip,
  margins = chartMargins,
  curveType = 'natural',
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
    serie,
    yKeys.map((yKey) => yKey.key),
    xKey,
  );

  const xScale = scaleUtc({
    range: [margins.left, width - margins.right],
    domain: [minX, maxX],
    clamp: true,
  });

  const yScale = scaleLinear({
    range: [height - margins.bottom, margins.top],
    domain: yScaleDomain ?? [minY, maxY],
    clamp: true,
  });

  const handlePointerMove = useCallback(
    (event: EventType) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x).getTime();

      const closestIndex = serie.reduce((prevIndex, curr, currIndex, array) => {
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
    [onHover, serie, showTooltip, xKey, xScale],
  );

  if (!width || !height) return null;

  const activeSeries =
    activeIdx === null
      ? null
      : yKeys.map((yKey) => ({
          data: [serie[activeIdx]],
          label: yKey.label,
          xKey,
          yKey: yKey.key,
        }));
  const bottomTicks = xScale.ticks(Math.floor(width / 100));
  const rightTicks = yScale.ticks(Math.floor(height / 40));

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
            if (Array.isArray(k.fillColor)) {
              return (
                <LinearGradient
                  key={`gradient-fill-${chartId}-${k.key as string}`}
                  id={`gradient-fill-${chartId}-${k.key as string}`}
                  from={k.fillColor?.[0] ?? theme.palette.chart5}
                  to={
                    k.fillColor?.[1] ?? k.fillColor?.[0] ?? theme.palette.chart4
                  }
                  fromOffset="20%"
                  toOffset="80%"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="0%"
                />
              );
            }
            if (Array.isArray(k.lineColor)) {
              return (
                <LinearGradient
                  key={`gradient-line-${chartId}-${k.key as string}`}
                  id={`gradient-line-${chartId}-${k.key as string}`}
                  from={k.lineColor?.[0] ?? theme.palette.chart5}
                  to={
                    k.lineColor?.[1] ?? k.lineColor?.[0] ?? theme.palette.chart4
                  }
                  fromOffset="20%"
                  toOffset="80%"
                  x1="0%"
                  x2="100%"
                  y1="0%"
                  y2="0%"
                />
              );
            }
            return null;
          })}
        </defs>
        <AxisRight
          scale={yScale}
          left={width - margins.right}
          stroke={theme.palette.text.secondary}
          tickFormat={tickYFormat}
          tickLabelProps={{
            fontSize: 11,
            fontFamily: theme.typography.body1.fontFamily,
            fill: theme.palette.text.secondary,
            textAnchor: 'start',
          }}
          numTicks={rightTicks.length}
        />
        <AxisBottom
          scale={xScale}
          top={height - margins.bottom}
          tickFormat={tickXFormat}
          numTicks={bottomTicks.length}
          stroke={theme.palette.text.secondary}
          tickLabelProps={{
            fontSize: theme.typography.caption1.fontSize,
            fontFamily: theme.typography.body1.fontFamily,
            fill: theme.palette.text.secondary,
          }}
        />
        <AreaStack
          data={serie}
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
                ? `url(#gradient-line-${chartId}-${stack.key})`
                : (yKey.lineColor ?? theme.palette.primary.main);
              const fillColor = Array.isArray(yKey.fillColor)
                ? `url(#gradient-fill-${chartId}-${stack.key})`
                : (yKey.fillColor ?? theme.palette.chart5);

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
                      x={(d) => xScale(d.data[xKey] as number)}
                      y={(d) => yScale(d[1]) + 1}
                      curve={curveTypes[curveType]}
                    >
                      {({ path }) => (
                        <path
                          d={path(stack) || ''}
                          fill="none"
                          stroke={lineColor}
                          strokeWidth={2}
                        />
                      )}
                    </LinePath>
                  )}
                </Fragment>
              );
            })
          }
        </AreaStack>
        {!activeIdx ? null : (
          <line
            x1={xScale(activeSeries?.[0].data[0][xKey] as number)}
            x2={xScale(activeSeries?.[0].data[0][xKey] as number)}
            y1={margins.top}
            y2={height - margins.bottom}
            stroke="#ffffff"
            strokeWidth={0.5}
            strokeDasharray={2}
          />
        )}

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
      {tooltipOpen && activeIdx && Tooltip ? (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            background: theme.palette.background.default,
          }}
        >
          <Tooltip series={activeSeries ?? null} />
        </TooltipWithBounds>
      ) : null}
    </Box>
  );
};
