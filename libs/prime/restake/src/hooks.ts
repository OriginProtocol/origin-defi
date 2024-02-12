import { contracts } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { formatUnits } from 'viem';

import type { Token } from '@origin/shared/contracts';

export const useAssetPrice = (asset: Token) => {
  return useQuery({
    queryKey: ['useAssetPrice', asset.address],
    queryFn: async () => {
      const data = await readContracts({
        contracts: [
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'primeETHPrice',
          },
          {
            address: contracts.mainnet.lrtOracle.address,
            abi: contracts.mainnet.lrtOracle.abi,
            functionName: 'getAssetPrice',
            args: [asset.address],
          },
        ],
      });

      const primeETHPrice = +formatUnits(data?.[0]?.result ?? 0n, 18);
      const assetPrice = +formatUnits(data?.[1]?.result ?? 1n, 18);

      return primeETHPrice / assetPrice;
    },
    staleTime: 30e3,
  });
};
