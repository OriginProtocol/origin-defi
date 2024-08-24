import { forwardRef } from 'react';

import { alpha, Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { format, from, gt, lt, mul, sub } from 'dnum';
import { useIntl } from 'react-intl';

import { BigIntInput, LoadingLabel, TokenPicker } from '..';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

import type { BigintInputProps, TokenPickerProps } from '..';

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
  tokenPriceUsd?: Dnum;
  isPriceLoading?: boolean;
  inputProps?: Omit<
    BigintInputProps,
    'value' | 'decimals' | 'onChange' | 'isLoading' | 'isError'
  >;
  tokenPickerProps?: Omit<TokenPickerProps, 'token'>;
  nativeMinimumForGas?: Dnum;
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
      nativeMinimumForGas = from(15000000000000000, 18), // 0.015 ETH
      isPriceLoading,
      inputProps,
      tokenPickerProps,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    const bal = [balance ?? 0n, decimals] as Dnum;
    const minForGas = isNativeCurrency ? nativeMinimumForGas : from(0);

    const handleMaxClick = () => {
      const max = sub(bal, minForGas)[0];
      onAmountChange?.(max);
    };

    const balDigits = lt(bal, 1) ? 6 : lt(bal, 10) ? 4 : 2;
    const amountUsd = mul([amount, decimals], tokenPriceUsd ?? 0);
    const maxVisible = !hideMaxButton && gt([balance, decimals], minForGas);
    const maxDisabled =
      disableMaxButton ||
      !isConnected ||
      isBalanceLoading ||
      gt(minForGas, bal);

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
                        number: format(bal, balDigits),
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
