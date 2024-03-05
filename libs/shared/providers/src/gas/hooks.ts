import { useQuery, useQueryClient } from '@tanstack/react-query';
import { estimateFeesPerGas } from '@wagmi/core';
import { formatUnits } from 'viem';
import { useConfig } from 'wagmi';

import { useTokenPrices } from '../prices';

import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

type GasPrice = {
  gweiUsd: number;
  gasPrice: number;
  gasCostUsd: number;
  gasCostGwei: number;
};

type Key = ['useGasPrice', string, QueryClient, Config];

const getKey = (
  gasAmount: bigint,
  queryClient: QueryClient,
  config: Config,
): Key => ['useGasPrice', gasAmount.toString(), queryClient, config];

const fetcher: QueryFunction<GasPrice, Key> = async ({
  queryKey: [, gasAmount, queryClient, config],
}) => {
  const [price, data] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: useTokenPrices.getKey(['ETH_USD'], config),
      queryFn: useTokenPrices.fetcher,
    }),
    estimateFeesPerGas(config, { formatUnits: 'gwei' }),
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
  };
};

export const useGasPrice = (
  gasAmount = 0n,
  options?: Partial<UseQueryOptions<GasPrice, Error, GasPrice, Key>>,
) => {
  const queryClient = useQueryClient();
  const config = useConfig();

  return useQuery({
    queryKey: getKey(gasAmount, queryClient, config),
    queryFn: fetcher,
    ...options,
  });
};
useGasPrice.getKey = getKey;
useGasPrice.fetcher = fetcher;
