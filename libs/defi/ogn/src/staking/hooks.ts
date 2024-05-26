import { contracts, tokens } from '@origin/shared/contracts';
import {
  getMonthDurationToSeconds,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract, readContracts } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useOgnLockupsQuery } from './queries.generated';
import { getLockupApy, getRewardsApy } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type { OgnLockupsQuery } from './queries.generated';

export const useTotalLockedUp = () => {
  const { address } = useAccount();

  return useOgnLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) =>
        data?.ognLockups?.reduce(
          (acc, curr) => acc + BigInt(curr?.amount ?? 0n),
          0n,
        ) ?? 0n,
      enabled: !!address,
    },
  );
};

export const useXOgnStaking = (
  amount: bigint | number,
  monthDuration: number,
  options?: Partial<
    UseQueryOptions<
      {
        stakingAPY: number;
        xOGNReceived: number;
        rewardRate: number;
      },
      Error,
      {
        stakingAPY: number;
        xOGNReceived: number;
        rewardRate: number;
      },
      ['useXOgnStaking', string, number, Config]
    >
  >,
) => {
  const config = useConfig();

  return useQuery({
    queryKey: ['useXOgnStaking', amount?.toString(), monthDuration, config],
    queryFn: async () => {
      const amt =
        typeof amount === 'bigint'
          ? amount
          : parseUnits(amount.toString(), tokens.mainnet.OGN.decimals);

      const res = await readContracts(config, {
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
          {
            address: contracts.mainnet.OGNFixedRewardSource.address,
            abi: contracts.mainnet.OGNFixedRewardSource.abi,
            functionName: 'rewardConfig',
          },
        ],
        allowFailure: true,
      });

      const preview =
        res?.[0]?.status === 'success'
          ? +formatUnits(res[0].result[0], tokens.mainnet.xOGN.decimals)
          : 0;
      const xOgnTotalSupply =
        res?.[1]?.status === 'success'
          ? +formatUnits(res[1].result, tokens.mainnet.xOGN.decimals)
          : 100e6;
      const rewardRate =
        res?.[2]?.status === 'success'
          ? +formatUnits(res[2].result[1], tokens.mainnet.OGN.decimals)
          : 0;

      return {
        stakingAPY: getRewardsApy(preview, xOgnTotalSupply, rewardRate),
        xOGNReceived: preview,
        rewardRate,
      };
    },
    ...options,
  });
};

export const useMyVApy = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const config = useConfig();

  return useQuery({
    queryKey: ['useMyVApy', address, config],
    enabled: !!address,
    queryFn: async () => {
      if (!address) {
        return 0;
      }

      const data = await Promise.all([
        queryClient.fetchQuery<OgnLockupsQuery>({
          queryKey: useOgnLockupsQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
          queryFn: useOgnLockupsQuery.fetcher({
            address: address ?? ZERO_ADDRESS,
          }),
        }),
        readContract(config, {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'totalSupply',
        }),
        readContract(config, {
          address: contracts.mainnet.OGNFixedRewardSource.address,
          abi: contracts.mainnet.OGNFixedRewardSource.abi,
          functionName: 'rewardConfig',
        }),
      ]);

      if (isNilOrEmpty(data?.[0]?.ognLockups)) {
        return 0;
      }

      const total = data[0].ognLockups.reduce(
        (acc, curr) =>
          acc +
          +formatUnits(BigInt(curr?.amount ?? 0n), tokens.mainnet.OGN.decimals),
        0,
      );

      return data[0].ognLockups.reduce((acc, curr) => {
        const vAPY = getLockupApy(
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGN.decimals),
          +formatUnits(BigInt(curr.xogn), tokens.mainnet.xOGN.decimals),
          +formatUnits(BigInt(data[1]), tokens.mainnet.xOGN.decimals),
          +formatUnits(BigInt(data[2][1] ?? 0), tokens.mainnet.OGN.decimals),
        );

        const weight =
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGN.decimals) /
          total;

        return acc + weight * vAPY;
      }, 0);
    },
  });
};
