import { getNativeTokenByChainId } from '@origin/shared/contracts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { estimateFeesPerGas } from '@wagmi/core';
import { add, from, mul } from 'dnum';
import { useConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { getTokenPriceKey, useTokenPrice } from '../prices';

import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from '@wagmi/core';
import type { Dnum } from 'dnum';

export type GasPrice = {
  gasPrice: Dnum;
  gasCostUsd: Dnum;
  gasCostWei: Dnum;
  gasCostGwei: Dnum;
  gasCostEther: Dnum;
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
        queryKey: useTokenPrice.getKey(
          getTokenPriceKey(getNativeTokenByChainId(chainId)),
        ),
        queryFn: useTokenPrice.fetcher(config, queryClient),
      }),
      estimateFeesPerGas(config, { chainId }),
    ]);

    const gasPrice = add(
      [data?.maxFeePerGas ?? 0n, 18],
      [data?.maxPriorityFeePerGas ?? 0n, 18],
    );
    const gasCostEther = mul(gasPrice, from(gasAmount ?? 0), {
      rounding: 'ROUND_UP',
      decimals: 18,
    });
    const gasCostGwei = mul(gasCostEther, 1e9);
    const gasCostWei = mul(gasCostEther, 1e18);
    const gasCostUsd = mul(gasCostEther, from(price), {
      rounding: 'ROUND_UP',
      decimals: 6,
    });

    return {
      gasPrice,
      gasCostUsd,
      gasCostWei,
      gasCostGwei,
      gasCostEther,
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
