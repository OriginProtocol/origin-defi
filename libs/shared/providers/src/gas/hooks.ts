import { useQuery, useQueryClient } from '@tanstack/react-query';
import { estimateFeesPerGas } from '@wagmi/core';
import { from, toNumber } from 'dnum';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { useTokenPrices } from '../prices';

import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

export type GasPrice = {
  gweiUsd: number;
  gasPrice: number;
  gasCostUsd: number;
  gasCostGwei: number;
  gasCostWei: number;
};

type Key = ['useGasPrice', string, number];

const getKey = (gasAmount: bigint, chainId: number): Key => [
  'useGasPrice',
  gasAmount.toString(),
  chainId,
];

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<GasPrice, Key> =
  (config, queryClient) =>
  async ({ queryKey: [, gasAmount, chainId] }) => {
    const [price, data] = await Promise.all([
      queryClient.fetchQuery({
        queryKey: useTokenPrices.getKey(['ETH_USD']),
        queryFn: useTokenPrices.fetcher(config),
      }),
      estimateFeesPerGas(config, { formatUnits: 'gwei', chainId }),
    ]);

    const gweiUsd = toNumber(price.ETH_USD ?? from(0)) * 1e-9;
    const gasPrice =
      +formatUnits(data.maxFeePerGas, 9) +
      +formatUnits(data.maxPriorityFeePerGas, 9);
    const gasCostGwei = Number(gasAmount) * gasPrice;
    const gasCostUsd = gasCostGwei * gweiUsd;

    return {
      gweiUsd,
      gasPrice,
      gasCostUsd,
      gasCostGwei,
      gasCostWei: gasCostGwei / 1e9,
    };
  };

export const useGasPrice = (
  gasAmount = 0n,
  chainId: number | undefined = mainnet.id,
  options?: Partial<UseQueryOptions<GasPrice, Error, GasPrice, Key>>,
) => {
  const queryClient = useQueryClient();
  const config = useConfig();

  return useQuery({
    queryKey: getKey(gasAmount, chainId),
    queryFn: fetcher(config, queryClient),
    ...options,
  });
};
useGasPrice.getKey = getKey;
useGasPrice.fetcher = fetcher;
