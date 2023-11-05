import {
  ChainlinkAggregatorABI,
  tokens as toks,
} from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import axios from 'axios';
import { map } from 'ramda';
import { formatUnits, parseUnits } from 'viem';

import { coingeckoApiEndpoint, coingeckoTokenIds } from './constants';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { SupportedToken } from './types';

const chainlinkOracles = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  DAI_USD: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
  USDC_USD: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
  USDT_USD: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
  FRAX_USD: '0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd',
  frxETH_ETH: '0xc58f3385fbc1c8ad2c0c9a061d7c13b141d7a5df',
  stETH_ETH: '0x86392dc19c0b719886221c78ab11eb8cf5c52812',
  rETH_ETH: '0x536218f9e9eb48863970252233c8f271f554c2d0',
} as const;

const coinGeckoTokens = [
  coingeckoTokenIds.OETH,
  coingeckoTokenIds.OUSD,
  coingeckoTokenIds.WETH,
];

export const usePrices = (
  options?: UseQueryOptions<
    Record<SupportedToken, number>,
    Error,
    Record<SupportedToken, number>,
    ['usePrices']
  >,
) => {
  return useQuery({
    queryKey: ['usePrices'],
    staleTime: import.meta.env.DEV ? 1000 * 60 * 30 : 1000 * 30,
    cacheTime: import.meta.env.DEV ? 1000 * 60 * 60 : 1000 * 60,
    queryFn: async () => {
      const res = await Promise.allSettled([
        readContracts({
          contracts: [
            ...Object.values(chainlinkOracles).map((address) => ({
              address,
              abi: ChainlinkAggregatorABI,
              functionName: 'latestRoundData',
            })),
            {
              address: toks.mainnet.WOETH.address,
              abi: toks.mainnet.WOETH.abi,
              functionName: 'previewRedeem',
              args: [parseUnits('1', toks.mainnet.WOETH.decimals)],
            },
            {
              address: toks.mainnet.WOUSD.address,
              abi: toks.mainnet.WOUSD.abi,
              functionName: 'previewRedeem',
              args: [parseUnits('1', toks.mainnet.WOUSD.decimals)],
            },
            {
              address: toks.mainnet.sfrxETH.address,
              abi: toks.mainnet.sfrxETH.abi,
              functionName: 'previewRedeem',
              args: [parseUnits('1', toks.mainnet.sfrxETH.decimals)],
            },
          ],
          allowFailure: true,
        }),
        axios.get(
          `${coingeckoApiEndpoint}/simple/price?ids=${coinGeckoTokens.join(
            '%2C',
          )}&vs_currencies=usd`,
        ),
      ]);

      const coinGecko = res[1].status === 'fulfilled' ? res[1].value.data : {};

      const WETH = coinGecko?.[coingeckoTokenIds.WETH]?.usd ?? 0;
      const OETH = coinGecko?.[coingeckoTokenIds.OETH]?.usd ?? 0;
      const OUSD = coinGecko?.[coingeckoTokenIds.OUSD]?.usd ?? 0;

      const multi = res[0].status === 'fulfilled' ? res[0].value : [];

      const ETH = +formatUnits(multi?.[0]?.result?.[1] ?? 0n, 8);
      const DAI = +formatUnits(multi?.[1]?.result?.[1] ?? 0n, 8);
      const USDC = +formatUnits(multi?.[2]?.result?.[1] ?? 0n, 8);
      const USDT = +formatUnits(multi?.[3]?.result?.[1] ?? 0n, 8);
      const FRAX = +formatUnits(multi?.[4]?.result?.[1] ?? 0n, 8);
      const frxETH =
        +formatUnits(multi?.[5]?.result?.[1] ?? 0n, toks.mainnet.ETH.decimals) *
        ETH;
      const stETH =
        +formatUnits(multi?.[6]?.result?.[1] ?? 0n, toks.mainnet.ETH.decimals) *
        ETH;
      const rETH =
        +formatUnits(multi?.[7]?.result?.[1] ?? 0n, toks.mainnet.ETH.decimals) *
        ETH;
      const WOETH =
        +formatUnits(
          (multi?.[8]?.result as unknown as bigint) ?? 0n,
          toks.mainnet.WOETH.decimals,
        ) * OETH;
      const WOUSD =
        +formatUnits(
          (multi?.[9]?.result as unknown as bigint) ?? 0n,
          toks.mainnet.WOUSD.decimals,
        ) * OUSD;
      const sfrxETH =
        +formatUnits(
          (multi?.[10]?.result as unknown as bigint) ?? 0n,
          toks.mainnet.sfrxETH.decimals,
        ) * frxETH;

      return {
        ETH,
        DAI,
        USDC,
        USDT,
        FRAX,
        frxETH,
        stETH,
        rETH,
        WOETH,
        WOUSD,
        sfrxETH,
        WETH,
        OETH,
        OUSD,
      };
    },
    ...options,
  });
};

export const useConvertedPrices = (
  target: SupportedToken,
  options?: Omit<
    UseQueryOptions<
      Record<SupportedToken, number>,
      Error,
      Record<SupportedToken, number>,
      ['usePrices']
    >,
    'select'
  >,
) =>
  usePrices({
    ...options,
    select: (data) => {
      const priceOut = data[target] === 0 ? 1 : data[target];

      return map((usdPrice) => usdPrice / priceOut, data);
    },
  });
