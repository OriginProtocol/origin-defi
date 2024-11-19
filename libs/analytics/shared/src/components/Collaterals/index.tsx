import { useMemo } from 'react';

import { Card, CardContent, Grid2, Stack, Typography } from '@mui/material';
import {
  CurrencyLabel,
  PieChart,
  Spinner,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useStrategiesConfig } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useMeasure } from '@react-hookz/web';
import { add, compare, div, format, from, gt, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import { useOTokenStrategiesQuery } from '../../queries';
import { collateralMapper, strategyMapper } from '../../utils';
import { useLayout } from '../Layout';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

import type { StrategyBalanceMapped, StrategyMapped } from '../../utils';

const tokenColors = {
  [tokens.mainnet.ETH.id]: '#8C8C8C',
  [tokens.mainnet.WETH.id]: '#618ECE',
  [tokens.mainnet.OETH.id]: '#0074F0',
  [tokens.mainnet.DAI.id]: '#F9B01E',
  [tokens.mainnet.USDC.id]: '#2775CA',
  [tokens.mainnet.USDT.id]: '#53AE94',
  [tokens.base.WETH.id]: '#618ECE',
};

export type CollateralsProps = { token: Token; currency?: 'ETH' | 'USD' };

export const Collaterals = ({ token, currency }: CollateralsProps) => {
  const intl = useIntl();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const [{ isDrawerOpen }] = useLayout();
  const { data: strategiesConfigs } = useStrategiesConfig({
    apiKey: import.meta.env.VITE_STRAPI_API_KEY,
    url: import.meta.env.VITE_STRAPI_URL,
  });

  const { data, isLoading } = useOTokenStrategiesQuery({
    token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
    chainId: token.chainId,
  });
  const { collaterals, totalCollaterals, strategies } = useMemo(() => {
    const collaterals = collateralMapper(data?.strategies, token, {
      showEmptyBalances: false,
    })?.filter((c) => gt(c.amount, from(1, c.token.decimals)));

    const totalCollaterals = collaterals.reduce(
      (acc, curr) => add(acc, curr.amount),
      from(0, 18),
    );
    const strategies = strategyMapper(
      data?.strategies,
      token,
      strategiesConfigs,
      {
        showEmptyBalances: false,
      },
    );

    return {
      collaterals,
      totalCollaterals,
      strategies,
    };
  }, [data?.strategies, token, strategiesConfigs]);

  if (isLoading) {
    return <Spinner sx={{ width: 1, height: 300 }} />;
  }

  if (!collaterals.length) {
    return (
      <Stack
        sx={{ justifyContent: 'center', alignItems: 'center', minHeight: 300 }}
      >
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'No collaterals' })}
        </Typography>
      </Stack>
    );
  }

  const collateralsData = collaterals.map((c) => ({
    label: c.token.symbol,
    value: toNumber(c.amount),
    color: tokenColors[c.token.id as keyof typeof tokenColors],
  }));
  const width = measures?.width ?? 0;

  return (
    <Stack spacing={2}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }} ref={ref}>
          <Stack
            ref={ref}
            sx={{ justifyContent: 'center', alignItems: 'center', height: 1 }}
          >
            <PieChart data={collateralsData} width={width} height={400} />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            sx={{ flexWrap: 'wrap', rowGap: 2, columnGap: 2 }}
          >
            {collaterals.map((b) => (
              <Collateral
                key={b.token.id}
                balance={b}
                total={totalCollaterals}
                sx={{ flexGrow: { xs: 1, md: 0 } }}
              />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
      <Typography variant="featured2">
        {intl.formatMessage({ defaultMessage: 'Collateral distribution' })}
      </Typography>
      <Grid2 container spacing={2}>
        {strategies.map((s) => (
          <Grid2
            key={s.id}
            size={{
              xs: 12,
              sm: 6,
              md: isDrawerOpen ? 6 : 4,
              lg: 4,
            }}
          >
            <Strategy
              strategy={s}
              currency={currency}
              sx={{ width: 1, height: 1 }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};

type CollateralProps = {
  balance: StrategyBalanceMapped;
  total: Dnum;
} & CardProps;

const Collateral = ({ balance, total, ...rest }: CollateralProps) => {
  const intl = useIntl();

  const percentage = div(balance.amount, total);

  return (
    <Card {...rest}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <TokenIcon token={balance.token} sx={{ fontSize: 36 }} />
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
              <Typography variant="body2">{balance.token.name}</Typography>
              <Typography color="text.secondary">
                ({balance.token.symbol})
              </Typography>
            </Stack>
            <Typography variant="featured2">
              {intl.formatNumber(toNumber(balance.amount))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {intl.formatNumber(
                toNumber(percentage, {
                  decimalsRounding: 'ROUND_HALF',
                  digits: 2,
                }),
                {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

type StrategyProps = {
  strategy: StrategyMapped;
  currency?: 'ETH' | 'USD';
} & CardProps;

const Strategy = ({ strategy, currency, ...rest }: StrategyProps) => {
  const intl = useIntl();

  return (
    <Card {...rest}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">{strategy.title}</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pb: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Total Value:' })}
            </Typography>
            <Typography variant="body2">
              {currency && <CurrencyLabel currency={currency} />}
              {intl.formatNumber(toNumber(strategy.total), {
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
          <Typography fontWeight="bold">
            {intl.formatMessage({ defaultMessage: 'Asset Split:' })}
          </Typography>
          {strategy.balances
            .filter((b) => gt(b.amount, from(1, b.token.decimals)))
            .toSorted((a, b) => compare(b.amount, a.amount))
            .map((balance) => (
              <Stack
                key={balance.token.id}
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <TokenIcon token={balance.token} sx={{ fontSize: 24 }} />
                <Typography>{balance.token.symbol}</Typography>
                <Typography sx={{ textAlign: 'right', flexGrow: 1 }}>
                  {format(balance.amount, 2)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ width: 60, textAlign: 'right' }}
                >
                  {intl.formatNumber(
                    toNumber(div(balance.amount, strategy.total)),
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
  );
};
