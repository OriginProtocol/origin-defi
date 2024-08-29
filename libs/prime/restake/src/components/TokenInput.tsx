import { forwardRef } from 'react';

import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { BigIntInput } from '@origin/shared/components';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { parseEther } from 'viem';

import type { StackProps } from '@mui/material';
import type {
  BigintInputProps,
  TokenPickerProps,
} from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

// When clicking max on native currency, we leave this amount of eth
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
  disableMaxButton?: boolean;
  token: Token;
  onTokenClick?: () => void;
  isNativeCurrency?: boolean;
  inputProps?: Omit<
    BigintInputProps,
    'value' | 'decimals' | 'onChange' | 'isLoading' | 'isError'
  >;
  tokenButtonProps?: Omit<TokenPickerProps, 'token'>;
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
      disableMaxButton,
      token,
      onTokenClick,
      isNativeCurrency = false,
      inputProps,
      tokenButtonProps,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();
    const { formatAmount } = useFormat();

    const handleMaxClick = () => {
      const max = isNativeCurrency
        ? balance - parseEther(MIN_ETH_FOR_GAS)
        : balance;
      onAmountChange?.(max);
    };

    const maxVisible =
      balance > (isNativeCurrency ? parseEther(MIN_ETH_FOR_GAS) : 0n);
    const maxDisabled = disableMaxButton || !isConnected || isBalanceLoading;

    return (
      <Stack
        direction="row"
        spacing={2}
        {...rest}
        sx={[
          {
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 5,
            backgroundColor: 'common.white',
            p: 2,
          },
          !isAmountDisabled &&
            ((theme) => ({
              '&:hover, &:focus-within': {
                outline: `2px solid ${theme.palette.text.primary}`,
              },
            })),
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            py: 1,
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
              sx={{
                flexGrow: 1,
                height: 36,
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: 0,
                p: 0,
                '& .MuiInputBase-input': {
                  p: 0,
                  boxSizing: 'border-box',
                  fontStyle: 'normal',
                  fontSize: 32,
                  lineHeight: 1,
                  fontWeight: 500,
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 1,
                  },
                },
              }}
            />
          )}
        </Stack>
        <Stack
          spacing={1}
          sx={{
            alignItems: 'flex-end',
          }}
        >
          {isConnected ? (
            isBalanceLoading ? (
              <Skeleton width={38} />
            ) : (
              <>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    noWrap
                    sx={[
                      {
                        color: 'text.secondary',
                      },
                      balance === undefined
                        ? {
                            visibility: 'hidden',
                          }
                        : {
                            visibility: 'visible',
                          },
                    ]}
                  >
                    {intl.formatMessage({ defaultMessage: 'Balance' })}
                  </Typography>
                  {maxVisible && (
                    <Button
                      onClick={handleMaxClick}
                      disabled={maxDisabled}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        fontSize: 12,
                        minWidth: 0,
                        minHeight: 0,
                        px: 0.5,
                        pt: 0.2,
                        pb: 0.4,
                        lineHeight: 1,
                      }}
                    >
                      {intl.formatMessage({ defaultMessage: 'max' })}
                    </Button>
                  )}
                </Stack>
                <Typography noWrap>
                  {intl.formatMessage(
                    { defaultMessage: '{amount} {symbol}' },
                    {
                      amount: formatAmount(balance, decimals),
                      symbol: token.symbol,
                    },
                  )}
                </Typography>
              </>
            )
          ) : null}
        </Stack>
      </Stack>
    );
  },
);

TokenInput.displayName = 'TokenInput';
