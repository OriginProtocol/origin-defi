import { tokens } from '@origin/shared/contracts';
import { getMonthDurationToSeconds, isFulfilled } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';
import { useConfig } from 'wagmi';

import { queryClient } from '../clients';
import { useOgnStakingApy } from './useOgnStakingApy';

import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from 'wagmi';

type Key = ['useXOgnStakingApy', string, number, Config];

type Result = {
  xOgnApy: number;
  xOgnPreview: number;
};

const getKey = (
  config: Config,
  amount?: number | bigint,
  monthDuration?: number,
): Key => [
  'useXOgnStakingApy',
  amount === undefined
    ? '100'
    : typeof amount === 'bigint'
      ? formatUnits(amount, tokens.mainnet.OGN.decimals)
      : amount.toString(),
  monthDuration ?? 12,
  config,
];

const fetcher: QueryFunction<Result, Key> = async ({
  queryKey: [, amount, monthDuration, config],
}) => {
  const amt = parseUnits(amount, tokens.mainnet.OGN.decimals);
  const res = await Promise.allSettled([
    queryClient.fetchQuery({
      queryKey: useOgnStakingApy.getKey(config),
      queryFn: useOgnStakingApy.fetcher,
    }),
    readContracts(config, {
      contracts: [
        {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'previewPoints',
          args: [amt, getMonthDurationToSeconds(monthDuration)],
        },
        {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'totalSupply',
        },
      ],
      allowFailure: true,
    }),
  ]);

  const ognRewardsPerYear = isFulfilled(res?.[0])
    ? res?.[0].value.ognRewardsPerYear
    : 0;
  const ognStaked = isFulfilled(res?.[0]) ? res?.[0].value.ognStaked : 0;
  const xOgnPreview = isFulfilled(res?.[1])
    ? +formatUnits(
        res[1].value?.[0].result?.[0] ?? 0n,
        tokens.mainnet.xOGN.decimals,
      )
    : 0;
  const xOgnTotalSupply = isFulfilled(res?.[1])
    ? +formatUnits(res[1].value?.[1].result ?? 0n, tokens.mainnet.xOGN.decimals)
    : 0;

  const ognAfterOneYear = ognStaked + ognRewardsPerYear;
  const xognPercentage = xOgnPreview / (xOgnTotalSupply + xOgnPreview);

  const userDepositOgn = +formatUnits(amt, tokens.mainnet.OGN.decimals);
  const userOgnAfterOneYear = ognAfterOneYear * xognPercentage;

  const xOgnApy = userOgnAfterOneYear / userDepositOgn;

  return {
    xOgnApy,
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
    queryKey: getKey(config, amount, monthDuration),
    queryFn: fetcher,
    ...options,
  });
};
useXOgnStakingApy.getKey = getKey;
useXOgnStakingApy.fetcher = fetcher;
