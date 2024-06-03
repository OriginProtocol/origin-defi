import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { useAccount, useConfig } from 'wagmi';

import { usePointRecipientStatsQuery } from '../queries.generated';

export const usePoints = () => {
  const config = useConfig();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['usePoints', address],
    queryFn: async () => {
      if (!address) {
        return {
          primePoints: 0n,
          elPoints: 0n,
          xpPoints: 0n,
          totalELPoints: 0n,
          totalXpPoints: 0n,
        };
      }

      const primePoints = await readContract(config, {
        address: tokens.mainnet.primeETH.address,
        abi: tokens.mainnet.primeETH.abi,
        functionName: 'balanceOf',
        args: [address ?? ZERO_ADDRESS],
      });
      const stats = await queryClient.fetchQuery({
        queryKey: usePointRecipientStatsQuery.getKey({ address }),
        queryFn: usePointRecipientStatsQuery.fetcher({ address }),
      });

      return {
        primePoints: primePoints,
        elPoints: BigInt(stats?.lrtPointRecipientStats?.elPoints ?? '0'),
        xpPoints: BigInt(stats?.lrtPointRecipientStats?.points ?? '0'),
        totalELPoints: BigInt(stats?.totalEigenLayerPoints ?? '0'),
        totalXpPoints: BigInt(stats?.lrtSummaries?.[0]?.points ?? '0'),
      };
    },
  });
};
