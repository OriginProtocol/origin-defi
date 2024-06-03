import { useRoutingSwapState } from '@origin/shared/providers';
import { useQuery } from '@tanstack/react-query';
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
