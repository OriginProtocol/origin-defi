import { forwardRef } from 'react';

import { alpha, Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { BigIntInput } from '@origin/shared/components';
import { formatAmount, isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits, parseEther } from 'viem';

import { TokenPicker } from './TokenPicker';

import type { StackProps } from '@mui/material';
import type { BigintInputProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';
import type { ComponentProps } from 'react';

import type { TokenPickerProps } from './TokenPicker';

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
  isConnected: boolean;
  balance?: bigint;
  isBalanceLoading?: boolean;
  hideMaxButton?: boolean;
  disableMaxButton?: boolean;
  token: Token;
  onTokenClick?: () => void;
  isNativeCurrency?: boolean;
  isTokenClickDisabled?: boolean;
  tokenPriceUsd?: number;
  isPriceLoading?: boolean;
  inputProps?: Omit<
    BigintInputProps,
    'value' | 'decimals' | 'onChange' | 'isLoading' | 'isError'
  >;
  tokenPickerProps?: Omit<TokenPickerProps, 'token'>;
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
      isConnected,
      balance = 0n,
      isBalanceLoading,
      hideMaxButton,
      disableMaxButton,
      token,
      onTokenClick,
      isNativeCurrency = false,
      isTokenClickDisabled,
      tokenPriceUsd = 0,
      isPriceLoading,
      inputProps,
      tokenPickerProps,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    const handleMaxClick = () => {
      const max = isNativeCurrency
        ? balance - parseEther(MIN_ETH_FOR_GAS)
        : balance;
      onAmountChange?.(max);
    };

    const amountUsd = +formatUnits(amount, decimals) * tokenPriceUsd;
    const maxVisible =
      !hideMaxButton &&
      balance > (isNativeCurrency ? parseEther(MIN_ETH_FOR_GAS) : 0n);
    const maxDisabled = disableMaxButton || !isConnected || isBalanceLoading;

    return (
      <Stack {...rest}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          {isAmountLoading ? (
            <Skeleton width={100} height={36} />
          ) : (
            <BigIntInput
              {...inputProps}
              value={amount}
              decimals={decimals}
              onChange={onAmountChange}
              disabled={isAmountDisabled}
              ref={ref}
              sx={{ flexGrow: 1, height: 36, ...inputProps?.sx }}
            />
          )}

          <TokenPicker
            token={token}
            onClick={onTokenClick}
            isDisabled={isTokenClickDisabled}
            {...tokenPickerProps}
            sx={{
              ...(!isConnected && { transform: 'translateY(50%)' }),
              ...tokenPickerProps?.sx,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2.5,
            marginBlockStart: 1,
          }}
        >
          {isPriceLoading ? (
            <Skeleton width={50} />
          ) : !isNilOrEmpty(tokenPriceUsd) && !isNaN(tokenPriceUsd) ? (
            <Typography color="text.secondary">
              {intl.formatNumber(amountUsd, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                currencyDisplay: 'narrowSymbol',
              })}
            </Typography>
          ) : (
            <Box />
          )}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {isConnected ? (
              isBalanceLoading ? (
                <Skeleton width={38} />
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
                      onClick={handleMaxClick}
                      disabled={maxDisabled}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 1,
                        minWidth: 36,
                        lineHeight: 1,
                        color: 'text.secondary',
                        padding: (theme) => theme.spacing(0.25, 0.5),
                        background: (theme) =>
                          alpha(theme.palette.common.white, 0.1),
                        ':hover': {
                          background: (theme) => theme.palette.grey[600],
                        },
                      }}
                    >
                      {intl.formatMessage({ defaultMessage: 'max' })}
                    </Button>
                  )}
                </>
              )
            ) : null}
          </Stack>
        </Box>
      </Stack>
    );
  },
);

TokenInput.displayName = 'TokenInput';

const inputProps = {
  sx: {
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingBlock: 0,
    paddingInline: 0,
    borderImageWidth: 0,
    boxSizing: 'border-box',
    '& .MuiInputBase-input': {
      padding: 0,
      boxSizing: 'border-box',
      fontStyle: 'normal',
      fontFamily: 'Sailec, sans-serif',
      fontSize: 24,
      lineHeight: 1.5,
      fontWeight: 700,
      '&::placeholder': {
        color: 'text.secondary',
        opacity: 1,
      },
    },
  },
};

export const tokenInputStyleProps: Partial<ComponentProps<typeof TokenInput>> =
  {
    sx: {
      paddingBlock: 2.5,
      paddingBlockStart: 2.625,
      paddingInline: 2,
      border: '1px solid',
      borderColor: 'divider',
      borderTopLeftRadius: (theme) => theme.shape.borderRadius,
      borderTopRightRadius: (theme) => theme.shape.borderRadius,
      borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
      borderBottomRightRadius: (theme) => theme.shape.borderRadius,
      backgroundColor: 'grey.900',
      '&:hover, &:focus-within': {
        borderColor: 'transparent',
      },
      '&:hover': {
        background: (theme) =>
          `linear-gradient(${theme.palette.grey[900]}, ${
            theme.palette.grey[900]
          }) padding-box, linear-gradient(90deg, ${alpha(
            theme.palette.primary.main,
            0.4,
          )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
      },
      '&:focus-within': {
        background: (theme) =>
          `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
      },
    },
    inputProps,
  };

export const disabledTokenInputStyleProps: Partial<
  ComponentProps<typeof TokenInput>
> = {
  sx: {
    paddingBlock: 2.5,
    paddingBlockStart: 2.625,
    paddingInline: 2,
    border: '1px solid',
    borderColor: 'divider',
    borderTopLeftRadius: (theme) => theme.shape.borderRadius,
    borderTopRightRadius: (theme) => theme.shape.borderRadius,
    borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
    borderBottomRightRadius: (theme) => theme.shape.borderRadius,
    backgroundColor: (theme) => alpha(theme.palette.grey[400], 0.2),
  },
  inputProps: {
    readOnly: true,
    ...inputProps,
  },
};
