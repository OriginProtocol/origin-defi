import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  useArmApy,
  useArmDailyStatsQuery,
  useTokenInfo,
  useXOgnStakingApy,
} from '@origin/defi/shared';
import {
  CurrencyLabel,
  InfoTooltip,
  LoadingLabel,
  NumberSpinner,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ARM } from '@origin/shared/icons';
import {
  getTokenPriceKey,
  useTokenPrice,
  useWatchBalance,
} from '@origin/shared/providers';
import { getFormatPrecision, includes } from '@origin/shared/utils';
import { format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

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
    enabled: !disabled,
  });
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    undefined,
    12,
    {
      enabled: token.id === tokens.mainnet.OGN.id,
    },
  );

  const isFancy = includes(
    [tokens.base.superOETHb.id, tokens.optimism.superOETHo.id],
    token.id,
  );
  const isOgn = token.id === tokens.mainnet.OGN.id;
  const isSuperOeth = token.id === tokens.base.superOETHb.id;
  const apy = isOgn
    ? staking?.xOgnApyPercentage
    : isSuperOeth
      ? info?.apy7
      : info?.bestApy.value;
  const isApyLoading = isOgn ? isStakingLoading : isInfoLoading;
  const apyLabel = isOgn
    ? intl.formatMessage({ defaultMessage: 'Max vAPY' })
    : intl.formatMessage({ defaultMessage: 'APY' });
  const trailingDays = isSuperOeth ? 7 : info?.bestApy?.trailingDays;

  return (
    <Stack
      {...rest}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      sx={[
        {
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: { xs: 'stretch', md: 'space-between' },
          py: 2,
          px: 3,
          color: 'text.primary',
          backgroundColor: 'background.highlight',
          [theme.breakpoints.up('md')]: {
            '>*': {
              width: 1,
            },
          },
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction={{ xs: 'row-reverse', md: 'row' }}
        spacing={2}
        sx={{
          justifyContent: { xs: 'space-between', md: 'flex-start' },
          alignItems: 'center',
        }}
      >
        <TokenIcon token={token} showNetwork sx={{ fontSize: 40 }} />
        <Stack
          sx={{
            height: 1,
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              fontWeight: 'bold',
            }}
          >
            {token.name}
          </Typography>
          <Typography variant="caption1" noWrap>
            {token.symbol}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          mb: { xs: 0.5, md: 0 },
          pl: { xs: 0, md: 2 },
          minWidth: 140,
        }}
      >
        {isComingSoon ? (
          <ComingSoonAPY />
        ) : (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'baseline',
            }}
          >
            <LoadingLabel
              isLoading={isApyLoading && !isComingSoon}
              variant="featured2"
              sx={[
                {
                  position: 'relative',
                  fontWeight: 'bold',
                },
                isFancy
                  ? {
                      background: (theme) =>
                        theme.palette.background.gradientBlueDark,
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : { color: 'primary.main' },
                isFancy
                  ? {
                      '::after': {
                        background: theme.palette.background.gradientBlueDark,
                      },
                    }
                  : {
                      '::after': {
                        background: theme.palette.primary.main,
                      },
                    },
                !isApyLoading &&
                  !disabled && {
                    '::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 2,
                      bottom: 1,
                      height: 2,
                    },
                  },
              ]}
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
              <Stack direction="row" useFlexGap sx={{ alignItems: 'center' }}>
                <Typography
                  variant="caption1"
                  noWrap
                  sx={[
                    {
                      color: 'primary.contrastText',
                    },
                    isFancy
                      ? {
                          background: (theme) =>
                            theme.palette.background.gradientBlueDark,
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }
                      : { color: 'primary.main' },
                  ]}
                >
                  {apyLabel}
                </Typography>
                {!isOgn && (
                  <InfoTooltip
                    sx={[
                      { ml: 0.25 },
                      isFancy
                        ? {
                            background: (theme) =>
                              theme.palette.background.gradientBlueDark,
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }
                        : { color: 'primary.main' },
                    ]}
                    tooltipLabel={intl.formatMessage(
                      {
                        defaultMessage: '{trailingDays}-day trailing APY',
                      },
                      { trailingDays },
                    )}
                  />
                )}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
      <Stack
        direction={{ xs: 'row', md: 'column' }}
        spacing={{ xs: 1, md: 0 }}
        sx={{
          alignItems: { xs: 'baseline', md: 'flex-start' },
        }}
      >
        <Typography variant="caption1">
          {intl.formatMessage({ defaultMessage: 'TVL' })}
          {isSm && `: `}
        </Typography>
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          spacing={{ xs: 0.5, md: 0 }}
          sx={{
            alignItems: { xs: 'baseline', md: 'flex-start' },
            flexWrap: 'nowrap',
          }}
        >
          <LoadingLabel
            isLoading={isInfoLoading && !isComingSoon}
            noWrap
            sx={{
              fontSize: (theme) => ({
                xs: theme.typography.caption1.fontSize,
                md: theme.typography.body3.fontSize,
              }),
              fontWeight: 'bold',
            }}
          >
            {disabled ? (
              '-'
            ) : ['OGN', 'OUSD'].includes(token.symbol) ? (
              `${format(info?.totalSupply ?? from(0), { compact: true, digits: 2 })} ${token.symbol}`
            ) : (
              <>
                <CurrencyLabel currency="ETH" />
                &nbsp;
                {format(info?.totalSupply ?? from(0), {
                  compact: true,
                  digits: 2,
                })}
              </>
            )}
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
              isLoading={isInfoLoading}
              sx={{ fontWeight: 'medium' }}
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
      <Stack
        sx={{
          justifyContent: 'center',
          pt: { xs: 2, md: 0 },
        }}
      >
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

const APY_TRAILING = 7;

export const ArmCard = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const { data, isLoading } = useArmDailyStatsQuery(
    { limit: 1 },
    {
      select: (data) => data?.armDailyStats?.[0],
    },
  );
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    getTokenPriceKey(tokens.mainnet['ARM-WETH-stETH']),
  );
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet['ARM-WETH-stETH'],
  });
  const { data: apyTrailing, isLoading: isApyTrailingLoading } =
    useArmApy(APY_TRAILING);

  const tvl = [
    BigInt(data?.totalSupply ?? 0),
    tokens.mainnet['ARM-WETH-stETH'].decimals,
  ] as Dnum;
  const exchangeRate = [
    BigInt(data?.assetsPerShare ?? 0),
    tokens.mainnet['ARM-WETH-stETH'].decimals,
  ] as Dnum;
  const tvlUsd = mul(tvl, price ?? 0);
  const wethBalance = mul(
    [balance ?? 0n, tokens.mainnet['ARM-WETH-stETH'].decimals],
    exchangeRate,
  );

  return (
    <Stack
      {...props}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      sx={[
        {
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: { xs: 'stretch', md: 'space-between' },
          py: 2,
          px: 3,
          color: 'text.primary',
          backgroundColor: 'background.highlight',
          [theme.breakpoints.up('md')]: {
            '>*': {
              width: 1,
            },
          },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        direction={{ xs: 'row-reverse', md: 'row' }}
        spacing={2}
        sx={{
          justifyContent: { xs: 'space-between', md: 'flex-start' },
          alignItems: 'center',
        }}
      >
        <ARM sx={{ fontSize: 40 }} />
        <Stack
          sx={{
            height: 1,
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              fontWeight: 'bold',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'ETH Vault' })}
          </Typography>
          <Typography variant="caption1" noWrap>
            {intl.formatMessage({ defaultMessage: 'ETH Vaults' })}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          mb: { xs: 0.5, md: 0 },
          pl: { xs: 0, md: 2 },
          minWidth: 140,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'baseline',
          }}
        >
          <LoadingLabel
            isLoading={isApyTrailingLoading}
            variant="featured2"
            sx={[
              {
                position: 'relative',
                fontWeight: 'bold',
                color: 'primary.main',
                '::after': {
                  background: theme.palette.primary.main,
                },
              },
              !isLoading && {
                '::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 2,
                  bottom: 1,
                  height: 2,
                },
              },
            ]}
          >
            {intl.formatNumber(apyTrailing ?? 0, {
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </LoadingLabel>
          <Stack direction="row" useFlexGap sx={{ alignItems: 'center' }}>
            <Typography
              variant="caption1"
              noWrap
              sx={[{ color: 'primary.main' }]}
            >
              APY
            </Typography>
            {APY_TRAILING > 1 && (
              <InfoTooltip
                sx={[{ ml: 0.25, color: 'primary.main' }]}
                tooltipLabel={intl.formatMessage(
                  {
                    defaultMessage: '{trailingDays}-day trailing APY',
                  },
                  { trailingDays: APY_TRAILING },
                )}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: 'row', md: 'column' }}
        spacing={{ xs: 1, md: 0 }}
        sx={{
          alignItems: { xs: 'baseline', md: 'flex-start' },
        }}
      >
        <Typography variant="caption1">
          {intl.formatMessage({ defaultMessage: 'TVL' })}
          {isSm && `: `}
        </Typography>
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          spacing={{ xs: 0.5, md: 0 }}
          sx={{
            alignItems: { xs: 'baseline', md: 'flex-start' },
            flexWrap: 'nowrap',
          }}
        >
          <LoadingLabel
            isLoading={isLoading}
            noWrap
            sx={{
              fontSize: (theme) => ({
                xs: theme.typography.caption1.fontSize,
                md: theme.typography.body3.fontSize,
              }),
              fontWeight: 'bold',
            }}
          >
            <CurrencyLabel currency="ETH" />
            &nbsp;{format(tvl, { compact: true, digits: 2 })}
          </LoadingLabel>
          {isSm && (
            <Box
              sx={{
                width: '1px',
                height: 10,
                backgroundColor: 'divider',
              }}
            />
          )}
          <LoadingLabel
            variant="caption2"
            isLoading={isLoading || isPriceLoading}
            sx={{ fontWeight: 'medium' }}
          >
            $&nbsp;
            {format(tvlUsd ?? from(0), {
              compact: true,
              digits: 2,
            })}
          </LoadingLabel>
        </Stack>
      </Stack>
      <ValueLabel
        label={intl.formatMessage({ defaultMessage: 'Your balance' })}
        value={`${
          !isConnected
            ? '-'
            : format(wethBalance, {
                digits: getFormatPrecision(wethBalance),
              })
        }`}
        {...valueLabelProps}
        isLoading={isBalanceLoading}
        pt={{ xs: 1, md: 0 }}
      />
      <Stack
        sx={{
          justifyContent: 'center',
          pt: { xs: 2, md: 0 },
        }}
      >
        <Button
          component={RouterLink}
          to="/arm/steth-redemption-vault"
          sx={{ whiteSpace: 'nowrap' }}
          fullWidth
          size={isSm ? 'large' : 'medium'}
        >
          {intl.formatMessage({ defaultMessage: 'Deposit' })}
        </Button>
      </Stack>
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: { xs: 'row', md: 'column' },
  sx: {
    alignItems: { xs: 'center', md: 'flex-end' },
    justifyContent: { xs: 'space-between', md: 'center' },
  },
  spacing: 0.5,
  labelProps: { variant: 'caption1', noWrap: true },
  valueProps: {
    noWrap: true,
    sx: {
      fontWeight: 'medium',
      fontSize: (theme) => ({
        xs: theme.typography.caption1.fontSize,
        md: theme.typography.body3.fontSize,
      }),
    },
  },
};

function ComingSoonAPY(props: StackProps) {
  const intl = useIntl();

  return (
    <Stack
      {...props}
      sx={[
        {
          alignItems: 'flex-start',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
        }}
      >
        <NumberSpinner height={32} typographyProps={textProps} />
        <NumberSpinner height={32} duration={1.5} typographyProps={textProps} />
        <Typography {...textProps}>.</Typography>
        <NumberSpinner height={32} duration={1.3} typographyProps={textProps} />
        <Typography {...textProps}>%</Typography>
      </Stack>
      <Typography
        variant="caption1"
        sx={(theme) => ({
          background: theme.palette.background.gradientBlueDark,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
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
