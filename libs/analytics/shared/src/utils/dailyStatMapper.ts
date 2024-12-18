import { hasKey } from '@origin/shared/utils';
import { toZonedTime } from 'date-fns-tz';
import { div, gt, mul, sub, toNumber } from 'dnum';
import { omit } from 'ramda';

import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

import type { DailyStatFragment } from '../queries';

const apiesTrailing = { apy14: 14, apy7: 7, apy30: 30 };

export const dailyStatMapper = (
  d: Partial<DailyStatFragment> | undefined | null,
  token: Token,
  { isChartFormat }: { isChartFormat?: boolean } = {},
) => {
  const factor = isChartFormat ? 100 : 1;

  const timestamp = d?.timestamp
    ? toZonedTime(d?.timestamp, 'UTC').getTime()
    : Date.now();

  const protocolOwned = [BigInt(d?.amoSupply ?? 0), token.decimals] as Dnum;
  const totalSupply = [BigInt(d?.totalSupply ?? 0), token.decimals] as Dnum;
  const wrapped = [BigInt(d?.wrappedSupply ?? 0), token.decimals] as Dnum;
  const fees = [BigInt(d?.fees ?? 0), 18] as Dnum;
  const rebasingSupply = [
    BigInt(d?.rebasingSupply ?? 0),
    token.decimals,
  ] as Dnum;
  const nonRebasingSupply = [
    BigInt(d?.nonRebasingSupply ?? 0),
    token.decimals,
  ] as Dnum;
  const rateETH = [BigInt(d?.rateETH ?? 0), 18] as Dnum;
  const rateUSD = [BigInt(d?.rateUSD ?? 0), 18] as Dnum;
  const yieldETH = [BigInt(d?.yield ?? 0), 18] as Dnum;
  const dripperWETH = [BigInt(d?.dripperWETH ?? 0), 18] as Dnum;

  const feesETH = mul(fees, rateETH);
  const feesUSD = mul(fees, rateUSD);
  const yieldUSD = mul(yieldETH, rateUSD);
  const dripperUSD = mul(dripperWETH, rateUSD);
  const circulating = sub(totalSupply, protocolOwned);
  const circulatingETH = mul(circulating, rateETH);
  const circulatingUSD = mul(circulating, rateUSD);
  const pctWrapped = gt(circulating, 0)
    ? mul(div(wrapped, circulating), factor)
    : ([0n, token.decimals] as Dnum);
  const pctCirculating = gt(totalSupply, 0)
    ? mul(div(circulating, totalSupply), factor)
    : ([0n, token.decimals] as Dnum);
  const pctProtocolOwned = gt(totalSupply, 0)
    ? mul(div(protocolOwned, totalSupply), factor)
    : ([0n, token.decimals] as Dnum);
  const tvlUSD = mul(totalSupply, rateUSD);
  const tvlETH = mul(totalSupply, rateETH);

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
    {
      value: 0,
      trailingDays: 0,
    },
  );

  return {
    id: d?.id ?? '',
    blockNumber: d?.blockNumber,
    timestamp,
    date: d?.date ?? '',
    apy: (d?.apy ?? 0) * factor,
    ...apies,
    bestApy,
    token: omit(['abi'], token),
    totalSupply: toNumber(totalSupply, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    tvlUSD: toNumber(tvlUSD, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    tvlETH: toNumber(tvlETH, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    rebasingSupply: toNumber(rebasingSupply, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    nonRebasingSupply: toNumber(nonRebasingSupply, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    wrappedSupply: toNumber(wrapped, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    pctWrappedSupply: toNumber(pctWrapped, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    protocolOwnedSupply: toNumber(protocolOwned, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    pctProtocolOwnedSupply: toNumber(pctProtocolOwned, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    circulatingSupply: toNumber(circulating, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    circulatingSupplyETH: toNumber(circulatingETH, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    circulatingSupplyUSD: toNumber(circulatingUSD, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    pctCirculatingSupply: toNumber(pctCirculating, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 2,
    }),
    feesETH: toNumber(feesETH, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 18,
    }),
    feesUSD: toNumber(feesUSD, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 3,
    }),
    rateETH: toNumber(rateETH, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 18,
    }),
    rateUSD: toNumber(rateUSD, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 18,
    }),
    yieldETH: toNumber(yieldETH, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 18,
    }),
    yieldUSD: toNumber(yieldUSD, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 3,
    }),
    dripperWETH: toNumber(dripperWETH, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 18,
    }),
    dripperUSD: toNumber(dripperUSD, {
      decimalsRounding: 'ROUND_DOWN',
      digits: 3,
    }),
  };
};
