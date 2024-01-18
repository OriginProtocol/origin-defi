import { contracts } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { fetchFeeData, readContract } from '@wagmi/core';
import { formatUnits } from 'viem';

import type { UseQueryOptions } from '@tanstack/react-query';

type GasPrice = {
  gweiUsd: number;
  gasPrice: number;
  gasCostUsd: number;
  gasCostGwei: number;
  maxGasCostUsd: number;
  maxGasCostGwei: number;
};

export const useGasPrice = (
  gasAmount = 0n,
  options?: UseQueryOptions<
    GasPrice,
    Error,
    GasPrice,
    [['useGasPrice', string]]
  >,
) => {
  return useQuery({
    queryKey: ['useGasPrice', gasAmount?.toString()] as const,
    queryFn: async () => {
      const [price, data] = await Promise.all([
        readContract({
          address: contracts.mainnet.ChainlinkOracle.address,
          abi: contracts.mainnet.ChainlinkOracle.abi,
          functionName: 'ethUsdPrice',
        }),
        fetchFeeData({ formatUnits: 'gwei' }),
      ]);

      const gweiUsd = +formatUnits(price, 6) * 1e-9;
      const gasPrice =
        +formatUnits(data.lastBaseFeePerGas, 9) +
        +formatUnits(data.maxPriorityFeePerGas, 9);
      const gasCostGwei = Number(gasAmount) * gasPrice;
      const gasCostUsd = gasCostGwei * gweiUsd;

      return {
        gweiUsd,
        gasPrice,
        gasCostUsd,
        gasCostGwei,
      };
    },
    ...options,
  });
};
