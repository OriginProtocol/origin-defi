import { formatUnits } from 'viem';

import type { FormatNumberOptions } from 'react-intl';

export const middleTruncate = (address: string, start = 6, end = 4): string =>
  `${address.slice(0, start)}…${address.slice(-end)}`;

export const valueFormat: FormatNumberOptions = {
  minimumFractionDigits: 2,
};

export const currencyFormat: FormatNumberOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  currencyDisplay: 'narrowSymbol',
};

export const quantityFormat: FormatNumberOptions = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
};

export const balanceFormat: FormatNumberOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

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

export function formatAmount(
  amount: bigint | number,
  decimals = 18,
  zeroPlaceholder = '0.0000',
  options?: Intl.NumberFormatOptions,
) {
  if (!amount || amount === 0n) return zeroPlaceholder;

  const amt =
    typeof amount === 'bigint' ? +formatUnits(amount, decimals) : amount;

  for (const [threshold, maxDigits] of mappings) {
    if (amt >= threshold) {
      return amt.toLocaleString('en', {
        maximumFractionDigits: maxDigits,
        ...options,
      });
    }
  }

  return `~${zeroPlaceholder}`;
}
