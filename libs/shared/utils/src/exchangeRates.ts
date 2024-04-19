import { formatUnits } from 'viem';

export const applyExchangeRate = (
  amount: bigint | string,
  rate: number,
  { decimals = 18 }: { decimals?: number } = {},
) => {
  const amt =
    typeof amount === 'string'
      ? +formatUnits(BigInt(amount), decimals)
      : +formatUnits(amount, decimals);
  return amt * rate;
};
