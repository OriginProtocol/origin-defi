import { formatUnits, parseUnits } from 'viem';

export const jsonStringifyReplacer = (key: string, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

export const scale = (
  value: bigint,
  originDecimals: number,
  targetDecimals: number,
) => {
  if (originDecimals === targetDecimals) {
    return value;
  }

  return parseUnits(formatUnits(value, originDecimals), targetDecimals);
};

export const subtractSlippage = (value = 0n, decimals = 18, slippage = 0) => {
  if (+formatUnits(value, decimals) <= +formatUnits(1n, decimals)) {
    return value;
  }

  const slippageFactor = BigInt(Math.floor(slippage * 10000));
  const slippageAmount = (value * slippageFactor) / 10000n;

  return value - slippageAmount;
};
