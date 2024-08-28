import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTokenInfo, useXOgnStakingApy } from '@origin/defi/shared';
import {
  LoadingLabel,
  NumberSpinner,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { getFormatPrecision, isInArray } from '@origin/shared/utils';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

export type TokenCardProps = {
  token: Token;
  hrefLabel?: string;
  href?: string;
  externalHref?: string;
  isComingSoon?: boolean;
  disabled?: boolean;
} & StackProps;

export const TokenCard = ({
  token,
  hrefLabel,
  href,
  externalHref,
  isComingSoon,
  disabled,
  ...rest
}: TokenCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(token, {
    enabled: !isComingSoon && !disabled,
  });
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    undefined,
    12,
    {
      enabled: token.id === tokens.mainnet.OGN.id,
    },
  );

  const isFancy = isInArray(token.id, [
    tokens.base.superOETHb.id,
    tokens.optimism.superOETHo.id,
  ]);
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
              isLoading={isApyLoading && !isComingSoon}
              variant="featured2"
              fontWeight="bold"
              sx={{
                position: 'relative',
                ...(isFancy
                  ? {
                      background: (theme) =>
                        theme.palette.background.gradientBlueDark,
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : { color: 'primary.main' }),
                ...(!isApyLoading &&
                  !disabled && {
                    '::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 2,
                      bottom: 1,
                      height: 2,
                      background: (theme) =>
                        isFancy
                          ? theme.palette.background.gradientBlueDark
                          : theme.palette.primary.main,
                    },
                  }),
              }}
            >
              {disabled
                ? '-'
                : intl.formatNumber(apy ?? 0, {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </LoadingLabel>
            {!disabled && (
              <Typography
                variant="caption1"
                color="primary.contrastText"
                noWrap
                sx={
                  isFancy
                    ? {
                        background: (theme) =>
                          theme.palette.background.gradientBlueDark,
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }
                    : { color: 'primary.main' }
                }
              >
                {apyLabel}
              </Typography>
            )}
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
            fontSize={(theme) => ({
              xs: theme.typography.caption1.fontSize,
              md: theme.typography.body3.fontSize,
            })}
            fontWeight="bold"
            isLoading={isInfoLoading && !isComingSoon}
            noWrap
          >
            {disabled
              ? '-'
              : ['OGN', 'OUSD'].includes(token.symbol)
                ? `${format(info?.totalSupply ?? from(0), { compact: true, digits: 2 })} ${token.symbol}`
                : `Ξ ${format(info?.totalSupply ?? from(0), { compact: true, digits: 2 })}`}
          </LoadingLabel>
          {!disabled && isSm && (
            <Box
              sx={{
                width: '1px',
                height: 10,
                backgroundColor: 'divider',
              }}
            />
          )}
          {!disabled && (
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
          !isConnected || disabled
            ? '-'
            : format(info?.balance ?? from(0), {
                digits: getFormatPrecision(info?.balance ?? from(0)),
              })
        }`}
        {...valueLabelProps}
        isLoading={isInfoLoading && !disabled}
        pt={{ xs: 1, md: 0 }}
      />

      {!isOgn && (
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Yield earned' })}
          value={`${
            !isConnected || disabled
              ? '-'
              : format(info?.yieldEarned ?? from(0), {
                  digits: getFormatPrecision(info?.yieldEarned ?? from(0)),
                })
          }`}
          {...valueLabelProps}
          isLoading={isInfoLoading && !disabled}
        />
      )}

      <Stack justifyContent="center" pt={{ xs: 2, md: 0 }}>
        {!!href && (
          <Button
            component={RouterLink}
            to={href}
            sx={{ whiteSpace: 'nowrap' }}
            fullWidth
            disabled={disabled}
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
            disabled={disabled}
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
  valueProps: {
    fontWeight: 'medium',
    noWrap: true,
    fontSize: (theme) => ({
      xs: theme.typography.caption1.fontSize,
      md: theme.typography.body3.fontSize,
    }),
  },
};

function ComingSoonAPY(props: StackProps) {
  const intl = useIntl();

  return (
    <Stack alignItems="flex-start" {...props}>
      <Stack direction="row" alignItems="center">
        <NumberSpinner height={32} typographyProps={textProps} />
        <NumberSpinner height={32} duration={1.5} typographyProps={textProps} />
        <Typography {...textProps}>.</Typography>
        <NumberSpinner height={32} duration={1.3} typographyProps={textProps} />
        <Typography {...textProps}>%</Typography>
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

const textProps: Partial<TypographyProps> = {
  variant: 'featured2',
  fontWeight: 'bold',
  sx: {
    background: (theme) => theme.palette.background.gradientBlueDark,
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
};
