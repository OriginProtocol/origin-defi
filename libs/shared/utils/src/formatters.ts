import { formatUnits } from 'viem';

export const middleTruncate = (address: string, start = 6, end = 4): string =>
  `${address.slice(0, start)}…${address.slice(-end)}`;

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
