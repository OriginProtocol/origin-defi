import { forwardRef } from 'react';

import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import {
  BigIntInput,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { DefaultWallet, FaChevronDownRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits, parseEther } from 'viem';
import { useAccount } from 'wagmi';

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
    const { formatBalance } = useFormat();
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
    const maxDisabled =
      disableMaxButton ||
      !isConnected ||
      isBalanceLoading ||
      (balance !== undefined &&
        balance <= (isNativeCurrency ? parseEther(MIN_ETH_FOR_GAS) : 0n));

    return (
      <Stack spacing={2} {...rest}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          {readOnly ? (
            <LoadingLabel
              variant="h6"
              isLoading={isAmountLoading}
              sWidth={100}
              sx={{
                flexGrow: 1,
              }}
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
              sx={(theme) => ({
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: 0,
                padding: 0,
                borderImageWidth: 0,
                boxSizing: 'border-box',
                '& .MuiInputBase-input': {
                  padding: 0,
                  boxSizing: 'border-box',
                  flexGrow: 1,
                  ...theme.typography.h6,
                  '&::placeholder': {
                    color: 'text.primary',
                    opacity: 1,
                  },
                },
              })}
            />
          )}
          {tokenButton ?? (
            <TokenButton
              token={token}
              onClick={onTokenClick}
              isDisabled={isTokenClickDisabled}
            />
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
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
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {isConnected && balance !== undefined
              ? !hideMaxButton && (
                  <Button
                    variant="link"
                    onClick={handleMaxClick}
                    disabled={maxDisabled}
                  >
                    {isBalanceLoading ? (
                      <Skeleton width={60} />
                    ) : (
                      <>
                        <DefaultWallet sx={{ fontSize: 20, mr: 1 }} />
                        {formatBalance(balance, decimals)}
                      </>
                    )}
                  </Button>
                )
              : null}
          </Stack>
        </Stack>
      </Stack>
    );
  },
);

TokenInput2.displayName = 'TokenInput2';

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
      variant="outlined"
      color="secondary"
      disabled={isDisabled}
      size="small"
      {...rest}
      sx={{
        gap: 1,
        minHeight: 40,
        minWidth: 125,
        borderRadius: 120,
        '&.Mui-disabled': {
          color: 'text.primary',
          pr: 2,
        },
        ...rest?.sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TokenIcon token={token} sx={{ fontSize: 28 }} />
      </Box>

      <Typography variant="body2" fontWeight="bold">
        {token.symbol}
      </Typography>
      {!isDisabled && <FaChevronDownRegular sx={{ fontSize: 14, ml: 0.5 }} />}
    </Button>
  );
}
