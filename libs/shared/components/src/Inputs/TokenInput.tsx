import { forwardRef } from 'react';

import { alpha, Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import {
  currencyFormat,
  formatAmount,
  isNilOrEmpty,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits, parseEther } from 'viem';

import { BigIntInput } from './BigIntInput';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { BigintInputProps } from './BigIntInput';

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
  tokenButtonProps?: Omit<TokenButtonProps, 'token'>;
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
      tokenButtonProps,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    const handleMaxClick = () => {
      const max = isNativeCurrency
        ? balance - parseEther(MIN_ETH_FOR_GAS)
        : balance;
      onAmountChange(max);
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

          <TokenButton
            token={token}
            onClick={onTokenClick}
            isDisabled={isTokenClickDisabled}
            {...tokenButtonProps}
            sx={{
              ...(!isConnected && { transform: 'translateY(50%)' }),
              ...tokenButtonProps?.sx,
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
          ) : !isNilOrEmpty(tokenPriceUsd) ? (
            <Typography color="text.secondary">
              {intl.formatNumber(amountUsd, currencyFormat)}
            </Typography>
          ) : null}
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
        fontFamily: 'Inter',
        paddingLeft: 0.25,
        paddingRight: isDisabled ? 2 : 1,
        border: '1px solid transparent',
        paddingY: 0.25,
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
      <Box
        component="img"
        src={token.icon}
        sx={{ width: '1.75rem', height: 'auto' }}
      />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && (
        <Box
          component="img"
          src="/images/dropdown.svg"
          alt="dropdown"
          sx={{ width: 24, height: 24 }}
        />
      )}
    </Stack>
  );
}
