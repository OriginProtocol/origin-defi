import { forwardRef } from 'react';

import { alpha, Button, Skeleton, Stack, Typography } from '@mui/material';
import {
  BigIntInput,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { Dropdown } from '@origin/shared/icons';
import { useIsNativeCurrency } from '@origin/shared/providers';
import { formatAmount, isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits, parseEther } from 'viem';
import { useAccount } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

// When clicking max on native currency, we leave this amount of token
// on the wallet so the user can afford the transaction gas fees
const MIN_ETH_FOR_GAS = '0.015';

export type TokenInputProps = {
  amount: bigint;
  decimals?: number;
  onAmountChange?: (value: bigint) => void;
  isAmountLoading?: boolean;
  isAmountDisabled?: boolean;
  isAmountError?: boolean;
  balance?: bigint;
  isBalanceLoading?: boolean;
  hideMaxButton?: boolean;
  disableMaxButton?: boolean;
  token: Token;
  onTokenClick?: () => void;
  isTokenClickDisabled?: boolean;
  tokenPriceUsd?: number;
  isPriceLoading?: boolean;
  readOnly?: boolean;
} & StackProps;

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  (
    {
      amount,
      decimals = 18,
      onAmountChange,
      isAmountLoading,
      isAmountDisabled,
      isAmountError,
      balance = 0n,
      isBalanceLoading,
      hideMaxButton,
      disableMaxButton,
      token,
      onTokenClick,
      isTokenClickDisabled,
      tokenPriceUsd = 0,
      isPriceLoading,
      readOnly = false,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();
    const { isConnected } = useAccount();
    const isNativeCurrency = useIsNativeCurrency();

    const handleMaxClick = () => {
      const max = isNativeCurrency(token)
        ? balance - parseEther(MIN_ETH_FOR_GAS)
        : balance;
      onAmountChange?.(max);
    };

    const amountUsd = +formatUnits(amount, decimals) * tokenPriceUsd;
    const maxVisible =
      !hideMaxButton &&
      balance > (isNativeCurrency(token) ? parseEther(MIN_ETH_FOR_GAS) : 0n);
    const maxDisabled = disableMaxButton || !isConnected || isBalanceLoading;

    return (
      <Stack spacing={1} {...rest}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TokenButton
            token={token}
            onClick={onTokenClick}
            isDisabled={isTokenClickDisabled}
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {isConnected ? (
              isBalanceLoading ? (
                <Skeleton />
              ) : (
                <>
                  <Typography
                    noWrap
                    color="text.secondary"
                    sx={{
                      justifySelf: 'flex-end',
                      visibility: balance === undefined ? 'hidden' : 'visible',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {intl.formatMessage(
                      { defaultMessage: 'Balance: {number}' },
                      {
                        number: formatAmount(balance, decimals),
                      },
                    )}
                  </Typography>
                  {maxVisible && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleMaxClick}
                      disabled={maxDisabled}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        minWidth: 40,
                        lineHeight: 1,
                        color: 'text.secondary',
                        padding: (theme) => theme.spacing(0.25, 0.5),
                      }}
                    >
                      {intl.formatMessage({ defaultMessage: 'max' })}
                    </Button>
                  )}
                </>
              )
            ) : null}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
          gap={1}
        >
          {readOnly ? (
            <LoadingLabel
              isLoading={isAmountLoading}
              sWidth={100}
              sx={valueStyles}
            >
              {intl.formatNumber(+formatUnits(amount, decimals), {
                roundingMode: 'floor',
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
                useGrouping: false,
              })}
            </LoadingLabel>
          ) : (
            <BigIntInput
              readOnly={readOnly}
              value={amount}
              decimals={decimals}
              onChange={onAmountChange}
              disabled={isAmountDisabled}
              ref={ref}
              sx={{
                width: 1,
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: 0,
                padding: 0,
                borderImageWidth: 0,
                boxSizing: 'border-box',
                '& .MuiInputBase-input': {
                  padding: 0,
                  boxSizing: 'border-box',
                  ...valueStyles,
                  '&::placeholder': {
                    color: 'text.primary',
                    opacity: 1,
                  },
                },
              }}
            />
          )}
          {!isNilOrEmpty(tokenPriceUsd) ? (
            <LoadingLabel
              isLoading={isPriceLoading}
              sWidth={50}
              color="text.secondary"
            >
              {intl.formatNumber(amountUsd, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                currencyDisplay: 'narrowSymbol',
              })}
            </LoadingLabel>
          ) : null}
        </Stack>
      </Stack>
    );
  },
);

TokenInput.displayName = 'TokenInput';

const valueStyles = {
  flexGrow: 1,
  fontStyle: 'normal',
  fontFamily: 'Sailec, sans-serif',
  fontSize: 32,
  lineHeight: 1.5,
  fontWeight: 400,
  height: 48,
};

type TokenButtonProps = { token: Token; isDisabled?: boolean } & StackProps;

function TokenButton({ token, isDisabled, ...rest }: TokenButtonProps) {
  return (
    <Stack
      direction="row"
      role="button"
      gap={1}
      {...rest}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 32,
        borderRadius: 25,
        fontSize: '1rem',
        paddingY: 0.25,
        paddingLeft: 0.25,
        paddingRight: isDisabled ? 2 : 1,
        border: '1px solid transparent',
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: 'pointer',
        fontWeight: 500,
        boxSizing: 'border-box',
        position: 'relative',
        ':hover': {
          background: (theme) =>
            `linear-gradient(${theme.palette.grey[600]}, ${
              theme.palette.grey[600]
            }) padding-box, linear-gradient(90deg, ${alpha(
              theme.palette.primary.main,
              0.4,
            )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
        },
        ...rest?.sx,
      }}
    >
      <TokenIcon token={token} sx={{ width: '1.75rem', height: 'auto' }} />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && <Dropdown />}
    </Stack>
  );
}
