import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserLockupsQuery } from './queries.generated';
import { getRewardsApy } from './utils';

import type { UseQueryOptions } from '@tanstack/react-query';

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
      placeholderData: { ogvLockups: [] },
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
            args: [amt, BigInt(monthDuration * 2629800)],
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
