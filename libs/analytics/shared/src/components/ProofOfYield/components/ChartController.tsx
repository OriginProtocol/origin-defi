import { Fragment, useId, useMemo, useState } from 'react';

import { alpha, Box, useTheme } from '@mui/material';
import { AxisBottom, AxisRight } from '@visx/axis';
import { curveCatmullRom } from '@visx/curve';
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
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { ChartTooltip } from '../../Tooltips';
import { usePoY } from '../hooks';

import type { BoxProps } from '@mui/material';
import type { Serie } from '@origin/shared/components';
import type { NumberLike } from '@visx/scale';

import type { DailyStatMapped } from '../types';

export type ChartControllerProps = {
  width: number;
  height: number;
} & Omit<BoxProps, 'ref' | 'key'>;

export const ChartController = ({
  width,
  height,
  ...rest
}: ChartControllerProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const chartId = useId();
  const { chartData: data, xKey, yKey, selectedId, handleSelect } = usePoY();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
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
  const hoverItem = hoverIdx === null ? null : data?.[hoverIdx];
  const hoverSeries =
    hoverIdx === null
      ? null
      : [
          {
            data: [hoverItem],
            xKey,
            yKey,
            color: theme.palette.primary.main,
            label: intl.formatMessage({
              defaultMessage: 'Daily Yield',
            }),
          } as Serie<DailyStatMapped>,
          {
            data: [hoverItem],
            xKey,
            yKey: 'avg30',
            color: theme.palette.primary.main,
            label: intl.formatMessage({
              defaultMessage: '30-day Average',
            }),
          } as Serie<DailyStatMapped>,
        ];

  return (
    <Box
      {...rest}
      key={chartId}
      ref={containerRef}
      onMouseLeave={() => {
        setHoverIdx(null);
      }}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { position: 'relative' },
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
              ? alpha(theme.palette.chart3, hoverIdx === idx ? 0.5 : 1)
              : alpha(theme.palette.chart7, hoverIdx === idx ? 1 : 0.5);

          return (
            <Fragment key={`bar-${idx}`}>
              <BarRounded
                radius={1}
                x={barX}
                y={barHeight}
                width={barWidth}
                height={height - chartMargins.bottom - barHeight}
                fill={barColor}
              />
              <Bar
                x={barX}
                y={0}
                width={barWidth}
                height={height - chartMargins.bottom}
                fill="transparent"
                onMouseOver={() => {
                  setHoverIdx(idx);
                }}
              />
            </Fragment>
          );
        })}
        <LinePath
          data={data ?? []}
          curve={curveCatmullRom}
          x={(d) => (xScale(d[xKey] as number) ?? 0) + xScale.bandwidth() / 2}
          y={(d) => yScale(d.avg30 as number) ?? 0}
          stroke={`url(#gradient-line-${chartId})`}
          strokeWidth={2}
        />
        {data?.map((d, idx) => {
          const barX = xScale(d[xKey] as number) ?? 0;
          const barWidth = xScale.bandwidth();

          return (
            <Bar
              key={`bar-${idx}`}
              x={barX}
              y={0}
              width={barWidth}
              height={height - chartMargins.bottom}
              fill="transparent"
              onMouseDown={() => {
                handleSelect(d.id);
              }}
              onMouseMove={(event) => {
                const eventSvgCoords = localPoint(event);
                setHoverIdx(idx);
                showTooltip({
                  tooltipLeft: barX,
                  tooltipTop: eventSvgCoords?.y,
                });
              }}
            />
          );
        })}
      </svg>
      {tooltipOpen && hoverItem !== null ? (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <ChartTooltip series={hoverSeries} />
        </TooltipWithBounds>
      ) : null}
    </Box>
  );
};

const chartMargins = { top: 5, left: 25, bottom: 50, right: 50 };

const getBarChartBottomTicks = (width: number) =>
  width < 400 ? 4 : width < 600 ? 8 : 10;
