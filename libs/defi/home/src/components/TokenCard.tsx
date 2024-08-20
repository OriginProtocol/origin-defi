import { Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { GradientChip, useTokenInfo } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { Grid2Props } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenCardProps = {
  token: Token;
  isComingSoon?: boolean;
  hideGradient?: boolean;
} & Grid2Props;

export const TokenCard = ({
  token,
  isComingSoon,
  hideGradient,
  ...rest
}: TokenCardProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { isLoading, apy, balance, tvl, tvlUsd, yieldEarned } = useTokenInfo({
    token,
    enabled: !isComingSoon,
  });

  return (
    <Grid2
      columns={14}
      spacing={3}
      container
      {...rest}
      sx={{
        px: 3,
        py: 2,
        color: 'text.primary',
        backgroundColor: 'background.highlight',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Grid2 xs={1}>
        <TokenIcon token={token} showNetwork sx={{ fontSize: 40 }} />
      </Grid2>
      <Grid2 xs={3}>
        <Stack>
          <Typography variant="body2" fontWeight="bold">
            {token.name}
          </Typography>
          <Typography variant="caption1">{token.symbol}</Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={2}>
        {hideGradient ? (
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography
              variant="featured2"
              fontWeight="bold"
              color="primary.main"
            >
              {intl.formatNumber(apy ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography variant="caption1" color="primary.main">
              {intl.formatMessage({ defaultMessage: 'APY' })}
            </Typography>
          </Stack>
        ) : (
          <GradientChip>
            {isComingSoon ? (
              intl.formatMessage({ defaultMessage: 'Coming soon' })
            ) : (
              <LoadingLabel isLoading={isLoading}>
                {intl.formatNumber(apy ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </LoadingLabel>
            )}
          </GradientChip>
        )}
      </Grid2>
      <Grid2 xs={2}>
        <Stack>
          <Typography variant="caption1">
            {intl.formatMessage({ defaultMessage: 'TVL' })}
          </Typography>
          <LoadingLabel
            fontWeight="bold"
            isLoading={isLoading && !isComingSoon}
          >
            {isComingSoon
              ? '-'
              : `三 ${format(tvl ?? from(0), { compact: true })}`}
          </LoadingLabel>
          {!isComingSoon && (
            <LoadingLabel
              variant="caption2"
              fontWeight="medium"
              isLoading={isLoading}
            >
              $&nbsp;{format(tvlUsd, { compact: true })}
            </LoadingLabel>
          )}
        </Stack>
      </Grid2>
      <Grid2 xs={2}>
        <Stack alignItems="flex-end">
          <Typography variant="caption1">
            {intl.formatMessage({ defaultMessage: 'Your balance' })}
          </Typography>
          <LoadingLabel
            fontWeight="bold"
            isLoading={isLoading && !isComingSoon}
          >
            {!isConnected || isComingSoon
              ? '-'
              : format(balance, {
                  digits: getFormatPrecision(balance),
                })}
          </LoadingLabel>
        </Stack>
      </Grid2>
      <Grid2 xs={2}>
        <Stack alignItems="flex-end">
          <Typography variant="caption1">
            {intl.formatMessage({ defaultMessage: 'Yield earned' })}
          </Typography>
          <Typography fontWeight="bold">
            {!isConnected || isComingSoon
              ? '-'
              : format(yieldEarned, {
                  digits: getFormatPrecision(yieldEarned),
                })}
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 xs={2}>
        {!isComingSoon && (
          <Button
            component={RouterLink}
            to={`/${token.symbol}`}
            sx={{ whiteSpace: 'nowrap' }}
            fullWidth
          >
            {intl.formatMessage(
              { defaultMessage: 'Get {symbol}' },
              { symbol: token.symbol },
            )}
          </Button>
        )}
      </Grid2>
    </Grid2>
  );
};
