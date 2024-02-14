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

  return parseUnits(
    (
      +formatUnits(value, decimals) -
      +formatUnits(value, decimals) * slippage
    ).toString(),
    decimals,
  );
};
