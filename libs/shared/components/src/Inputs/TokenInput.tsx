import { forwardRef } from 'react';

import { alpha, Box, IconButton, Stack, Typography } from '@mui/material';
import { formatAmount } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { Loader } from '../Loader';
import { BigIntInput } from './BigIntInput';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

import type { BigintInputProps } from './BigIntInput';

const styles = { display: 'flex', justifyContent: 'space-between', gap: 2.5 };

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

    const amountUsd = +formatUnits(amount, decimals) * tokenPriceUsd;

    return (
      <Stack {...rest}>
        <Box sx={styles}>
          <BigIntInput
            {...inputProps}
            value={amount}
            decimals={decimals}
            onChange={onAmountChange}
            isLoading={isAmountLoading}
            ref={ref}
            sx={{ flex: 1 }}
          />
          <Stack flexDirection="row-reverse">
            <TokenButton
              token={token}
              onClick={onTokenClick}
              sx={!isConnected ? { transform: 'translateY(50%)' } : {}}
            />
          </Stack>
        </Box>
        <Box sx={{ ...styles, marginBlockStart: 1 }}>
          {isPriceLoading ? (
            <Loader width={50} />
          ) : tokenPriceUsd !== undefined ? (
            <Typography
              color="text.secondary"
              variant="body1"
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '1.5rem',
              }}
            >
              {intl.formatNumber(amountUsd, {
                style: 'currency',
                currency: 'usd',
                maximumFractionDigits: 4,
              })}
            </Typography>
          ) : null}
          {isConnected ? (
            isBalanceLoading ? (
              <Loader width={28} />
            ) : (
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
            )
          ) : undefined}
        </Box>
      </Stack>
    );
  },
);

TokenInput.displayName = 'TokenInput';

type TokenButtonProps = { token: Token; isDisabled?: boolean } & StackProps;

function TokenButton({ token, isDisabled, sx, ...rest }: TokenButtonProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      role="button"
      gap={1}
      sx={{
        width: 'fit-content',
        maxHeight: '2rem',
        borderRadius: 20,
        fontSize: '1rem',
        color: 'primary.contrastText',
        fontFamily: 'Inter',
        paddingInlineStart: 0.25,
        paddingInlineEnd: !isDisabled ? 1 : 2,
        border: '1px solid transparent',
        paddingBlock: 0.25,
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        fontStyle: 'normal',
        cursor: 'pointer',
        fontWeight: 500,
        boxSizing: 'border-box',
        position: 'relative',
        ':hover': {
          background: (theme) =>
            `linear-gradient(#3B3C3E, #3B3C3E) padding-box, linear-gradient(90deg, ${alpha(
              theme.palette.primary.main,
              0.4,
            )} 0%, ${alpha(theme.palette.primary.dark, 0.4)} 100%) border-box;`,
        },
        ...sx,
      }}
      {...rest}
    >
      <Box
        component="img"
        src={token.icon}
        sx={{ width: '1.75rem', height: 'auto' }}
      />
      <Typography variant="inherit">{token.symbol}</Typography>

      {!isDisabled && (
        <IconButton
          sx={{
            maxHeight: '1.375rem',
            maxWidth: '1.375rem',
            padding: 0,

            backgroundColor: 'transparent',
          }}
          disableRipple
        >
          <Box component="img" src="/images/dropdown.svg" />
        </IconButton>
      )}
    </Stack>
  );
}
