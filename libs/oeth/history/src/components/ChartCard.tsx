import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

interface Props {
  apyPercent: number;
  apy: { timestamp: string; value: number }[];
}

export function ChartCard(props: Props) {
  const theme = useTheme();
  const intl = useIntl();

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'APY' })} />
      <CardContent>
        <Stack sx={{ paddingBlock: { xs: 2, md: 3 }, paddingInline: 2 }}>
          <Typography variant="h3">
            {intl.formatNumber(props.apyPercent / 100, {
              style: 'percent',
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {intl.formatDate(new Date(), {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Typography>
        </Stack>

        <Line
          options={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            responsive: true,
            animation: {
              easing: 'easeInOutQuad',
            },

            borderColor(ctx, options) {
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
            scales: {
              y: {
                display: false,
                ticks: {
                  stepSize: 200,
                },
              },
              x: {
                ticks: {
                  padding: 16,
                  font: {
                    size: 11,
                    family: 'Inter',
                    weight: '400',
                  },
                },
              },
            },
          }}
          data={{
            datasets: [
              {
                data: props.apy.map((item) => ({
                  x: intl.formatDate(new Date(item.timestamp), {
                    month: 'short',
                    day: 'numeric',
                  }),
                  y: item.value,
                })),
                pointRadius: 0,
                tension: 0.5,
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
}
