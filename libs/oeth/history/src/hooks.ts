import { contracts } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import axios from 'axios';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions } from '@tanstack/react-query';

export const usePendingYield = (
  isWrapped = false,
  options?: QueryOptions<
    number,
    Error,
    number,
    ['usePendingYield', boolean, HexAddress, boolean]
  >,
) => {
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ['usePendingYield', isWrapped, address, isConnected],
    queryFn: async () => {
      if (!isConnected) {
        return 0;
      }

      const [creditsBalanceOf, maxWithdraw, ratios] = await Promise.all([
        readContract({
          address: contracts.mainnet.OETH.address,
          abi: contracts.mainnet.OETH.abi,
          functionName: 'creditsBalanceOf',
          args: [address],
        }),
        readContract({
          address: contracts.mainnet.wOETH.address,
          abi: contracts.mainnet.wOETH.abi,
          functionName: 'maxWithdraw',
          args: [address],
        }),
        axios.get('https://analytics.ousd.com/api/v2/oeth/ratios'),
      ]);

      const currentRatio = ratios?.data?.current_credits_per_token ?? 1;
      const nextRatio = ratios?.data?.next_credits_per_token ?? 1;
      const credits = isWrapped
        ? +formatEther(maxWithdraw) * +formatEther(creditsBalanceOf[1])
        : +formatEther(creditsBalanceOf[0]);

      return Math.max(0, credits / nextRatio - credits / currentRatio);
    },
    ...options,
  });
};
