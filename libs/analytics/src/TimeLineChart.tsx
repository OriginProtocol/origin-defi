import { useState } from 'react';

import { Box, MenuItem, Paper, Select, Stack, useTheme } from '@mui/material';
import { registerChart } from '@origin/shared/providers';
import { intlFormat } from 'date-fns';
import { mergeDeepRight } from 'ramda';
import { Line } from 'react-chartjs-2';

import type { Theme } from '@origin/shared/theme';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import type { ComponentProps } from 'react';

registerChart();

/**
 * TODO: Figure out a proper home for these?
 */
const chartTheme = {
  primary1: '#CF75D5',
  primary2: '#FEDBA8',
  position: '#0074F0',
  grid: '#2e2f3d',
  positive: '#4EBE96',
  negative: '#D44E66',
};

const full = { xs: 1, sm: 2, md: 3 };
const half = { xs: 0.5, sm: 1, md: 1.5 };
const quarter = { xs: 0.25, sm: 0.5, md: 0.75 };

export function TimeLineChart<FilterOption extends string>(props: {
  title: string;
  titleProps: ComponentProps<typeof Box>;
  data: ChartData<'line', { x: Date; y: number }[]>;
  formatValues?: (value: number | string) => string | number;
  filter?: {
    options: FilterOption[];
    value: FilterOption;
    onChange?: (value: FilterOption) => void;
  };
}) {
  if (!props.formatValues) {
    props.formatValues = (value: number | string) => value;
  }
  const firstData = props.data.datasets.map((d) => d.data[0]);
  const lastData = props.data.datasets.map((d) => d.data[d.data.length - 1]);
  const [currentData, setCurrentData] = useState(lastData);
  const [hovering, setHovering] = useState(false);
  const change = currentData[0].y / firstData[0].y - 1;
  return (
    <Paper>
      <Stack sx={{ fontFamily: 'Inter' }}>
        <Stack gap={half}>
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            px={full}
            pt={full}
          >
            <Stack>
              <Box mb={half} fontSize={'1rem'} {...props.titleProps}>
                {props.title}
              </Box>
              <Stack direction={'row'} gap={0.5}>
                <Box
                  fontFamily={'Sailec'}
                  fontSize={'2.5rem'}
                  fontWeight={'400'}
                  color={'white'}
                >
                  {props.formatValues(currentData[0].y)}
                </Box>
                {change ? (
                  <Box
                    mt={0.5}
                    fontSize={'.75rem'}
                    color={
                      change > 0
                        ? chartTheme.positive
                        : change < 0
                        ? chartTheme.negative
                        : undefined
                    }
                  >
                    {change > 0 ? '+' : null}
                    {props.formatValues(change)}
                  </Box>
                ) : null}
              </Stack>
              <Box fontSize={'.875rem'} color={hovering ? '#ddd' : undefined}>
                {intlFormat(currentData[0].x)}
              </Box>
            </Stack>
            <Stack gap={quarter}>
              {props.filter && (
                <DateFilterPicker
                  options={props.filter.options}
                  value={props.filter.value}
                  onChange={props.filter.onChange}
                />
              )}
              <Select
                value={7}
                onChange={undefined}
                sx={{
                  height: '39px',
                  border: 'none',
                  background: (theme) => theme.palette.grey['700'],
                  '> fieldset': { border: 'none' },
                }}
              >
                <MenuItem value={30}>30-day</MenuItem>
                <MenuItem value={7}>7-day</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Box pr={half} pb={full}>
            <DatedLineChart
              data={props.data}
              plugins={[
                {
                  id: 'hooks',
                  afterDraw: (chart) => {
                    const elements = chart.getActiveElements();
                    if (elements.length) {
                      setCurrentData(
                        elements.map(
                          (element) =>
                            props.data.datasets[element.datasetIndex].data[
                              element.index
                            ],
                        ),
                      );
                      setHovering(true);
                    } else {
                      setCurrentData(lastData);
                      setHovering(false);
                    }
                  },
                },
              ]}
              options={{
                scales: {
                  y: {
                    ticks: {
                      callback: props.formatValues,
                    },
                  },
                },
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}

export const DateFilterPicker = <T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange?: (val: T) => void;
}) => {
  const selectedBackground =
    'linear-gradient(90deg, rgba(140, 102, 252, 0.30) -28.99%, rgba(2, 116, 241, 0.30) 144.97%);';
  const hoverBackground =
    'linear-gradient(90deg, rgba(140, 102, 252, 0.10) -28.99%, rgba(2, 116, 241, 0.10) 144.97%);';
  return (
    <Stack
      direction={'row'}
      gap={quarter}
      sx={{
        fontSize: '.875rem',
        borderRadius: '7px',
        p: '3px',
        background: (theme) => theme.palette.grey['700'],
      }}
    >
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <Stack
            key={option}
            color={'primary'}
            sx={{
              color: (theme) =>
                isSelected
                  ? theme.palette.text.secondary
                  : theme.palette.text.primary,
              py: { xs: 0.5, sm: 1 },
              px: { xs: 0.75, sm: 1.5 },
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background 2s ease-out 1000ms',
              background: isSelected ? selectedBackground : undefined,
              '&:hover': {
                color: (theme) => theme.palette.text.secondary,
                background: isSelected ? selectedBackground : hoverBackground,
              },
            }}
            onClick={() => onChange?.(option)}
          >
            {option}
          </Stack>
        );
      })}
    </Stack>
  );
};

