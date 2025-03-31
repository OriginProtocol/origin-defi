import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useLayout } from '@origin/analytics/shared';
import {
  CurrencyLabel,
  ExternalLink,
  LoadingLabel,
  PieChart,
  Spinner,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { getTokenPriceKey, useTokenPrice } from '@origin/shared/providers';
import { useMeasure } from '@react-hookz/web';
import { format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';

import { useSuperCollaterals } from '../hooks';

import type { StackProps, SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ComponentType } from 'react';

export const CollateralsView = () => {
  const intl = useIntl();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const [{ isDrawerOpen }] = useLayout();
  const { data, isLoading } = useSuperCollaterals();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.base.superOETHb),
  );

  const width = measures?.width ?? 0;
  const totalETH = data?.[0].total ?? 0;
  const totalUSD = mul(from(totalETH), price ?? 0);

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
          {isLoading ? (
            <Spinner sx={{ height: 300 }} />
          ) : !data || !data.length ? (
            <Stack
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 300,
              }}
            >
              <Typography color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'No collaterals' })}
              </Typography>
            </Stack>
          ) : (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: isDrawerOpen ? 7 : 6, lg: 6 }}>
                <Stack
                  direction="column"
                  sx={{
                    rowGap: 2,
                    columnGap: 2,
                    justifyContent: 'center',
                    height: 1,
                  }}
                  divider={<Divider />}
                >
                  {data?.map((d) => (
                    <CollateralCard key={d.label} {...d} sx={{ flexGrow: 1 }} />
                  ))}
                  <Divider sx={{ my: -2 }} />
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{
                      alignItems: 'center',
                      px: 3,
                      flexGrow: 1,
                    }}
                  >
                    <TokenIcon
                      token={tokens.base.superOETHb}
                      sx={{ fontSize: 36 }}
                    />
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                      }}
                    >
                      <Stack>
                        <Typography
                          variant="featured1"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {intl.formatNumber(totalETH)}
                        </Typography>
                        <LoadingLabel
                          color="text.secondary"
                          variant="caption1"
                          isLoading={isPriceLoading}
                        >
                          <CurrencyLabel currency="USD" />
                          {format(totalUSD, 2)}
                        </LoadingLabel>
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        100.00%
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                size={{ xs: 12, md: isDrawerOpen ? 5 : 6, lg: 6 }}
                ref={ref}
              >
                <Stack
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 1,
                  }}
                >
                  <PieChart data={data} width={width} height={400} hideLabels />
                </Stack>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

type CollateralCardProps = {
  value: number;
  icon: ComponentType<SvgIconProps>;
  label?: string;
  token: Token;
  href?: string;
  total: number;
  color: string;
} & StackProps;

const CollateralCard = ({
  value,
  icon,
  label,
  total,
  title,
  token,
  href,
  color,
  ...rest
}: CollateralCardProps) => {
  const intl = useIntl();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(token),
  );

  const percentage = value / total;
  const amountUSD = mul(value, price ?? 0);

  return (
    <Stack
      direction="row"
      spacing={3}
      {...rest}
      sx={[
        { alignItems: 'center', px: 3 },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <SvgIcon component={icon} sx={{ fontSize: 36 }} />
      <Stack sx={{ flexGrow: 1 }}>
        {label?.length || href?.length ? (
          <Stack
            direction="row"
            sx={{
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexGrow: 1,
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: color,
                }}
              />
              <Typography variant="body2">{label}</Typography>
            </Stack>
            {href && <ExternalLink iconType="arrow" href={href} />}
          </Stack>
        ) : null}
        <Stack
          direction="row"
          sx={{
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
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
        <LoadingLabel
          color="text.secondary"
          variant="caption1"
          isLoading={isPriceLoading}
        >
          <CurrencyLabel currency="USD" />
          {format(amountUSD, 2)}
        </LoadingLabel>
      </Stack>
    </Stack>
  );
};
