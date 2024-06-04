import { contracts, tokens } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';

import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type Key = ['useOgnStakingApy'];

type Result = { ognRewardsPerYear: number; ognStaked: number; ognApy: number };

const getKey = (): Key => ['useOgnStakingApy'];

const fetcher: (config: Config) => QueryFunction<Result, Key> =
  (config) => async () => {
    const res = await readContracts(config, {
      contracts: [
        {
          address: contracts.mainnet.OGNFixedRewardSource.address,
          abi: contracts.mainnet.OGNFixedRewardSource.abi,
          functionName: 'rewardConfig',
        },
        {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'totalSupply',
        },
      ],
    });

    const ognRewardsPerYear =
      res?.[0]?.status === 'success'
        ? +formatUnits(
            res?.[0]?.result?.[1] ?? 0n,
            tokens.mainnet.OGN.decimals,
          ) *
          60 *
          60 *
          24 *
          365
        : 0;
    const ognStaked =
      res?.[1]?.status === 'success'
        ? +formatUnits(res?.[1]?.result ?? 0n, tokens.mainnet.xOGN.decimals)
        : 0;

    return {
      ognRewardsPerYear,
      ognStaked,
      ognApy: ognStaked === 0 ? 0 : ognRewardsPerYear / ognStaked,
    };
  };

export const useOgnStakingApy = (
  options?: Omit<
    UseQueryOptions<Result, Error, Result, Key>,
    'queryKey' | 'queryFn'
  >,
) => {
  const config = useConfig();

  return useQuery({
    queryKey: getKey(),
    queryFn: fetcher(config),
    ...options,
  });
};
useOgnStakingApy.getKey = getKey;
useOgnStakingApy.fetcher = fetcher;
