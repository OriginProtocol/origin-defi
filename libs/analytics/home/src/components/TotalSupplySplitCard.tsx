import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { Spinner, useOriginStats } from '@origin/analytics/shared';
import { PieChart } from '@origin/shared/components';
import { getTokenById, tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { PieChartData } from '@origin/shared/components';
import type { TokenId } from '@origin/shared/contracts';

export type TotalSupplySplitCardProps = {
  height: number;
} & CardProps;

const tokenColors = {
  [tokens.mainnet.OETH.id]: '#0074F0',
  [tokens.mainnet.OUSD.id]: '#000',
  [tokens.base.superOETHb.id]: '#D6453B',
};

export const TotalSupplySplitCard = ({
  height,
  ...rest
}: TotalSupplySplitCardProps) => {
  const intl = useIntl();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const { data, isLoading } = useOriginStats(1);

  const chartData = Object.entries(data?.[0] ?? {}).reduce(
    (acc, [id, value]) => {
      const token = getTokenById(id as TokenId);
      if (token) {
        acc.push({
          label: getTokenById(id as TokenId).symbol ?? '',
          value: value.tvlETH,
          color: tokenColors[id as keyof typeof tokenColors],
        });
      }
      return acc;
    },
    [] as PieChartData[],
  );
  const total = data?.[0]?.total.tvlETH ?? 1;
  const width = measures?.width ?? 0;

  return (
    <Card {...rest} ref={ref}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Total Supply Split' })}
      />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, pt: 1 }}
          useFlexGap
        >
          {chartData?.map((s) => (
            <Stack key={s.label} direction="row" spacing={1}>
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  backgroundColor: s.color,
                }}
              />
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medimum' }}
              >
                {s?.label ?? 'Serie'}
              </Typography>
              <Typography variant="caption1" sx={{ fontWeight: 'bold' }}>
                {intl.formatNumber(s.value ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
              </Typography>
              <Typography
                variant="caption1"
                color="text.secondary"
                sx={{ fontWeight: 'medimum' }}
              >
                •
              </Typography>
              <Typography variant="caption1">
                {intl.formatNumber((s.value as number) / total, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
      {isLoading ? (
        <Spinner sx={{ width, height }} />
      ) : (
        <PieChart
          data={chartData ?? []}
          width={width}
          height={height}
          hideLabels
        />
      )}
    </Card>
  );
};
