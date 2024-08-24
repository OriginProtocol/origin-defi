import { forwardRef } from 'react';

import { Button, Skeleton, Stack } from '@mui/material';
import { BigIntInput, LoadingLabel } from '@origin/shared/components';
import { nativeMinimumForGas } from '@origin/shared/constants';
import { WalletFilled } from '@origin/shared/icons';
import { isNativeCurrency } from '@origin/shared/providers';
import { getFormatPrecision, isNilOrEmpty } from '@origin/shared/utils';
import { format, from, gt, mul, sub } from 'dnum';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import { TokenButton } from '../TokenButton';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';
import type { ReactNode } from 'react';

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
  token?: Token;
  tokenButton?: ReactNode;
  onTokenClick?: () => void;
  isTokenClickDisabled?: boolean;
  tokenPriceUsd?: Dnum;
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
    const { isConnected, chainId } = useAccount();

    const bal = [balance, decimals] as Dnum;
    const minimumForGas = isNativeCurrency(token)
      ? nativeMinimumForGas[chainId ?? mainnet.id]
      : from(0);

    const handleMaxClick = () => {
      if (balance !== undefined) {
        const max = sub(bal, minimumForGas)[0];
        onAmountChange?.(max);
      }
    };

    const amountUsd = mul([amount, decimals], tokenPriceUsd ?? 0);
    const maxDisabled =
      disableMaxButton ||
      !isConnected ||
      isBalanceLoading ||
      gt(minimumForGas, bal);

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
              {intl.formatNumber(+formatUnits(amount ?? 0n, decimals), {
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
              $
              {format(amountUsd, { digits: 2, decimalsRounding: 'ROUND_DOWN' })}
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
                      fontWeight: 'medium',
                      '&.Mui-disabled': { color: 'text.secondary', opacity: 1 },
                    }}
                  >
                    {isBalanceLoading ? (
                      <Skeleton width={60} />
                    ) : (
                      <>
                        <WalletFilled sx={{ fontSize: 20, mr: 1 }} />
                        {format(bal, {
                          digits: getFormatPrecision(bal),
                          decimalsRounding: 'ROUND_DOWN',
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
