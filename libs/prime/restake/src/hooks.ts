import { tokens } from '@origin/shared/contracts';
import { useRoutingSwapState, useTokenPrice } from '@origin/shared/providers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mul } from 'dnum';
import { formatUnits, parseUnits } from 'viem';
import { useConfig } from 'wagmi';

export const useExchangeRate = () => {
  const config = useConfig();
  const { action, route } = useRoutingSwapState();

  return useQuery({
    queryKey: [
      'useExchangeRate',
      route?.action,
      route?.tokenIn.symbol,
      route?.tokenOut.symbol,
    ],
    queryFn: async () => {
      if (!action) {
        return 0;
      }

      const res = await action.estimateAmount(config, {
        amountIn: parseUnits('1', route.tokenIn.decimals),
        tokenIn: route.tokenIn,
        tokenOut: route.tokenOut,
      });

      const estimate = res ? +formatUnits(res, route.tokenOut.decimals) : 0;

      return estimate > 0 ? 1 / estimate : 0;
    },
  });
};

export const usePrimeETH_OETH = (amountIn: bigint) => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['usePrimeETH_OETH', amountIn?.toString()],
    queryFn: async () => {
      const prime_eth = await queryClient.fetchQuery({
        queryKey: useTokenPrice.getKey('primeETH_ETH'),
        queryFn: useTokenPrice.fetcher(config, queryClient),
      });

      return mul([amountIn, tokens.mainnet.primeETH.decimals], prime_eth);
    },
  });
};
