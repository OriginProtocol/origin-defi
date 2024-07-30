import { contracts, tokens } from '@origin/shared/contracts';
import { useRoutingSwapState } from '@origin/shared/providers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mul } from 'dnum';
import { formatUnits, parseUnits } from 'viem';
import { useConfig, useReadContract } from 'wagmi';

export const useExchangeRate = () => {
  const queryClient = useQueryClient();
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

      const res = await action.estimateAmount(
        { config, queryClient },
        {
          amountIn: parseUnits('1', route.tokenIn.decimals),
          tokenIn: route.tokenIn,
          tokenOut: route.tokenOut,
        },
      );

      const estimate = res ? +formatUnits(res, route.tokenOut.decimals) : 0;

      return estimate > 0 ? 1 / estimate : 0;
    },
  });
};

export const usePrimeETH_OETH = (amountIn: bigint) => {
  return useReadContract({
    address: contracts.mainnet.lrtOracle.address,
    abi: contracts.mainnet.lrtOracle.abi,
    functionName: 'primeETHPrice',
    chainId: contracts.mainnet.lrtOracle.chainId,
    query: {
      select: (data) =>
        mul([amountIn, tokens.mainnet.primeETH.decimals], [data, 18], {
          rounding: 'ROUND_DOWN',
        }),
    },
  });
};
