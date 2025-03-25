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
  dailyStatMapper,
  useOTokenStatsQuery,
  useTokenInfo,
} from '@origin/defi/shared';
import { OTokenDailyStatOrderByInput } from '@origin/defi/shared';
import {
  CurrencyLabel,
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { from, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { Link } from 'react-router';
import { useAccount } from 'wagmi';

import { GRID_SIZES } from '../constants';

import type { Grid2Props, StackProps } from '@mui/material';
import type { Currency } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

export type TokenRowProps = {
  token: Token;
  currency: Currency;
  productDescription: string;
  href?: string;
} & StackProps;

export const TokenRow = ({
  token,
  productDescription,
  currency,
  href,
  ...rest
}: TokenRowProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(token);
  const { data: stat, isLoading: isStatLoading } = useOTokenStatsQuery(
    {
      chainId: token.chainId,
      token: token.address?.toLowerCase() ?? '',
      limit: 1,
      orderBy: OTokenDailyStatOrderByInput.TimestampDesc,
      offset: 1,
    },
    {
      enabled: !!token.address,
      select: (data) => dailyStatMapper(data.oTokenDailyStats?.[0], token),
    },
  );

  if (isSm) {
    return (
      <Stack
        {...rest}
        sx={[
          {
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: 3,
          },
          ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
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
                {token.name}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography variant="caption1">({token.symbol})</Typography>
                <Typography variant="caption1">{productDescription}</Typography>
              </Stack>
            </Stack>
            <TokenIcon token={token} showNetwork sx={{ fontSize: 40 }} />
          </Stack>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: 'baseline', justifyContent: 'flex-start' }}
          >
            <LoadingLabel
              variant="featured2"
              isLoading={isStatLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {intl.formatNumber(stat?.bestApy.value ?? 0, {
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
                  trailing: stat?.bestApy.trailingDays,
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
              value={intl.formatNumber(stat?.totalSupply ?? 0, {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              direction="row"
              spacing={0.5}
              isLoading={isStatLoading}
              currency={currency}
              valueProps={{ sx: { fontWeight: 'bold' } }}
            />
            <LoadingLabel isLoading={isStatLoading} color="text.secondary">
              $
              {intl.formatNumber(stat?.tvlUSD ?? 0, {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
          <Stack spacing={0.5} sx={{ mb: 1 }}>
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Your balance' })}
              value={intl.formatNumber(toNumber(info?.balance ?? from(0)), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              isLoading={isInfoLoading}
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            />
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Yield earned' })}
              value={intl.formatNumber(toNumber(info?.yieldEarned ?? from(0)), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              isLoading={isInfoLoading}
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            />
          </Stack>
          <Button component={Link} to={href ?? ''} fullWidth>
            {intl.formatMessage(
              { defaultMessage: 'Get {symbol}' },
              { symbol: token.symbol },
            )}
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 3,
        },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
    >
      <Grid2 container spacing={1} sx={{ width: 1 }}>
        <Grid2 size={GRID_SIZES[0]} {...gridProps}>
          <Stack direction="row" spacing={2}>
            <TokenIcon token={token} showNetwork sx={{ fontSize: 40 }} />
            <Stack>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {token.name}
              </Typography>
              <Typography variant="caption1" color="text.secondary">
                ({token.symbol})
              </Typography>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[1]} {...gridProps}>
          <Typography sx={{ fontWeight: 'medium' }}>
            {productDescription}
          </Typography>
        </Grid2>
        <Grid2 size={GRID_SIZES[2]} {...gridProps}>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: 'baseline', justifyContent: 'center' }}
          >
            <LoadingLabel
              variant="featured2"
              isLoading={isStatLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {intl.formatNumber(stat?.bestApy.value ?? 0, {
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
                  trailing: stat?.bestApy.trailingDays,
                },
              )}
            />
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[3]} {...gridProps}>
          <Stack>
            <LoadingLabel isLoading={isStatLoading} sx={{ fontWeight: 'bold' }}>
              <CurrencyLabel currency={currency}>
                {intl.formatNumber(stat?.totalSupply ?? 0, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </CurrencyLabel>
            </LoadingLabel>
            <LoadingLabel
              isLoading={isStatLoading}
              variant="caption2"
              color="text.secondary"
            >
              $
              {intl.formatNumber(stat?.tvlUSD ?? 0, {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[4]} {...gridProps}>
          <LoadingLabel isLoading={isInfoLoading} sx={{ fontWeight: 'medium' }}>
            {isConnected
              ? intl.formatNumber(toNumber(info?.balance ?? from(0)), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '-'}
          </LoadingLabel>
        </Grid2>
        <Grid2 size={GRID_SIZES[5]} {...gridProps}>
          <LoadingLabel isLoading={isInfoLoading} sx={{ fontWeight: 'medium' }}>
            {isConnected
              ? intl.formatNumber(toNumber(info?.yieldEarned ?? from(0)), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '-'}
          </LoadingLabel>
        </Grid2>
        <Grid2
          size={GRID_SIZES[6]}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button component={Link} to={href ?? ''} fullWidth>
            {intl.formatMessage(
              { defaultMessage: 'Get {symbol}' },
              { symbol: token.symbol },
            )}
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
