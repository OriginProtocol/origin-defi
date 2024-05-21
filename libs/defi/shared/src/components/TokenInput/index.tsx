import { forwardRef } from 'react';

import { Button, Skeleton, Stack } from '@mui/material';
import { BigIntInput, LoadingLabel } from '@origin/shared/components';
import { WalletFilled } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits, parseEther } from 'viem';
import { useAccount } from 'wagmi';

import { TokenButton } from '../TokenButton';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';

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
  isNativeCurrency?: boolean;
  token?: Token;
  tokenButton?: ReactNode;
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
      <Stack spacing={1.5} {...rest}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          height={52}
          overflow="hidden"
        >
          {readOnly ? (
            <LoadingLabel
              variant="h6"
              isLoading={isAmountLoading}
              sWidth={100}
              noWrap
              flexGrow={1}
              color={amount === 0n ? 'text.secondary' : 'text.primary'}
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
                    color: 'text.secondary',
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
              disabled={isTokenClickDisabled}
            />
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          height={24}
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
                    sx={{
                      '&.Mui-disabled': { color: 'text.secondary', opacity: 1 },
                    }}
                  >
                    {isBalanceLoading ? (
                      <Skeleton width={60} />
                    ) : (
                      <>
                        <WalletFilled sx={{ fontSize: 20, mr: 1 }} />
                        {formatBalance(balance, decimals, undefined, {
                          roundingMode: 'floor',
                          minimumFractionDigits:
                            balance < 10 ** (decimals - 1) ? 4 : 2,
                          maximumFractionDigits:
                            balance < 10 ** (decimals - 1) ? 4 : 2,
                        })}
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
TokenInput.displayName = 'TokenInput';
