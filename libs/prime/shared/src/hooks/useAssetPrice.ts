import { contracts } from '@origin/shared/contracts';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { parseUnits } from 'viem';

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

      const primeETHPrice =
        (data?.[0] as unknown as bigint) ?? parseUnits('10', 18);
      const assetPrice =
        (data?.[1] as unknown as bigint) ?? parseUnits('10', 18);

      return primeETHPrice / assetPrice;
    },
  });
};
