import { hasKey } from '@origin/shared/utils';
import { div, gt, mul, sub, toNumber } from 'dnum';

import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

import type { DailyStatFragment } from '../queries';

const apiesTrailing = { apy14: 14, apy7: 7, apy30: 30 };

const toReturnType = (value: Dnum, returnType = 'number', digits = 2) =>
  returnType === 'dnum'
    ? value
    : toNumber(value, { decimalsRounding: 'ROUND_DOWN', digits });

export const dailyStatMapper = <T extends 'number' | 'dnum' = 'number'>(
  d: DailyStatFragment | undefined | null,
  token: Token,
  {
    isChartFormat,
    returnType,
  }: { isChartFormat?: boolean; returnType?: T } = {},
) => {
  const factor = isChartFormat ? 100 : 1;

  const protocolOwned = [BigInt(d?.amoSupply ?? 0), token.decimals] as Dnum;
  const totalSupplyDnum = [BigInt(d?.totalSupply ?? 0), token.decimals] as Dnum;
  const wrapped = [BigInt(d?.wrappedSupply ?? 0), token.decimals] as Dnum;
  const feesDnum = [BigInt(d?.fees ?? 0), 18] as Dnum;
  const rebasingSupplyDnum = [
    BigInt(d?.rebasingSupply ?? 0),
    token.decimals,
  ] as Dnum;
  const nonRebasingSupplyDnum = [
    BigInt(d?.nonRebasingSupply ?? 0),
    token.decimals,
  ] as Dnum;
  const amoSupplyDnum = [BigInt(d?.amoSupply ?? 0), token.decimals] as Dnum;
  const rateETHDnum = [BigInt(d?.rateETH ?? 0), 18] as Dnum;
  const rateUSDDnum = [BigInt(d?.rateUSD ?? 0), 18] as Dnum;
  const yieldETHDnum = [BigInt(d?.yield ?? 0), 18] as Dnum;
  const dripperWETHDnum = [BigInt(d?.dripperWETH ?? 0), 18] as Dnum;

  const amoSupplyETH = mul(amoSupplyDnum, rateETHDnum);
  const amoSupplyUSD = mul(amoSupplyDnum, rateUSDDnum);
  const feesETH = mul(feesDnum, rateETHDnum);
  const feesUSD = mul(feesDnum, rateUSDDnum);
  const yieldUSDDnum = mul(yieldETHDnum, rateUSDDnum);
  const dripperUSDDnum = mul(dripperWETHDnum, rateUSDDnum);
  const circulating = sub(totalSupplyDnum, protocolOwned);
  const circulatingETH = mul(circulating, rateETHDnum);
  const circulatingUSD = mul(circulatingETH, rateUSDDnum);
  const tvlUSD = mul(totalSupplyDnum, rateUSDDnum);
  const tvlETH = mul(totalSupplyDnum, rateETHDnum);

  const calculatePercentage = (numerator: Dnum, denominator: Dnum) =>
    gt(denominator, 0)
      ? mul(div(numerator, denominator), factor)
      : ([0n, token.decimals] as Dnum);

  const pctWrapped = calculatePercentage(wrapped, circulatingETH);
  const pctCirculating = calculatePercentage(circulatingETH, totalSupplyDnum);
  const pctProtocolOwned = calculatePercentage(protocolOwned, totalSupplyDnum);

  const apies = {
    apy7: (d?.apy7 ?? 0) * factor,
    apy14: (d?.apy14 ?? 0) * factor,
    apy30: (d?.apy30 ?? 0) * factor,
  };

  const bestApy = Object.entries(apies).reduce(
    (acc, [k, v]) => {
      if (hasKey(apiesTrailing, k) && typeof v === 'number' && acc.value < v) {
        return { value: v, trailingDays: apiesTrailing[k] };
      }
      return acc;
    },
    { value: 0, trailingDays: 0 },
  );

  return {
    id: d?.id ?? '',
    blockNumber: d?.blockNumber ?? 0,
    timestamp: d?.timestamp
      ? new Date(d.timestamp).getTime()
      : new Date().getTime(),
    date: d?.date ?? '',
    apy: d?.apy ?? 0,
    ...apies,
    bestApy,
    totalSupply: toReturnType(totalSupplyDnum, returnType),
    tvlUSD: toReturnType(tvlUSD, returnType),
    tvlETH: toReturnType(tvlETH, returnType),
    rebasingSupply: toReturnType(rebasingSupplyDnum, returnType),
    nonRebasingSupply: toReturnType(nonRebasingSupplyDnum, returnType),
    wrappedSupply: toReturnType(wrapped, returnType),
    pctWrappedSupply: toReturnType(pctWrapped, returnType),
    protocolOwnedSupply: toReturnType(protocolOwned, returnType),
    pctProtocolOwnedSupply: toReturnType(pctProtocolOwned, returnType),
    circulatingSupply: toReturnType(circulating, returnType),
    circulatingSupplyETH: toReturnType(circulatingETH, returnType),
    circulatingSupplyUSD: toReturnType(circulatingUSD, returnType),
    pctCirculatingSupply: toReturnType(pctCirculating, returnType),
    feesETH: toReturnType(feesETH, returnType, 18),
    feesUSD: toReturnType(feesUSD, returnType, 3),
    rateETH: toReturnType(rateETHDnum, returnType, 18),
    rateUSD: toReturnType(rateUSDDnum, returnType, 18),
    yieldETH: toReturnType(yieldETHDnum, returnType, 18),
    yieldUSD: toReturnType(yieldUSDDnum, returnType, 3),
    dripperWETH: toReturnType(dripperWETHDnum, returnType, 18),
    dripperUSD: toReturnType(dripperUSDDnum, returnType, 3),
    amoSupplyETH: toReturnType(amoSupplyETH, returnType, 18),
    amoSupplyUSD: toReturnType(amoSupplyUSD, returnType, 3),
  } as T extends 'dnum'
    ? DailyStatMapperReturn<Dnum>
    : DailyStatMapperReturn<number>;
};

type DailyStatMapperReturn<T> = {
  id: string;
  blockNumber: number;
  timestamp: number;
  date: string;
  apy: number;
  apy7: T;
  apy14: T;
  apy30: T;
  bestApy: { value: T; trailingDays: number };
  totalSupply: T;
  tvlUSD: T;
  tvlETH: T;
  rebasingSupply: T;
  nonRebasingSupply: T;
  wrappedSupply: T;
  pctWrappedSupply: T;
  protocolOwnedSupply: T;
  pctProtocolOwnedSupply: T;
  circulatingSupply: T;
  circulatingSupplyETH: T;
  circulatingSupplyUSD: T;
  pctCirculatingSupply: T;
  feesETH: T;
  feesUSD: T;
  rateETH: T;
  rateUSD: T;
  yieldETH: T;
  yieldUSD: T;
  dripperWETH: T;
  dripperUSD: T;
  amoSupplyETH: T;
  amoSupplyUSD: T;
};
