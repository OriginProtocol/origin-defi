import { tokens } from '@origin/shared/contracts';
import { useRoutingSwapState, useTokenPrice } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { div, from } from 'dnum';
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
      const oeth_prime = await queryClient.fetchQuery({
        queryKey: useTokenPrice.getKey('OETH_primeETH'),
        queryFn: useTokenPrice.fetcher(config, queryClient),
      });

      if (isNilOrEmpty(oeth_prime) || oeth_prime === 0) {
        return from(0);
      }

      return div([amountIn, tokens.mainnet.primeETH.decimals], oeth_prime);
    },
  });
};
