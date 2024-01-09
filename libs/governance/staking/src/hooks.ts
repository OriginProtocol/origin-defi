import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract, readContracts } from '@wagmi/core';
import { secondsInMonth } from 'date-fns/constants';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserLockupsQuery } from './queries.generated';
import { getRewardsApy } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';

import type { UserLockupsQuery } from './queries.generated';

export const useTotalLockedUp = () => {
  const { address } = useAccount();

  return useUserLockupsQuery(
    { address },
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
  options?: UseQueryOptions<
    {
      stakingAPY: number;
      veOGVReceived: number;
    },
    Error,
    {
      stakingAPY: number;
      veOGVReceived: number;
    },
    ['useStakingAPY', string, number]
  >,
) => {
  return useQuery({
    queryKey: ['useStakingAPY', amount?.toString(), monthDuration],
    queryFn: async () => {
      const amt =
        typeof amount === 'bigint'
          ? amount
          : parseUnits(amount.toString(), tokens.mainnet.veOGV.decimals);

      const res = await readContracts({
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

  return useQuery({
    queryKey: ['useMyVApy', address],
    queryFn: async () => {
      const data = await Promise.all([
        queryClient.fetchQuery<UserLockupsQuery>(
          useUserLockupsQuery.getKey({ address }),
        ),
        readContract({
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
          +formatUnits(
            BigInt(curr?.amount ?? 0n),
            tokens.mainnet.veOGV.decimals,
          ),
        0,
      );

      return data[0].ogvLockups.reduce((acc, curr) => {
        const vAPY = getRewardsApy(
          +formatUnits(BigInt(curr.amount), tokens.mainnet.veOGV.decimals),
          +formatUnits(BigInt(curr.veogv), tokens.mainnet.veOGV.decimals),
          +formatUnits(data[1], tokens.mainnet.veOGV.decimals),
        );

        const weight =
          +formatUnits(BigInt(curr.amount), tokens.mainnet.veOGV.decimals) /
          total;

        return acc + weight * vAPY;
      }, 0);
    },
    enabled: !!address,
  });
};
