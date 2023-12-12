import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, scale } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';
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
    number,
    Error,
    number,
    ['useStakingAPY', string, number]
  >,
) => {
  return useQuery({
    queryKey: ['useStakingAPY', amount?.toString(), monthDuration],
    queryFn: async () => {
      const amt =
        typeof amount === 'bigint'
          ? +formatUnits(amount, tokens.mainnet.OGV.decimals)
          : amount;

      const res = await readContracts({
        contracts: [
          {
            address: tokens.mainnet.veOGV.address,
            abi: tokens.mainnet.veOGV.abi,
            functionName: 'previewPoints',
            args: [
              scale(BigInt(amt), 0, tokens.mainnet.OGV.decimals),
              BigInt(monthDuration * 2629800),
            ],
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

      return getRewardsApy(preview, amt, veOgvTotalSupply);
    },
    ...options,
  });
};
