import { useOgnStakingApy } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useOgnLockupsQuery } from './queries.generated';

import type { OgnLockupsQuery } from './queries.generated';

export const useTotalLockedUp = () => {
  const { address } = useAccount();

  return useOgnLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) =>
        data?.esLockups?.reduce(
          (acc, curr) => acc + BigInt(curr?.amount ?? 0n),
          0n,
        ) ?? 0n,
      enabled: !!address,
    },
  );
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
        queryClient.fetchQuery({
          queryKey: useOgnStakingApy.getKey(config),
          queryFn: useOgnStakingApy.fetcher,
        }),
        readContract(config, {
          address: tokens.mainnet.xOGN.address,
          abi: tokens.mainnet.xOGN.abi,
          functionName: 'totalSupply',
        }),
      ]);

      if (isNilOrEmpty(data?.[0]?.esLockups)) {
        return 0;
      }

      const total = data[0].esLockups.reduce(
        (acc, curr) =>
          acc +
          +formatUnits(BigInt(curr?.amount ?? 0n), tokens.mainnet.OGN.decimals),
        0,
      );

      return data[0].esLockups.reduce((acc, curr) => {
        const ognRewardsPerYear = data?.[1]?.ognRewardsPerYear ?? 0;
        const totalSupply = +formatUnits(
          data?.[2] ?? 0n,
          tokens.mainnet.xOGN.decimals,
        );
        const vAPY =
          ognRewardsPerYear *
          (+formatUnits(
            BigInt(curr?.points ?? '0'),
            tokens.mainnet.xOGN.decimals,
          ) /
            (totalSupply === 0 ? 1 : totalSupply));

        const weight =
          +formatUnits(BigInt(curr.amount), tokens.mainnet.OGN.decimals) /
          total;

        return acc + weight * vAPY;
      }, 0);
    },
  });
};
