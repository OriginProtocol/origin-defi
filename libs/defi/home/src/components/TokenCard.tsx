import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { GradientChip, useTokenInfo } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { BoxProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenCardProps = {
  token: Token;
  hrefLabel?: string;
  href?: string;
  externalHref?: string;
  isComingSoon?: boolean;
  hideGradient?: boolean;
} & BoxProps;

export const TokenCard = ({
  token,
  hrefLabel,
  href,
  externalHref,
  isComingSoon,
  hideGradient,
  ...rest
}: TokenCardProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(token, {
    enabled: !isComingSoon,
  });

  return (
    <Box
      {...rest}
      sx={{
        px: 3,
        py: 2,
        color: 'text.primary',
        backgroundColor: 'background.highlight',
        ...rest?.sx,
      }}
    >
      <Grid2 columns={14} spacing={{ xs: 1, sm: 2, md: 3 }} container>
        <Grid2 xs={1} order={{ xs: 2, md: 1 }}>
          <Stack alignItems={{ xs: 'flex-end', md: 'center' }}>
            <TokenIcon token={token} showNetwork sx={{ fontSize: 40 }} />
          </Stack>
        </Grid2>
        <Grid2 xs={12} md={2} order={{ xs: 1, md: 2 }}>
          <Stack>
            <Typography variant="body2" fontWeight="bold">
              {token.name}
            </Typography>
            <Typography variant="caption1">{token.symbol}</Typography>
          </Stack>
        </Grid2>
        <Grid2 xs={14} md={2} order={3}>
          {hideGradient ? (
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography
                variant="featured2"
                fontWeight="bold"
                color="primary.main"
              >
                {intl.formatNumber(info?.apies?.apy30DayAvg ?? 0, {
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
            <GradientChip
              direction="row"
              alignItems="baseline"
              justifyContent="center"
              spacing={1}
              maxWidth={120}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {isComingSoon ? (
                intl.formatMessage({ defaultMessage: 'Coming soon' })
              ) : (
                <>
                  <LoadingLabel isLoading={isInfoLoading} fontWeight="bold">
                    {intl.formatNumber(info?.apies?.apy30DayAvg ?? 0, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </LoadingLabel>{' '}
                  <Typography variant="caption1" color="primary.contrastText">
                    {intl.formatMessage({ defaultMessage: 'APY' })}
                  </Typography>
                </>
              )}
            </GradientChip>
          )}
        </Grid2>
        <Grid2 xs={14} md={2} order={4}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            spacing={0.5}
            pl={{ xs: 0, md: 1 }}
          >
            <Typography variant="caption1">
              {intl.formatMessage({ defaultMessage: 'TVL' })}
            </Typography>
            <Stack
              direction="row"
              alignItems="baseline"
              flexWrap="nowrap"
              spacing={0.75}
              divider={
                <Divider variant="middle" orientation="vertical" flexItem />
              }
            >
              <LoadingLabel
                fontWeight="bold"
                isLoading={isInfoLoading && !isComingSoon}
                noWrap
              >
                {isComingSoon
                  ? '-'
                  : `三 ${format(info?.tvl ?? from(0), { compact: true, digits: 2 })}`}
              </LoadingLabel>
              {!isComingSoon && (
                <LoadingLabel
                  variant="caption2"
                  fontWeight="medium"
                  isLoading={isInfoLoading}
                >
                  $&nbsp;{format(info?.tvlUsd ?? from(0), { compact: true })}
                </LoadingLabel>
              )}
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 xs={14} md={2} order={5}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            justifyContent={{ xs: 'space-between', md: 'flex-end' }}
            pt={{ xs: 2, md: 0 }}
            spacing={0.5}
          >
            <Typography variant="caption1">
              {intl.formatMessage({ defaultMessage: 'Your balance' })}
            </Typography>
            <LoadingLabel
              fontWeight="bold"
              isLoading={isInfoLoading && !isComingSoon}
            >
              {!isConnected || isComingSoon
                ? '-'
                : format(info?.balance ?? from(0), {
                    digits: getFormatPrecision(info?.balance ?? from(0)),
                  })}
            </LoadingLabel>
          </Stack>
        </Grid2>
        <Grid2 xs={14} md={2} order={6}>
          <Stack
            direction={{ xs: 'row', md: 'column' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            justifyContent={{ xs: 'space-between', md: 'flex-end' }}
            pb={{ xs: 2, md: 0 }}
            spacing={0.5}
          >
            <Typography variant="caption1">
              {intl.formatMessage({ defaultMessage: 'Yield earned' })}
            </Typography>
            <Typography fontWeight="bold">
              {!isConnected || isComingSoon
                ? '-'
                : format(info?.yieldEarned ?? from(0), {
                    digits: getFormatPrecision(info?.yieldEarned ?? from(0)),
                  })}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 xs={14} md={3} order={7}>
          {!!href && (
            <Button
              component={RouterLink}
              to={href}
              sx={{ whiteSpace: 'nowrap' }}
              fullWidth
              disabled={isComingSoon}
            >
              {hrefLabel ??
                intl.formatMessage(
                  { defaultMessage: 'Get {symbol}' },
                  { symbol: token.symbol },
                )}
            </Button>
          )}
          {!!externalHref && (
            <Button
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer nofollow"
              sx={{ whiteSpace: 'nowrap' }}
              fullWidth
              disabled={isComingSoon}
            >
              {hrefLabel ??
                intl.formatMessage(
                  { defaultMessage: 'Get {symbol}' },
                  { symbol: token.symbol },
                )}
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};
