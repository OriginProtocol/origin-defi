import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useAccount, useContractReads } from 'wagmi';

import { useUserLockupsQuery } from './queries.generated';

import type { UseQueryOptions } from '@tanstack/react-query';

export const useStakingInfo = () => {
  const { address } = useAccount();
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        address: tokens.mainnet.OGV.address,
        abi: tokens.mainnet.OGV.abi,
        functionName: 'totalSupply',
      },
      {
        address: tokens.mainnet.veOGV.address,
        abi: tokens.mainnet.veOGV.abi,
        functionName: 'totalSupply',
      },
      {
        address: tokens.mainnet.OGV.address,
        abi: tokens.mainnet.OGV.abi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: tokens.mainnet.veOGV.address,
        abi: tokens.mainnet.veOGV.abi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: tokens.mainnet.veOGV.address,
        abi: tokens.mainnet.veOGV.abi,
        functionName: 'previewRewards',
        args: [address],
      },
    ],
    select: (data) => data.map((d) => (d.status === 'success' ? d.result : 0n)),
    allowFailure: true,
  });

  const ogvTotalSupply = data?.[0] ?? 0n;
  const veOgvTotalSupply = data?.[1] ?? 0n;
  const ogvBalance = data?.[2] ?? 0n;
  const veOgvBalance = data?.[3] ?? 0n;
  const veOgvRewards = data?.[4] ?? 0n;

  const votingPowerPercent =
    +formatUnits(veOgvBalance, tokens.mainnet.veOGV.decimals) /
    +formatUnits(veOgvTotalSupply, tokens.mainnet.veOGV.decimals);

  return {
    isLoading,
    ogvTotalSupply,
    veOgvTotalSupply,
    ogvBalance,
    veOgvBalance,
    veOgvRewards,
    votingPowerPercent,
  };
};

export const useTotalLockedUp = () => {
  const { address } = useAccount();

  return useUserLockupsQuery(
    { address },
    {
      select: (data) =>
        isNilOrEmpty(data?.ogvLockups)
          ? 0n
          : data.ogvLockups.reduce(
              (acc, curr) => acc + BigInt(curr?.amount ?? 0n),
              0n,
            ),
      enabled: !!address,
    },
  );
};

export const useStakingAPY = (
  amount: bigint,
  monthDuration: number,
  options?: UseQueryOptions,
) => {
  return useQuery({
    queryKey: ['useStakingAPY', amount?.toString(), monthDuration],
    queryFn: async () => {
      const data = await readContract({
        address: tokens.mainnet.veOGV.address,
        abi: tokens.mainnet.veOGV.abi,
        functionName: 'previewPoints',
        args: [amount, BigInt(monthDuration * 2629800)],
      });

      return data;
    },
    ...options,
  });
};
