import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Card } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { ascend, last, prop, sort } from 'ramda';
import { Line } from 'react-chartjs-2';
import { defineMessage, useIntl } from 'react-intl';

import { useApiesQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { Chart, ChartData, ChartOptions, Plugin } from 'chart.js';

const limitOptions = [
  { label: defineMessage({ defaultMessage: '1W' }), value: 7 },
  { label: defineMessage({ defaultMessage: '1M' }), value: 30 },
  { label: defineMessage({ defaultMessage: '6M' }), value: 180 },
  { label: defineMessage({ defaultMessage: '1YR' }), value: 365 },
  { label: defineMessage({ defaultMessage: 'All' }), value: undefined },
];

const trailingOptions = [
  { label: defineMessage({ defaultMessage: '30 days trailing' }), value: 30 },
  { label: defineMessage({ defaultMessage: '7 days trailing' }), value: 7 },
];

export const ApyChart = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const chartRef = useRef<Chart<'line', { x: string; y: number }[]>>(null);
  const [apy, setApy] = useState(0);
  const [timestamp, setTimestamp] = useState(null);
  const [limit, setLimit] = useState(limitOptions[0]);
  const [trailing, setTrailing] = useState(trailingOptions[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: apies, isLoading: apiesLoading } = useApiesQuery(
    {
      limit: limit.value,
    },
    {
      select: (data) => sort(ascend(prop('timestamp')), data.apies),
    },
  );

  useEffect(() => {
    if (!isNilOrEmpty(apies)) {
      setApy(
        trailing.value === 30
          ? last(apies).apy30DayAvg
          : last(apies).apy7DayAvg,
      );
      setTimestamp(last(apies).timestamp);
    }
  }, [apies, trailing.value]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.options.scales.x['time'].unit =
        isNilOrEmpty(limit.value) || limit.value > 30 ? 'month' : 'day';
      chartRef.current.update();
    }
  }, [limit.value]);

  const handleMouseLeave = useCallback(() => {
    setApy(
      trailing.value === 30 ? last(apies).apy30DayAvg : last(apies).apy7DayAvg,
    );
    setTimestamp(last(apies).timestamp);
  }, [apies, trailing.value]);

  const hoverline: Plugin = {
    id: 'hoverline',
    afterDatasetDraw: (chart, args, options) => {
      const {
        ctx,
        tooltip,
        chartArea: { top, bottom },
        scales: { x },
      } = chart;

      if (
        !isNilOrEmpty(tooltip?.['_active']) &&
        !isNilOrEmpty(tooltip?.dataPoints?.[0]?.parsed?.x)
      ) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].parsed.x);

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = theme.palette.grey[200];
        ctx.setLineDash([3, 3]);
        ctx.moveTo(xCoor, top);
        ctx.lineTo(xCoor, bottom);
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const chartData = useMemo<ChartData<'line', { x: string; y: number }[]>>(
    () => ({
      datasets: [
        {
          data: apies?.map((item) => ({
            x: item.timestamp,
            y: trailing.value === 7 ? item.apy7DayAvg : item.apy30DayAvg,
          })),
        },
      ],
    }),
    [apies, trailing.value],
  );

  const chartOptions = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
      },
      events: ['mousemove', 'mouseout', 'mouseenter'],
      datasets: {
        line: {
          backgroundColor: 'transparent',
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
          tension: 0.4,
        },
      },
      borderColor: (ctx) => {
        const gradient = ctx.chart.ctx.createLinearGradient(
          0,
          0,
          ctx.chart.width,
          ctx.chart.height,
        );
        gradient.addColorStop(0, theme.palette.primary.main);
        gradient.addColorStop(1, theme.palette.primary.dark);

        return gradient;
      },
      layout: {
        padding: 0,
      },
      scales: {
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
        x: {
          type: 'time',
          time: {
            round: 'day',
          },
          border: { display: false },
          grid: {
            display: false,
          },
          ticks: {
            align: 'inner',
            maxRotation: 0,
            padding: 4,
            font: {
              size: 11,
              family: 'Inter',
              weight: '400',
            },
          },
        },
      },
      title: {
        display: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'transparent',
          titleColor: 'transparent',
          bodyColor: 'transparent',
          borderColor: 'transparent',
          footerColor: 'transparent',
          borderWidth: 0,
          padding: 0,
          boxHeight: 0,
          boxWidth: 0,
          mode: 'index',
        },
      },
      onHover: (event, elements, chart) => {
        if (!isNilOrEmpty(chart?.tooltip?.dataPoints?.[0]?.parsed)) {
          setTimestamp(chart.tooltip.dataPoints[0].parsed.x);
          setApy(chart.tooltip.dataPoints[0].parsed.y);
        }
      },
    }),
    [theme.palette.primary.dark, theme.palette.primary.main],
  );

  return (
    <Card
      sxCardTitle={{
        padding: 0,
        paddingInline: { xs: 2, md: 3 },
        paddingY: 1.438,
      }}
      sxCardContent={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        paddingInline: 0,
      }}
      title={
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'APY' })}
          </Typography>
          <Stack direction="row">
            {limitOptions.map((d) => (
              <Button
                key={`duration-${d?.value ?? 'All'}`}
                size="small"
                onClick={() => {
                  setLimit(d);
                }}
                sx={{
                  minWidth: 0,
                  width: 40,
                  color: 'text.primary',
                  ...(d.value === limit.value && {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                  }),
                }}
              >
                {intl.formatMessage(d.label)}
              </Button>
            ))}
          </Stack>
        </Stack>
      }
    >
      <Stack>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{
            paddingInline: {
              xs: 1.5,
              md: 3,
            },
          }}
        >
          <Stack>
            {apiesLoading ? (
              <Skeleton width={60} height={24} />
            ) : (
              <Typography
                fontSize={24}
                fontWeight={700}
                fontFamily="Sailec"
                color="primary.contrastText"
              >
                {intl.formatNumber(apy, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </Typography>
            )}
            {apiesLoading ? (
              <Skeleton width={100} height={12} />
            ) : (
              <Typography fontSize={12} color="text.primary">
                {intl.formatDate(new Date(timestamp), {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Typography>
            )}
          </Stack>

          <Button
            color="inherit"
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {intl.formatMessage(trailing.label)}&nbsp;
            <Box component="img" src={`/images/downarrow.png`} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            MenuListProps={{ dense: true }}
          >
            {trailingOptions.map((t) => (
              <MenuItem
                divider
                key={t.value}
                selected={trailing.value === t.value}
                onClick={() => {
                  setTrailing(t);
                  setAnchorEl(null);
                }}
              >
                {intl.formatMessage(t.label)}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Stack
          sx={{ pt: 2, height: 140, canvas: { width: 1 } }}
          onMouseLeave={handleMouseLeave}
        >
          <Line
            ref={chartRef}
            data={chartData}
            options={chartOptions}
            plugins={[hoverline]}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
