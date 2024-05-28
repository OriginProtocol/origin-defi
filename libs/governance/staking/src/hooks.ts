import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract, readContracts } from '@wagmi/core';
import { secondsInMonth } from 'date-fns/constants';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useUserLockupsQuery } from './queries.generated';
import { getRewardsApy, getVAPY } from './utils';

import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type { UserLockupsQuery } from './queries.generated';

export const useTotalLockedUp = () => {
  const { address } = useAccount();

  return useUserLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) =>
        data?.ogvLockups?.reduce(
          (acc, curr) => acc + BigInt(curr?.amount ?? 0n),
          0n,
        ) ?? 0n,
      enabled: !!address,
    },
  );
};

export const useStakingAPY = (
  amount: bigint | number,
  monthDuration: number,
  options?: Partial<
    UseQueryOptions<
      {
        stakingAPY: number;
        veOGVReceived: number;
      },
      Error,
      {
        stakingAPY: number;
        veOGVReceived: number;
      },
      ['useStakingAPY', string, number, Config]
    >
  >,
) => {
  const config = useConfig();

  return useQuery({
    queryKey: ['useStakingAPY', amount?.toString(), monthDuration, config],
    queryFn: async () => {
      const amt =
        typeof amount === 'bigint'
          ? amount
          : parseUnits(amount.toString(), tokens.mainnet.veOGV.decimals);

      const res = await readContracts(config, {
        contracts: [
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'previewPoints',
            args: [amt, BigInt(monthDuration * secondsInMonth)],
          },
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'totalSupply',
          },
        ],
        allowFailure: true,
      });

      const preview =
        res?.[0]?.status === 'success'
          ? +formatUnits(res[0].result[0], tokens.mainnet.veOGV.decimals)
          : 0;
      const veOgvTotalSupply =
        res?.[1]?.status === 'success'
          ? +formatUnits(res[1].result, tokens.mainnet.veOGV.decimals)
          : 100e6;

      return {
        stakingAPY: getRewardsApy(
          preview,
          +formatUnits(amt, tokens.mainnet.veOGV.decimals),
          veOgvTotalSupply,
        ),
        veOGVReceived: preview,
      };
    },
    ...options,
  });
};

export const useMyVApy = () => {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const config = useConfig();

  return useQuery({
    queryKey: ['useMyVApy', address, config],
    enabled: !!address,
    queryFn: async () => {
      const data = await Promise.all([
        queryClient.fetchQuery<UserLockupsQuery>({
          queryKey: useUserLockupsQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
          queryFn: useUserLockupsQuery.fetcher({
            address: address ?? ZERO_ADDRESS,
          }),
        }),
        readContract(config, {
          address: tokens.mainnet.veOGV.address,
          abi: tokens.mainnet.veOGV.abi,
          functionName: 'totalSupply',
        }),
      ]);

      if (!isConnected || isNilOrEmpty(data?.[0]?.ogvLockups)) {
        return 0;
      }

      const total = data[0].ogvLockups.reduce(
        (acc, curr) =>
          acc +
          +formatUnits(BigInt(curr?.amount ?? 0n), tokens.mainnet.OGV.decimals),
        0,
      );

      return data[0].ogvLockups.reduce((acc, curr) => {
        const vAPY = getVAPY(
          +formatUnits(BigInt(curr.veogv), tokens.mainnet.veOGV.decimals),
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGV.decimals),
          +formatUnits(BigInt(data[1]), tokens.mainnet.veOGV.decimals),
        );

        const weight =
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGV.decimals) /
          total;

        return acc + weight * vAPY;
      }, 0);
    },
  });
};

type Key = ['useOgnStakingApy', Config];

type Result = { ognRewardsPerYear: number; ognStaked: number; ognApy: number };

const getKey = (config: Config): Key => ['useOgnStakingApy', config];

const fetcher: QueryFunction<Result, Key> = async ({
  queryKey: [, config],
}) => {
  const res = await readContracts(config, {
    contracts: [
      {
        address: contracts.mainnet.OGNFixedRewardSource.address,
        abi: contracts.mainnet.OGNFixedRewardSource.abi,
        functionName: 'rewardConfig',
      },
      {
        address: tokens.mainnet.OGN.address,
        abi: tokens.mainnet.OGN.abi,
        functionName: 'balanceOf',
        args: [tokens.mainnet.xOGN.address],
      },
    ],
  });

  const ognRewardsPerYear =
    res?.[0]?.status === 'success'
      ? +formatUnits(res?.[0]?.result?.[1] ?? 0n, tokens.mainnet.OGN.decimals) *
        60 *
        60 *
        24 *
        365
      : 0;
  const ognStaked =
    res?.[1]?.status === 'success'
      ? +formatUnits(res?.[1]?.result ?? 0n, tokens.mainnet.OGN.decimals)
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
    queryKey: getKey(config),
    queryFn: fetcher,
    ...options,
  });
};
useOgnStakingApy.getKey = getKey;
useOgnStakingApy.fetcher = fetcher;
