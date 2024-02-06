import { forwardRef } from 'react';

import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { BigIntInput, TokenIcon } from '@origin/shared/components';
import { Dropdown } from '@origin/shared/icons';
import { formatAmount } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { parseEther } from 'viem';

import type { StackProps } from '@mui/material';
import type { BigintInputProps } from '@origin/shared/components';
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

    const maxVisible =
      !hideMaxButton &&
      balance > (isNativeCurrency ? parseEther(MIN_ETH_FOR_GAS) : 0n);
    const maxDisabled = disableMaxButton || !isConnected || isBalanceLoading;

    return (
      <Stack {...rest}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2.5,
            mb: 2,
          }}
        >
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
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
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
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{ minWidth: 0, px: 1, py: 0.25 }}
                    >
                      {intl.formatMessage({ defaultMessage: 'max' })}
                    </Button>
                  )}
                </>
              )
            ) : null}
          </Stack>
        </Box>
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
        paddingLeft: 0.25,
        paddingRight: isDisabled ? 2 : 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        paddingY: 0.25,
        fontStyle: 'normal',
        cursor: 'pointer',
        fontWeight: 500,
        boxSizing: 'border-box',
        position: 'relative',
        ...rest?.sx,
      }}
    >
      <TokenIcon
        symbol={token.symbol}
        sx={{ width: '1.75rem', height: 'auto' }}
      />
      <Typography variant="inherit">{token.symbol}</Typography>
      {!isDisabled && <Dropdown />}
    </Stack>
  );
}
