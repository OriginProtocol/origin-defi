import { contracts, tokens } from '@origin/shared/contracts';
import { useIsNativeCurrency } from '@origin/shared/providers';
import { useQuery } from '@tanstack/react-query';
import { getPublicClient, readContract } from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';
import { useConfig } from 'wagmi';

import type { Token } from '@origin/shared/contracts';

export const useAssetPrice = (asset: Token) => {
  const config = useConfig();
  const isNativeCurrency = useIsNativeCurrency();

  const isNative = isNativeCurrency(asset);

  return useQuery({
    queryKey: ['useAssetPrice', asset.address, config, isNative],
    queryFn: async () => {
      const publicClient = getPublicClient(config);
      let assetEstimate = 1n;

      if (
        (isNative || asset.symbol === tokens.mainnet.WETH.symbol) &&
        publicClient
      ) {
        assetEstimate = (
          await publicClient.simulateContract({
            address: contracts.mainnet.uniswapV3Quoter.address,
            abi: contracts.mainnet.uniswapV3Quoter.abi,
            functionName: 'quoteExactOutputSingle',
            args: [
              tokens.mainnet.WETH.address,
              tokens.mainnet.primeETH.address,
              500,
              parseUnits('1', tokens.mainnet.primeETH.decimals),
              0n,
            ],
          })
        )?.result;
      } else {
        if (!asset?.address) {
          return 0;
        }

        assetEstimate = await readContract(config, {
          address: contracts.mainnet.lrtOracle.address,
          abi: contracts.mainnet.lrtOracle.abi,
          functionName: 'getAssetPrice',
          args: [asset.address],
        });
      }

      const prime = await readContract(config, {
        address: contracts.mainnet.lrtOracle.address,
        abi: contracts.mainnet.lrtOracle.abi,
        functionName: 'primeETHPrice',
      });

      const primeETHPrice = +formatUnits(prime ?? 0n, 18);
      const assetPrice = +formatUnits(assetEstimate ?? 1n, 18);

      return primeETHPrice / assetPrice;
    },
    staleTime: 30e3,
  });
};
