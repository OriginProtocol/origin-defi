import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import { useLayout } from '@origin/analytics/shared';
import {
  CurrencyLabel,
  PieChart,
  Spinner,
  TokenIcon,
} from '@origin/shared/components';
import { useMeasure } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import { useSuperCollaterals } from '../hooks';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export const CollateralsView = () => {
  const intl = useIntl();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const [{ isDrawerOpen }] = useLayout();
  const { data, isLoading } = useSuperCollaterals();

  const width = measures?.width ?? 0;

  return (
    <Stack>
      <Card>
        <CardHeader
          title={intl.formatMessage({
            defaultMessage: 'Collateral distribution',
          })}
        />
        <Divider />
        <CardContent>
          <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid2 size={{ xs: 12, sm: 6, md: isDrawerOpen ? 6 : 3, lg: 3 }}>
              <Stack
                ref={ref}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isLoading ? (
                  <Spinner />
                ) : !data ? (
                  <Typography>
                    {intl.formatMessage({
                      defaultMessage: 'No available data',
                    })}
                  </Typography>
                ) : (
                  <PieChart
                    data={data}
                    width={width}
                    height={width}
                    hideLabels
                  />
                )}
              </Stack>
            </Grid2>
            {data?.map((d) => (
              <Grid2
                key={d.label}
                size={{ xs: 12, sm: 6, md: isDrawerOpen ? 6 : 3, lg: 3 }}
              >
                <CollateralCard {...d} sx={{ flexGrow: 1, height: 1 }} />
              </Grid2>
            ))}
          </Grid2>
        </CardContent>
      </Card>
    </Stack>
  );
};

type CollateralCardProps = {
  value: number;
  label: string;
  token: Token;
  href: string;
  total: number;
  color: string;
} & CardProps;

const CollateralCard = ({
  value,
  label,
  total,
  title,
  token,
  href,
  color,
  ...rest
}: CollateralCardProps) => {
  const intl = useIntl();

  const percentage = value / total;

  return (
    <Card {...rest}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <TokenIcon token={token} sx={{ fontSize: 32 }} />
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: color,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {label}
              </Typography>
            </Stack>
            <Typography variant="featured2">
              <CurrencyLabel currency="ETH" />
              {intl.formatNumber(value, { maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {intl.formatNumber(percentage, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
