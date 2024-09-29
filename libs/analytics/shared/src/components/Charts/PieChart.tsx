import { Box } from '@mui/material';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';

import { chartMargins } from './constants';

import type { BoxProps } from '@mui/material';

export type PieChartData = { label: string; value: number; color: string };

export type PieChartProps = {
  width: number;
  height: number;
  data: PieChartData[];
  margins?: typeof chartMargins;
  hideLabels?: boolean;
} & BoxProps;

export const PieChart = ({
  width,
  height,
  data,
  margins = chartMargins,
  hideLabels = false,
  ...rest
}: PieChartProps) => {
  const innerWidth = width - margins.left - margins.right;
  const innerHeight = height - margins.top - margins.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margins.top;
  const left = centerX + margins.left;

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
            cornerRadius={3}
            padAngle={0.005}
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
        </Group>
      </svg>
    </Box>
  );
};
