import { useCallback } from 'react';

import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { FormatNumberOptions } from 'react-intl';

// Format map [value, maxDigits]
const mappings = [
  [10000000, 0],
  [100000, 1],
  [100, 2],
  [1, 4],
  [0.1, 4],
  [0.0001, 5],
  [0.000001, 6],
  [0.00000001, 8],
  [0.0000000001, 10],
] as const;

export const useFormat = () => {
  const intl = useIntl();

  const formatAmount = useCallback(
    (
      amount: bigint | number,
      decimals = 18,
      zeroPlaceholder = '0.0000',
      options?: FormatNumberOptions,
    ) => {
      if (!amount || amount === 0n) return zeroPlaceholder;

      const amt =
        typeof amount === 'bigint' ? +formatUnits(amount, decimals) : amount;

      for (const [threshold, maxDigits] of mappings) {
        if (amt >= threshold) {
          return intl.formatNumber(amt, {
            minimumFractionDigits: maxDigits,
            maximumFractionDigits: maxDigits,
            ...options,
          });
        }
      }

      return `~${zeroPlaceholder}`;
    },
    [intl],
  );

  const formatBalance = useCallback(
    (
      amount: bigint | number,
      decimals = 18,
      zeroPlaceholder = '0.00',
      options?: FormatNumberOptions,
    ) => {
      if (!amount || amount === 0n) return zeroPlaceholder;

      const amt =
        typeof amount === 'bigint' ? +formatUnits(amount, decimals) : amount;

      return intl.formatNumber(amt, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
      });
    },
    [intl],
  );

  const formatCurrency = useCallback(
    (
      amount: bigint | number,
      decimals = 18,
      zeroPlaceholder = '0.00',
      options?: FormatNumberOptions,
    ) => {
      if (!amount || amount === 0n) return zeroPlaceholder;

      const amt =
        typeof amount === 'bigint' ? +formatUnits(amount, decimals) : amount;

      return intl.formatNumber(amt, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        currencyDisplay: 'narrowSymbol',
        ...options,
      });
    },
    [intl],
  );

  const formatQuantity = useCallback(
    (
      amount: bigint | number,
      decimals = 18,
      zeroPlaceholder = '0.00',
      options?: FormatNumberOptions,
    ) => {
      if (!amount || amount === 0n) return zeroPlaceholder;

      const amt =
        typeof amount === 'bigint' ? +formatUnits(amount, decimals) : amount;

      return intl.formatNumber(amt, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
        ...options,
      });
    },
    [intl],
  );

  return { formatAmount, formatBalance, formatCurrency, formatQuantity };
};
