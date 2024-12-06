import { useId, useMemo, useRef, useState } from 'react';

import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import {
  chartMargins,
  ColorLabel,
  ValueLabel,
} from '@origin/shared/components';
import { AxisBottom, AxisRight } from '@visx/axis';
import { RectClipPath } from '@visx/clip-path';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { scaleLinear, scaleUtc } from '@visx/scale';
import {
  defaultStyles,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from '@visx/tooltip';
import { voronoi } from '@visx/voronoi';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';

import type { BoxProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { TickLabelProps } from '@visx/axis';
import type { NumberLike } from '@visx/scale';

type BubbleChartData = {
  id: string;
  x: number;
  y: number;
  r: number;
};

export type BubbleSerie<Datum> = {
  xKey: keyof Datum;
  yKey: keyof Datum;
  rKey: keyof Datum;
  colorFn?: (d: Datum) => string;
  label?: (d: Datum) => string;
};

export type BubbleChartProps<Datum = BubbleChartData> = {
  width: number;
  height: number;
  data: Datum[];
  serie: BubbleSerie<Datum>;
  onHover?: (idx: number | null) => void;
  tickXFormat?: (value: NumberLike) => string;
  tickYFormat?: (value: NumberLike) => string;
  tickXLabelProps?: TickLabelProps<NumberLike>;
  tickYLabelProps?: TickLabelProps<NumberLike>;
  yScaleDomain?: [number, number];
  margins?: typeof chartMargins;
  showGrid?: boolean;
} & BoxProps;

export const BubbleChart = <Datum,>({
  width,
  height,
  data,
  serie,
  onHover,
  tickXFormat,
  tickYFormat,
  tickXLabelProps,
  tickYLabelProps,
  yScaleDomain,
  margins = chartMargins,
  showGrid = true,
  ...rest
}: BubbleChartProps<Datum>) => {
  const theme = useTheme();
  const chartId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
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

  const { minX, maxX, minY, maxY } = getBubbleScaleDomain(
    data,
    [serie],
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

  const voronoiLayout = useMemo(
    () =>
      voronoi<Datum>({
        x: (d) => xScale(d[serie.xKey] as number) ?? 0,
        y: (d) => yScale(d[serie.yKey] as number) ?? 0,
        width,
        height,
      })(data),
    [width, height, data, xScale, serie, yScale],
  );

  if (!width || !height) return null;

  const innerWidth = width - margins.left - margins.right;
  const innerHeight = height - margins.top - margins.bottom;
  const activeItem = activeIdx === null ? null : data[activeIdx];
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
            '&:hover': { opacity: 0.5 },
          },
        },
      ]}
    >
      <svg width={width} height={height} ref={svgRef}>
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
        <RectClipPath
          id="voronoi_clip"
          width={innerWidth}
          height={innerHeight}
        />
        <Group
          top={margins.top}
          left={margins.left}
          clipPath="url(#voronoi_clip)"
          onMouseMove={(event) => {
            if (!svgRef.current) return;

            const point = localPoint(svgRef.current, event);
            if (!point) return;

            const closest = voronoiLayout.find(
              point.x - margins.left,
              point.y - margins.top,
              75,
            );
            if (closest && closest.index !== activeIdx) {
              setActiveIdx(closest.index);
              showTooltip({
                tooltipTop: yScale(closest.data[serie.yKey] as number),
                tooltipLeft: xScale(closest.data[serie.xKey] as number),
              });
            }
          }}
          onMouseLeave={() => {
            setActiveIdx(null);
          }}
        >
          {data.map((d, i) => {
            const cx = xScale(d[serie.xKey] as number);
            const cy = yScale(d[serie.yKey] as number);
            const r = Math.log((d[serie.rKey] as number) + 5) * 5;
            const color =
              i === activeIdx
                ? (serie?.colorFn?.(d) ?? theme.palette.primary.main)
                : alpha(serie?.colorFn?.(d) ?? theme.palette.primary.main, 0.2);

            return (
              <circle
                key={`${String(serie.yKey)}}-${String(serie?.label ?? i)}-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill={color}
              />
            );
          })}
        </Group>
      </svg>
      {tooltipOpen && activeIdx !== null ? (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            ...defaultStyles,
            background: 'transparent',
          }}
        >
          <ChartTooltip activeItem={activeItem} serie={serie} />
        </TooltipWithBounds>
      ) : null}
    </Box>
  );
};

type ChartTooltipProps<ChartData> = {
  activeItem: ChartData | null;
  serie: BubbleSerie<ChartData>;
} & StackProps;

const ChartTooltip = <ChartData,>({
  activeItem,
  serie,
  ...rest
}: ChartTooltipProps<ChartData>) => {
  const intl = useIntl();
  const theme = useTheme();

  if (!activeItem) {
    return null;
  }

  const timestamp = activeItem[serie.xKey] as number;

  return (
    <Stack
      {...rest}
      useFlexGap
      sx={[
        {
          backgroundColor: 'background.default',
          p: 1,
          border: '1px solid',
          borderColor: 'common.white',
          borderRadius: 3,
          gap: 0.5,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {timestamp && (
        <Typography variant="caption1" color="text.secondary" gutterBottom>
          {format(new Date(timestamp), 'dd MMM yyyy')}
        </Typography>
      )}

      <ColorLabel
        label={serie?.label?.(activeItem) ?? ''}
        color={serie.colorFn?.(activeItem) ?? theme.palette.primary.main}
        labelProps={valueLabelProps.labelProps}
      />
      <Stack spacing={0.5}>
        <ValueLabel
          label={String(serie.yKey)}
          value={intl.formatNumber(activeItem?.[serie.yKey] as number, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })}
          {...valueLabelProps}
        />
        <ValueLabel
          label={String(serie.rKey)}
          value={intl.formatNumber(activeItem?.[serie.rKey] as number, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 5,
          })}
          currency="ETH"
          {...valueLabelProps}
        />
      </Stack>
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  spacing: 1,
  sx: {
    py: 0.25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelProps: {
    variant: 'caption1',
    sx: {
      minWidth: 50,
    },
  },
  valueProps: {
    variant: 'caption1',
    color: 'text.primary',
  },
};

export const getBubbleScaleDomain = <Datum = object,>(
  data: Datum[],
  series: BubbleSerie<Datum>[],
  xCoeff = [1, 1],
  yCoeff = [0.9, 1.1],
) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minR = 0;
  let maxR = -Infinity;

  for (const d of data) {
    const xs = [];
    const ys = [];
    const rs = [];

    for (const s of series) {
      xs.push(d[s.xKey] as number);
      ys.push(d[s.yKey] as number);
      rs.push(d[s.rKey] as number);
    }

    minX = Math.min(minX, ...xs);
    maxX = Math.max(maxX, ...xs);
    minY = Math.min(minY, ...ys);
    maxY = Math.max(maxY, ...ys);
    minR = Math.min(minR, ...rs);
    maxR = Math.max(maxR, ...rs);
  }

  return {
    minX: minX * xCoeff[0],
    maxX: maxX * xCoeff[1],
    minY: minY * yCoeff[0],
    maxY: maxY * yCoeff[1],
    minR,
    maxR,
  };
};
