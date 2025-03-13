import { SvgIcon, useTheme } from '@mui/material';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';

import type { SvgIconProps } from '@mui/material';

export type ProgressIconProps = {
  value: number;
  size?: number;
  color?: string;
  backgroundColor?: string;
} & Omit<SvgIconProps, 'viewBox' | 'color' | 'size'>;

type DataType = {
  value: number;
};

export const ProgressIcon = ({
  value,
  size = 24,
  color,
  backgroundColor,
  ...rest
}: ProgressIconProps) => {
  const theme = useTheme();
  const normalizedValue = Math.min(Math.max(value, 0), 1);
  const data = [{ value: normalizedValue }, { value: 1 - normalizedValue }];

  return (
    <SvgIcon
      {...rest}
      sx={[
        {
          width: size,
          height: size,
        },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
      viewBox={`0 0 ${size} ${size}`}
    >
      <svg width={size} height={size}>
        <Group top={size / 2} left={size / 2}>
          <Pie<DataType>
            data={[{ value: 1 }]}
            pieValue={(d) => d.value}
            outerRadius={size * 0.5}
            startAngle={0}
            endAngle={2 * Math.PI}
          >
            {(pie) => {
              const arcPath = pie.path(pie.arcs[0]);
              return (
                <path
                  d={arcPath ?? ''}
                  fill={backgroundColor || theme.palette.divider}
                />
              );
            }}
          </Pie>
          <Pie<DataType>
            data={data}
            pieValue={(d) => d.value}
            outerRadius={size * 0.4}
            pieSort={null}
            pieSortValues={null}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const arcPath = pie.path(arc);
                const arcFill =
                  index === 0
                    ? color || theme.palette.primary.main
                    : 'transparent';

                return (
                  <g key={`arc-${index}`}>
                    <path d={arcPath ?? ''} fill={arcFill} />
                  </g>
                );
              });
            }}
          </Pie>
          <Pie<DataType>
            data={[{ value: 1 }]}
            pieValue={(d) => d.value}
            outerRadius={size * 0.5}
            innerRadius={size * 0.45}
            startAngle={0}
            endAngle={2 * Math.PI}
          >
            {(pie) => {
              const arcPath = pie.path(pie.arcs[0]);
              return (
                <path
                  d={arcPath ?? ''}
                  fill={color || theme.palette.primary.main}
                />
              );
            }}
          </Pie>
        </Group>
      </svg>
    </SvgIcon>
  );
};
