import {
  Button,
  Divider,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArmDailyStatOrderByInput,
  useArmApy,
  useArmDailyStatsQuery,
} from '@origin/defi/shared';
import {
  CurrencyLabel,
  InfoTooltip,
  LoadingLabel,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ARM } from '@origin/shared/icons';
import {
  getTokenPriceKey,
  useTokenPrice,
  useWatchBalance,
} from '@origin/shared/providers';
import { from, mul, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { Link } from 'react-router';
import { useAccount } from 'wagmi';

import { GRID_SIZES } from '../constants';

import type { Grid2Props, StackProps } from '@mui/material';
import type { Dnum } from 'dnum';

const APY_TRAILING = 30;

export const ARMRow = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.mainnet['ARM-WETH-stETH']),
  );
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet['ARM-WETH-stETH'],
  });
  const { data: apyTrailing, isLoading: isApyTrailingLoading } =
    useArmApy(APY_TRAILING);
  const { data: stat, isLoading: isStatLoading } = useArmDailyStatsQuery(
    { limit: 1, offset: 1, orderBy: ArmDailyStatOrderByInput.TimestampDesc },
    {
      select: (data) => data?.armDailyStats?.[0],
    },
  );

  const tvl = stat?.totalSupply
    ? ([
        BigInt(stat.totalSupply),
        tokens.mainnet['ARM-WETH-stETH'].decimals,
      ] as Dnum)
    : from(0);
  const exchangeRate = stat?.assetsPerShare
    ? ([
        BigInt(stat.assetsPerShare),
        tokens.mainnet['ARM-WETH-stETH'].decimals,
      ] as Dnum)
    : from(0);
  const tvlUsd = mul(tvl, price ?? 0);
  const wethBalance = mul(
    [balance ?? 0n, tokens.mainnet['ARM-WETH-stETH'].decimals],
    exchangeRate,
  );

  if (isSm) {
    return (
      <Stack
        {...props}
        sx={[
          {
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: 3,
          },
          ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
        ]}
      >
        <Stack useFlexGap sx={{ gap: 1 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {intl.formatMessage({
                  defaultMessage: 'Origin ARM',
                })}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography variant="caption1">
                  {intl.formatMessage({
                    defaultMessage: 'ETH Vault',
                  })}
                </Typography>
              </Stack>
            </Stack>
            <ARM sx={{ fontSize: 40 }} />
          </Stack>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: 'baseline', justifyContent: 'flex-start' }}
          >
            <LoadingLabel
              variant="featured2"
              isLoading={isApyTrailingLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {intl.formatNumber(apyTrailing ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
            <InfoTooltip
              iconColor="primary.main"
              tooltipLabel={intl.formatMessage(
                {
                  defaultMessage: '{trailing}-day trailing APY',
                },
                {
                  trailing: APY_TRAILING,
                },
              )}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ alignItems: 'baseline', justifyContent: 'flex-start' }}
          >
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'TVL' })}
              value={intl.formatNumber(toNumber(tvl), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              direction="row"
              spacing={0.5}
              isLoading={isStatLoading}
              currency="ETH"
              valueProps={{ sx: { fontWeight: 'bold' } }}
            />
            <LoadingLabel
              isLoading={isStatLoading || isPriceLoading}
              variant="caption2"
              color="text.secondary"
            >
              $
              {intl.formatNumber(toNumber(tvlUsd), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
          <Stack spacing={0.5} sx={{ mb: 1 }}>
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Your balance' })}
              value={
                isConnected
                  ? intl.formatNumber(toNumber(wethBalance), {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '-'
              }
              isLoading={isBalanceLoading || isStatLoading}
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            />
          </Stack>
          <Button component={Link} to="arm/steth-redemption-vault" fullWidth>
            {intl.formatMessage({ defaultMessage: 'Deposit' })}
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      {...props}
      sx={[
        {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 3,
        },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <Grid2 container spacing={1} sx={{ width: 1 }}>
        <Grid2 size={GRID_SIZES[0]} {...gridProps}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <ARM sx={{ fontSize: 40 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {intl.formatMessage({
                defaultMessage: 'Origin ARM',
              })}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[1]} {...gridProps}>
          <Typography sx={{ fontWeight: 'medium' }}>
            {intl.formatMessage({
              defaultMessage: 'ETH Vault',
            })}
          </Typography>
        </Grid2>
        <Grid2 size={GRID_SIZES[2]} {...gridProps}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
            <LoadingLabel
              variant="featured2"
              isLoading={isApyTrailingLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {intl.formatNumber(apyTrailing ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
            <InfoTooltip
              iconColor="primary.main"
              tooltipLabel={intl.formatMessage(
                {
                  defaultMessage: '{trailing}-day trailing APY',
                },
                {
                  trailing: APY_TRAILING,
                },
              )}
            />
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[3]} {...gridProps}>
          <Stack>
            <LoadingLabel isLoading={isStatLoading} sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency="ETH">
                {intl.formatNumber(toNumber(tvl), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </CurrencyLabel>
            </LoadingLabel>
            <LoadingLabel
              isLoading={isStatLoading || isPriceLoading}
              variant="caption2"
              color="text.secondary"
            >
              $
              {intl.formatNumber(toNumber(tvlUsd), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[4]} {...gridProps}>
          <LoadingLabel isLoading={isStatLoading || isBalanceLoading}>
            {isConnected
              ? intl.formatNumber(toNumber(wethBalance), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '-'}
          </LoadingLabel>
        </Grid2>
        <Grid2
          size={GRID_SIZES[6]}
          offset={GRID_SIZES[5]}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button component={Link} to="arm/steth-redemption-vault" fullWidth>
            {intl.formatMessage({ defaultMessage: 'Deposit' })}
          </Button>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

const gridProps: Partial<Grid2Props> = {
  sx: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};
