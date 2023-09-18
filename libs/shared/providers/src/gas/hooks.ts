import { contracts } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { fetchFeeData, readContract } from '@wagmi/core';
import { formatUnits } from 'viem';

export const useGasPrice = (gasAmount = 0n) => {
  return useQuery({
    queryKey: ['useGasPrice', gasAmount?.toString()],
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
      const gasPrice = +formatUnits(data.gasPrice, 9);
      const maxGasPrice = +formatUnits(data.maxFeePerGas, 9);
      const gasCostUsd = Number(gasAmount) * gasPrice * gweiUsd;
      const maxGasCost = Number(gasAmount) * maxGasPrice * gweiUsd;

      return { gweiUsd, gasPrice, gasCostUsd, maxGasCost };
    },
  });
};
