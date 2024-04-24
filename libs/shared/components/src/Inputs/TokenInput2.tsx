import { forwardRef } from 'react';

import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { formatAmount, isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits, parseEther } from 'viem';
import { useAccount } from 'wagmi';

import { TokenIcon } from '../Icons';
import { LoadingLabel } from '../Labels';
import { BigIntInput } from './BigIntInput';

import type { ButtonProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';

// When clicking max on native currency, we leave this amount of token
// on the wallet so the user can afford the transaction gas fees
const MIN_ETH_FOR_GAS = '0.015';

export type TokenInput2Props = {
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
  isNativeCurrency?: boolean;
  token?: Token;
  tokenButton?: ReactNode;
  onTokenClick?: () => void;
  isTokenClickDisabled?: boolean;
  tokenPriceUsd?: number;
  isPriceLoading?: boolean;
  readOnly?: boolean;
} & StackProps;

export const TokenInput2 = forwardRef<HTMLInputElement, TokenInput2Props>(
  (
    {
      amount,
      decimals = 18,
      onAmountChange,
      isAmountLoading,
      isAmountDisabled,
      isAmountError,
      balance,
      isBalanceLoading,
      hideMaxButton,
      disableMaxButton,
      isNativeCurrency,
      token,
      tokenButton,
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

    const handleMaxClick = () => {
      if (balance !== undefined) {
        const max = isNativeCurrency
          ? balance - parseEther(MIN_ETH_FOR_GAS)
          : balance;
        onAmountChange?.(max);
      }
    };

    const amountUsd = +formatUnits(amount, decimals) * tokenPriceUsd;
    const maxVisible =
      !hideMaxButton &&
      balance !== undefined &&
      balance > (isNativeCurrency ? parseEther(MIN_ETH_FOR_GAS) : 0n);
    const maxDisabled = disableMaxButton || !isConnected || isBalanceLoading;

    return (
      <Stack spacing={1} {...rest}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {tokenButton ?? (
            <TokenButton
              token={token}
              onClick={onTokenClick}
              isDisabled={isTokenClickDisabled}
            />
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {isConnected && balance !== undefined ? (
              isBalanceLoading ? (
                <Skeleton />
              ) : (
                <>
                  <Typography
                    noWrap
                    color="text.secondary"
                    sx={{
                      justifySelf: 'flex-end',
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
                roundingMode: 'floor',
              })}
            </LoadingLabel>
          ) : null}
        </Stack>
      </Stack>
    );
  },
);

TokenInput2.displayName = 'TokenInput';

const valueStyles = {
  flexGrow: 1,
  fontStyle: 'normal',
  fontSize: 32,
  lineHeight: 1.5,
  fontWeight: 400,
  height: 48,
};

type TokenButtonProps = { token?: Token; isDisabled?: boolean } & ButtonProps;

function TokenButton({ token, isDisabled, ...rest }: TokenButtonProps) {
  const intl = useIntl();

  if (!token) {
    return (
      <Button variant="contained" color="inherit" {...(rest as any)}>
        {intl.formatMessage({ defaultMessage: 'Select token' })}
      </Button>
    );
  }

  return (
    <Button
      color="inherit"
      disabled={isDisabled}
      size="small"
      {...rest}
      sx={{
        gap: 1,
        minHeight: 32,
        borderRadius: 8,
        fontSize: '1rem',
        fontWeight: 500,
        '&.Mui-disabled': {
          color: 'text.primary',
          pr: 2,
        },
        ...rest?.sx,
      }}
    >
      <TokenIcon token={token} sx={{ width: '1.75rem', height: 'auto' }} />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && <FaChevronDownRegular sx={{ fontSize: 14, ml: 0.5 }} />}
    </Button>
  );
}
