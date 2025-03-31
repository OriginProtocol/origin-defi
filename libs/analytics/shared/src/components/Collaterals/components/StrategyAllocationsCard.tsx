import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Spinner, TokenIcon, ValueLabel } from '@origin/shared/components';
import { compare, div, format, from, gt, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import { useLayout } from '../../Layout';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { StrategyMapped } from '../../../utils';

export type StrategyAllocationsCardProps = {
  token: Token;
  strategies?: StrategyMapped[];
  isLoading?: boolean;
  currency?: 'ETH' | 'USD';
} & StackProps;

export const StrategyAllocationsCard = ({
  token,
  strategies,
  currency,
  isLoading,
  ...rest
}: StrategyAllocationsCardProps) => {
  const intl = useIntl();
  const [{ isDrawerOpen }] = useLayout();

  return (
    <Stack {...rest}>
      <Typography variant="featured3" sx={{ fontWeight: 'bold', mb: 2 }}>
        {intl.formatMessage({ defaultMessage: 'Strategy allocation' })}
      </Typography>
      {isLoading ? (
        <Spinner sx={{ height: 300 }} />
      ) : !strategies || !strategies.length ? (
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
          }}
        >
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'No strategy allocations',
            })}
          </Typography>
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {strategies?.map((s) => (
            <Grid
              key={s.id}
              size={{
                xs: 12,
                md: 6,
                lg: isDrawerOpen ? 6 : 4,
                xl: 4,
              }}
            >
              <Card sx={{ height: 1 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography
                      variant="featured2"
                      sx={{ fontWeight: 'bold', minHeight: 64 }}
                    >
                      {s.title}
                    </Typography>
                    <ValueLabel
                      label={intl.formatMessage({
                        defaultMessage: 'Total Value:',
                      })}
                      value={intl.formatNumber(toNumber(s.total), {
                        maximumFractionDigits: 2,
                      })}
                      currency={currency}
                      sx={{ alignItems: 'flex-start' }}
                      labelProps={{ variant: 'body2', color: 'text.secondary' }}
                      valueProps={{
                        variant: 'featured3',
                        sx: { fontWeight: 'medium' },
                      }}
                    />

                    <Typography variant="body2" color="text.secondary">
                      {intl.formatMessage({ defaultMessage: 'Asset Split:' })}
                    </Typography>
                    {s.balances
                      .filter((b) => gt(b.amount, from(1, b.token.decimals)))
                      .toSorted((a, b) => compare(b.amount, a.amount))
                      .map((balance) => (
                        <Stack
                          key={balance.token.id}
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <TokenIcon
                            token={balance.token}
                            sx={{ fontSize: 24 }}
                          />
                          <Typography variant="featured3">
                            {balance.token.symbol}
                          </Typography>
                          <Typography
                            variant="featured3"
                            sx={{ textAlign: 'right', flexGrow: 1 }}
                          >
                            {format(balance.amount, 2)}
                          </Typography>
                          <Typography
                            variant="featured3"
                            color="text.secondary"
                            sx={{ width: 60, textAlign: 'right' }}
                          >
                            {intl.formatNumber(
                              toNumber(div(balance.amount, s.total)),
                              {
                                style: 'percent',
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1,
                              },
                            )}
                          </Typography>
                        </Stack>
                      ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};
