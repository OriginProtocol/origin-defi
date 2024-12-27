import { alpha, Box } from '@mui/material';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';

import type { BoxProps } from '@mui/material';

import type { chartMargins } from './constants';

export type PieChartData = { label: string; value: number; color: string };

export type PieChartProps = {
  width: number;
  height: number;
  data: PieChartData[];
  margins?: typeof chartMargins;
  hideLabels?: boolean;
  variant?: 'full' | 'donut';
  cornerRadius?: number;
  padAngle?: number;
} & BoxProps;

export const PieChart = ({
  width,
  height,
  data,
  margins = { top: 10, left: 10, bottom: 10, right: 10 },
  hideLabels = false,
  cornerRadius = 0,
  variant = 'donut',
  padAngle = 0.005,
  ...rest
}: PieChartProps) => {
  const innerWidth = width - margins.left - margins.right;
  const innerHeight = height - margins.top - margins.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margins.top;
  const left = centerX + margins.left;
  const thickness = Math.min(Math.max(10, width / 7), 70);

  return (
    <Box
      {...rest}
      sx={[
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        { position: 'relative' },
      ]}
    >
      <svg width={width} height={height}>
        <Group top={top} left={left}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius}
            {...(variant === 'donut'
              ? { innerRadius: radius - thickness }
              : {})}
            cornerRadius={cornerRadius}
            padAngle={padAngle}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { label, color } = arc.data;
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                const arcPath = pie.path(arc);
                const arcFill = color;

                return (
                  <g key={`arc-${label}-${index}`}>
                    <path d={arcPath ?? ''} fill={arcFill ?? ''} />
                    {!hideLabels && hasSpaceForLabel && (
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={16}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {arc.data.label}
                      </text>
                    )}
                  </g>
                );
              });
            }}
          </Pie>
          {variant === 'donut' && (
            <Pie
              data={data}
              pieValue={(d) => d.value}
              outerRadius={radius - thickness}
              innerRadius={radius - thickness - thickness / 2}
              cornerRadius={cornerRadius}
              padAngle={padAngle}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const { label, color } = arc.data;
                  const arcPath = pie.path(arc);
                  const arcFill = alpha(color, 0.5);
                  return (
                    <g key={`arc-${label}-${index}`}>
                      <path d={arcPath ?? ''} fill={arcFill ?? ''} />
                    </g>
                  );
                });
              }}
            </Pie>
          )}
        </Group>
      </svg>
    </Box>
  );
};
