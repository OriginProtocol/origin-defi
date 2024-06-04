import { tokens } from '@origin/shared/contracts';
import { getMonthDurationToSeconds, isFulfilled } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';
import { useConfig } from 'wagmi';

import { queryClient } from '../clients';
import { useOgnStakingApy } from './useOgnStakingApy';

import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type Key = ['useXOgnStakingApy', string, number];

type Result = {
  xOgnApyPercentage: number;
  xOgnPreview: number;
};

const getKey = (amount?: number | bigint, monthDuration?: number): Key => [
  'useXOgnStakingApy',
  amount === undefined
    ? '100'
    : typeof amount === 'bigint'
      ? formatUnits(amount, tokens.mainnet.OGN.decimals)
      : amount.toString(),
  monthDuration ?? 12,
];

const fetcher: (config: Config) => QueryFunction<Result, Key> =
  (config: Config) =>
  async ({ queryKey: [, amount, monthDuration] }) => {
    const amt = parseUnits(amount, tokens.mainnet.OGN.decimals);
    const res = await Promise.allSettled([
      queryClient.fetchQuery({
        queryKey: useOgnStakingApy.getKey(),
        queryFn: useOgnStakingApy.fetcher(config),
      }),
      readContract(config, {
        address: tokens.mainnet.xOGN.address,
        abi: tokens.mainnet.xOGN.abi,
        functionName: 'previewPoints',
        args: [amt, getMonthDurationToSeconds(monthDuration)],
      }),
    ]);

    const ognRewardsPerYear = isFulfilled(res?.[0])
      ? res?.[0].value.ognRewardsPerYear
      : 0;
    const xOgnTotalSupply = isFulfilled(res?.[0]) ? res[0].value.ognStaked : 0;
    const xOgnPreview = isFulfilled(res?.[1])
      ? +formatUnits(res[1].value?.[0] ?? 0n, tokens.mainnet.xOGN.decimals)
      : 0;

    const xognPercentage = xOgnPreview / (xOgnTotalSupply + xOgnPreview);
    const projectedRewards = ognRewardsPerYear * xognPercentage;
    const stakedAmount = +formatUnits(amt, tokens.mainnet.OGN.decimals);
    const xOgnApyPercentage = projectedRewards / stakedAmount;

    return {
      xOgnApyPercentage,
      xOgnPreview,
    };
  };

export const useXOgnStakingApy = (
  amount?: number | bigint,
  monthDuration?: number,
  options?: Omit<
    UseQueryOptions<Result, Error, Result, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const config = useConfig();

  return useQuery({
    queryKey: getKey(amount, monthDuration),
    queryFn: fetcher(config),
    ...options,
  });
};
useXOgnStakingApy.getKey = getKey;
useXOgnStakingApy.fetcher = fetcher;
