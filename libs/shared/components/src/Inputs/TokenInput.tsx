import { forwardRef } from 'react';

import { alpha, Box, Button, Skeleton, Stack, Typography } from '@mui/material';
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
  disableMaxClick?: boolean;
  token: Token;
  onTokenClick: () => void;
  tokenPriceUsd?: number;
  isPriceLoading?: boolean;
  inputProps?: Omit<
    BigintInputProps,
    'value' | 'decimals' | 'onChange' | 'isLoading' | 'isError'
  >;
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
      disableMaxClick,
      token,
      onTokenClick,
      tokenPriceUsd = 0,
      isPriceLoading,
      inputProps,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    const handleMaxClick = () => {
      if (onAmountChange) {
        onAmountChange(balance);
      }
    };

    const bal = +formatUnits(balance, decimals);
    const amountUsd = +formatUnits(amount, decimals) * tokenPriceUsd;

    return (
      <Stack direction="row" {...rest}>
        <Stack flexGrow={1} justifyContent="center" gap={1}>
          <BigIntInput
            {...inputProps}
            value={amount}
            decimals={decimals}
            onChange={onAmountChange}
            isLoading={isAmountLoading}
            ref={ref}
          />

          {isPriceLoading ? (
            <Skeleton width={30} />
          ) : tokenPriceUsd > 0 ? (
            <Typography variant="body2">
              {intl.formatNumber(amountUsd, {
                style: 'currency',
                currency: 'usd',
                maximumFractionDigits: 4,
              })}
            </Typography>
          ) : null}
        </Stack>
        <Stack alignItems="flex-end" justifyContent="flex-end">
          {isConnected && (
            <Stack direction="row" alignItems="center" gap={0.5}>
              {isBalanceLoading ? (
                <Skeleton width={60} />
              ) : (
                <>
                  <Typography variant="body2">
                    {intl.formatNumber(bal, { maximumFractionDigits: 4 })}&nbsp;
                    {token.symbol}
                  </Typography>
                  {!disableMaxClick && (
                    <Button
                      variant="text"
                      onClick={handleMaxClick}
                      color="inherit"
                      size="small"
                      disabled={bal === 0}
                      sx={(theme) => ({
                        ...theme.typography.body2,
                        minWidth: 0,
                        margin: 0,
                        padding: 0,
                      })}
                    >
                      {intl.formatMessage({ defaultMessage: 'MAX' })}
                    </Button>
                  )}
                </>
              )}
            </Stack>
          )}
          <TokenButton token={token} onClick={onTokenClick} />
        </Stack>
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
      alignItems="center"
      justifyContent="space-between"
      role="button"
      sx={{
        minWidth: 115,
        maxHeight: '2rem',
        borderRadius: 20,
        fontSize: '1rem',
        color: 'primary.contrastText',
        fontFamily: 'Inter',
        paddingInlineStart: 0.25,
        paddingInlineEnd: isDisabled ? 2 : 1,
        border: '1px solid transparent',
        paddingBlock: 0.25,
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: 'pointer',
        fontWeight: 500,
        gap: 1,
        ':hover': {
          background: (theme) =>
            `linear-gradient(#3B3C3E, #3B3C3E) padding-box, linear-gradient(90deg, ${alpha(
              theme.palette.primary.main,
              0.4,
            )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
        },
        ...rest?.sx,
      }}
      {...rest}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          component="img"
          src={token.icon}
          sx={{ width: '1.75rem', height: 'auto' }}
        />
        <Typography variant="inherit">{token.symbol}</Typography>
      </Stack>
      {!isDisabled && <Box component="img" src="/images/dropdown.svg" />}
    </Stack>
  );
}
