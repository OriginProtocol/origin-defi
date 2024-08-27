import { useState } from 'react';

import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTokenInfo, useXOgnStakingApy } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { getFormatPrecision } from '@origin/shared/utils';
import { useIntervalEffect } from '@react-hookz/web';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import SlotCounter from 'react-slot-counter';
import { useAccount } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

export type TokenCardProps = {
  token: Token;
  hrefLabel?: string;
  href?: string;
  externalHref?: string;
  isComingSoon?: boolean;
} & StackProps;

export const TokenCard = ({
  token,
  hrefLabel,
  href,
  externalHref,
  isComingSoon,
  ...rest
}: TokenCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(token, {
    enabled: !isComingSoon,
  });
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    undefined,
    12,
    {
      enabled: token.id === tokens.mainnet.OGN.id,
    },
  );

  const isOgn = token.id === tokens.mainnet.OGN.id;
  const apy = isOgn ? staking?.xOgnApyPercentage : info?.apies?.apy;
  const isApyLoading = isOgn ? isStakingLoading : isInfoLoading;
  const apyLabel = isOgn
    ? intl.formatMessage({ defaultMessage: 'Max vAPY' })
    : intl.formatMessage({ defaultMessage: 'APY' });

  return (
    <Stack
      {...rest}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'stretch', md: 'center' }}
      justifyContent={{ xs: 'stretch', md: 'space-between' }}
      spacing={{ xs: 1, md: 3 }}
      sx={{
        py: 2,
        px: 3,
        color: 'text.primary',
        backgroundColor: 'background.highlight',
        [theme.breakpoints.up('md')]: {
          '>*': {
            width: 1,
          },
        },
        ...rest?.sx,
      }}
    >
      <Stack
        justifyContent={{ xs: 'space-between', md: 'flex-start' }}
        alignItems="center"
        direction={{ xs: 'row-reverse', md: 'row' }}
        spacing={2}
      >
        <TokenIcon token={token} showNetwork sx={{ fontSize: 40 }} />
        <Stack height={1} justifyContent="center">
          <Typography variant="body2" fontWeight="bold" noWrap>
            {token.name}
          </Typography>
          <Typography variant="caption1" noWrap>
            {token.symbol}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        mb={{ xs: 0.5, md: 0 }}
        pl={{ xs: 0, md: 2 }}
        minWidth={140}
      >
        {isComingSoon ? (
          <ComingSoonAPY />
        ) : (
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <LoadingLabel
              isLoading={isApyLoading}
              variant="featured2"
              fontWeight="bold"
              sx={{
                background: (theme) =>
                  theme.palette.background.gradientBlueDark,
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                ...(!isApyLoading && {
                  '::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 2,
                    bottom: 1,
                    height: 2,
                    background: (theme) =>
                      theme.palette.background.gradientBlueDark,
                  },
                }),
              }}
            >
              {intl.formatNumber(apy ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
            <Typography
              variant="caption1"
              color="primary.contrastText"
              noWrap
              sx={{
                background: (theme) =>
                  theme.palette.background.gradientBlueDark,
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {apyLabel}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Stack
        direction={{ xs: 'row', md: 'column' }}
        alignItems={{ xs: 'baseline', md: 'flex-start' }}
        spacing={{ xs: 1, md: 0 }}
      >
        <Typography variant="caption1">
          {intl.formatMessage({ defaultMessage: 'TVL' })}
          {isSm && `: `}
        </Typography>
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          alignItems={{ xs: 'baseline', md: 'flex-start' }}
          flexWrap="nowrap"
          spacing={{ xs: 0.5, md: 0 }}
        >
          <LoadingLabel
            fontWeight="bold"
            isLoading={isInfoLoading && !isComingSoon}
            noWrap
          >
            {isComingSoon
              ? '-'
              : ['OGN', 'OUSD'].includes(token.symbol)
                ? `${format(info?.totalSupply ?? from(0), { compact: true, digits: 2 })} ${token.symbol}`
                : `Ξ ${format(info?.totalSupply ?? from(0), { compact: true, digits: 2 })}`}
          </LoadingLabel>
          {!isComingSoon && isSm && (
            <Box
              sx={{
                width: '1px',
                height: 10,
                backgroundColor: 'divider',
              }}
            />
          )}
          {!isComingSoon && (
            <LoadingLabel
              variant="caption2"
              fontWeight="medium"
              isLoading={isInfoLoading}
            >
              $&nbsp;
              {format(info?.tvlUsd ?? from(0), {
                compact: true,
                digits: 2,
              })}
            </LoadingLabel>
          )}
        </Stack>
      </Stack>

      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Your balance' })}
        value={`${
          !isConnected || isComingSoon
            ? '-'
            : format(info?.balance ?? from(0), {
                digits: getFormatPrecision(info?.balance ?? from(0)),
              })
        }`}
        {...valueLabelProps}
        isLoading={isInfoLoading && !isComingSoon}
        pt={{ xs: 2, md: 0 }}
      />

      {!isOgn && (
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Yield earned' })}
          value={`${
            !isConnected || isComingSoon
              ? '-'
              : format(info?.yieldEarned ?? from(0), {
                  digits: getFormatPrecision(info?.yieldEarned ?? from(0)),
                })
          }`}
          {...valueLabelProps}
          isLoading={isInfoLoading && !isComingSoon}
        />
      )}

      <Stack justifyContent="center" pt={{ xs: 2, md: 0 }}>
        {!!href && (
          <Button
            component={RouterLink}
            to={href}
            sx={{ whiteSpace: 'nowrap' }}
            fullWidth
            disabled={isComingSoon}
            size={isSm ? 'large' : 'medium'}
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
            size={isSm ? 'large' : 'medium'}
          >
            {hrefLabel ??
              intl.formatMessage(
                { defaultMessage: 'Get {symbol}' },
                { symbol: token.symbol },
              )}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: { xs: 'row', md: 'column' },
  alignItems: { xs: 'center', md: 'flex-end' },
  justifyContent: { xs: 'space-between', md: 'center' },
  spacing: 0.5,
  labelProps: { variant: 'caption1', noWrap: true },
  valueProps: { fontWeight: 'medium', noWrap: true },
};

function ComingSoonAPY(props: StackProps) {
  const intl = useIntl();
  const [fakeApy, setFakeApy] = useState('17.52');

  useIntervalEffect(() => {
    const val = intl.formatNumber(
      (Math.random() * (20 - 5 + 1) + 5) * 1.132151,
      {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      },
    );
    setFakeApy(val);
  }, 2500);

  return (
    <Stack alignItems="flex-start" {...props}>
      <Stack
        direction="row"
        alignItems="center"
        sx={(theme) => ({
          '.slot': (theme) => ({
            ...theme.typography.featured2,
            fontWeight: 'bold',
            background: (theme) => theme.palette.background.gradientBlueDark,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            width: 14,
          }),
          '.sep': {
            ...theme.typography.featured2,
            background: (theme) => theme.palette.background.gradientBlueDark,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            px: -0.25,
          },
        })}
      >
        <SlotCounter
          value={fakeApy}
          duration={2}
          speed={2}
          numberClassName="slot"
          separatorClassName="sep"
        />
        <Typography
          variant="featured2"
          fontWeight="bold"
          sx={{
            background: (theme) => theme.palette.background.gradientBlueDark,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          %
        </Typography>
      </Stack>
      <Typography
        variant="caption1"
        sx={{
          background: (theme) => theme.palette.background.gradientBlueDark,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'coming soon' })}
      </Typography>
    </Stack>
  );
}
