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

export const addRatio = (value: bigint, decimals: number, ratio: number) => {
  return parseUnits(
    (
      +formatUnits(value, decimals) -
      +formatUnits(value, decimals) * ratio
    ).toString(),
    decimals,
  );
};
