import { useQuery, useQueryClient } from '@tanstack/react-query';
import { estimateFeesPerGas } from '@wagmi/core';
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

type Key = ['useGasPrice', string, number, QueryClient, Config];

const getKey = (
  gasAmount: bigint,
  chainId: number,
  queryClient: QueryClient,
  config: Config,
): Key => ['useGasPrice', gasAmount.toString(), chainId, queryClient, config];

const fetcher: QueryFunction<GasPrice, Key> = async ({
  queryKey: [, gasAmount, chainId, queryClient, config],
}) => {
  const [price, data] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useTokenPrices.getKey(['ETH_USD'], config),
      queryFn: useTokenPrices.fetcher,
    }),
    estimateFeesPerGas(config, { formatUnits: 'gwei', chainId }),
  ]);

  const gweiUsd = price.ETH_USD * 1e-9;
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
    queryKey: getKey(gasAmount, chainId, queryClient, config),
    queryFn: fetcher,
    ...options,
  });
};
useGasPrice.getKey = getKey;
useGasPrice.fetcher = fetcher;