export const DatedLineChart = (props: ComponentProps<typeof Line>) => {
  const theme = useTheme<Theme>();
  let options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    animation: {
      easing: 'easeInOutQuad',
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: chartTheme.grid,
        },
        type: 'time',
        ticks: {
          autoSkip: true,
          autoSkipPadding: 50,
          maxRotation: 0,
          align: 'start',
        },
        time: {
          unit: 'day',
        },
      },
      y: {
        grid: {
          color: chartTheme.grid,
          drawTicks: false,
        },
        border: {
          display: false,
          color: chartTheme.grid,
          dash: [3, 3],
        },
        position: 'right',
        ticks: {
          crossAlign: 'far',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 0,
      },
    },
    layout: {
      padding: {
        top: 30, // Depended on by `verticalLinePlugin`
      },
    },
    borderColor: (ctx) => {
      const gradient = ctx.chart.ctx.createLinearGradient(
        0,
        0,
        ctx.chart.width,
        ctx.chart.height,
      );
      gradient.addColorStop(0, chartTheme.primary2);
      gradient.addColorStop(1, chartTheme.primary1);
      return gradient;
    },
  };
  if (props.options) {
    options = mergeDeepRight(props.options, options) as ChartOptions<'line'>;
  }
  return (
    <Line
      {...props}
      plugins={[verticalLinePlugin(theme), ...(props.plugins ?? [])]}
      options={options}
      data={props.data}
    />
  );
};

const verticalLinePlugin = (theme: Theme) => {
  const plugin: Plugin<'line'> = {
    id: 'verticalLineAtIndex',
    afterDraw: (chart) => {
      const active = chart.getActiveElements();
      if (active[0]) {
        const ctx = chart.ctx;
        const x = active[0].element.x;
        const data = chart.data.datasets[0].data[
          active[0].index
        ] as unknown as {
          x: Date;
          y: number;
        };

        const heightAboveChart = 30;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chart.chartArea.top - heightAboveChart);
        ctx.lineTo(x, chart.chartArea.bottom);
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = chartTheme.position;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.font = '0.875rem Inter';
        ctx.fillStyle = theme.palette.text.primary;
        const text = intlFormat(data.x);
        const textSize = ctx.measureText(text);
        const fromLeft =
          x + textSize.actualBoundingBoxRight <= chart.chartArea.right;
        ctx.textAlign = fromLeft ? 'start' : 'end';
        ctx.fillText(
          intlFormat(data.x, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }),
          x + (fromLeft ? heightAboveChart : -heightAboveChart) / 2,
          chart.chartArea.top -
            heightAboveChart +
            textSize.actualBoundingBoxAscent,
        );
        ctx.restore();
      }
    },
  };
  return plugin;
};
