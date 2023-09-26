import { forwardRef } from 'react';

import { alpha, Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import {
  currencyFormat,
  formatAmount,
  isNilOrEmpty,
} from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { BigIntInput } from './BigIntInput';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { BigintInputProps } from './BigIntInput';

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
  isTokenClickDisabled?: boolean;
  tokenPriceUsd?: number;
  isPriceLoading?: boolean;
  inputProps?: Omit<
    BigintInputProps,
    'value' | 'decimals' | 'onChange' | 'isLoading' | 'isError'
  >;
  tokenButtonProps?: TokenButtonProps;
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
      isTokenClickDisabled,
      tokenPriceUsd = 0,
      isPriceLoading,
      inputProps,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    const handleMaxClick = () => {
      onAmountChange(balance);
    };

    const amountUsd = +formatUnits(amount, decimals) * tokenPriceUsd;
    const maxDisabled = disableMaxButton || !isConnected || isBalanceLoading;

    return (
      <Stack {...rest}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <BigIntInput
            {...inputProps}
            value={amount}
            decimals={decimals}
            onChange={onAmountChange}
            disabled={isAmountDisabled}
            isLoading={isAmountLoading}
            ref={ref}
            sx={{ flexGrow: 1, ...inputProps?.sx }}
          />
          <TokenButton
            token={token}
            onClick={onTokenClick}
            isDisabled={isTokenClickDisabled}
            sx={!isConnected ? { transform: 'translateY(50%)' } : {}}
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
            <Typography
              color="text.secondary"
              variant="body1"
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '1.5rem',
              }}
            >
              {intl.formatNumber(amountUsd, currencyFormat)}
            </Typography>
          ) : null}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isConnected ? (
              isBalanceLoading ? (
                <Skeleton width={28} />
              ) : (
                <>
                  <Typography
                    color="text.secondary"
                    variant="body1"
                    sx={{
                      justifySelf: 'flex-end',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      visibility: balance === undefined ? 'hidden' : 'visible',
                      lineHeight: '1.5rem',
                    }}
                  >
                    {intl.formatMessage(
                      { defaultMessage: 'Balance: {number}' },
                      {
                        number: formatAmount(balance, decimals),
                      },
                    )}
                  </Typography>
                  {!hideMaxButton && (
                    <Button
                      onClick={handleMaxClick}
                      disabled={maxDisabled}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 1,
                        minWidth: 0,
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
        minWidth: 120,
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
          sx={{ width: 24, height: 24 }}
        />
      )}
    </Stack>
  );
}
