import { useMemo } from 'react';

import { contracts, tokens } from '@origin/shared/contracts';
import { useTokenPrices } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { from } from 'dnum';
import { useSearchParams } from 'react-router-dom';
import { useAccount, useConfig } from 'wagmi';

import type { SupportedTokenPrice } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryClient, QueryFunction } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';
import type { Dnum } from 'dnum';

import type { WithdrawalRequest } from './types';

export const useOperation = () => {
  const [search, setSearch] = useSearchParams({
    o: 'deposit',
  });

  return useMemo(
    () => ({
      operation: search.get('o') ?? 'deposit',
      update: (newVal: 'deposit' | 'withdraw' | 'claim') => {
        setSearch((params) => {
          params.set('o', newVal);
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};

type Key = ['useArmVault', HexAddress | undefined];

const getKey = (address: HexAddress | undefined): Key => [
  'useArmVault',
  address,
];

type ArmVault = {
  waveNumber: number;
  waveCap: Dnum;
  userCap: Dnum;
  userBalance: Dnum;
  prices: Record<SupportedTokenPrice, Dnum>;
  requests: WithdrawalRequest[];
};

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<ArmVault, Key> =
  (config, queryClient) =>
  async ({ queryKey: [, address] }) => {
    const res = await Promise.all([
      readContracts(config, {
        contracts: [
          {
            address: contracts.mainnet.ARMPoolController.address,
            abi: contracts.mainnet.ARMPoolController.abi,
            functionName: 'totalAssetsCap',
          },
          {
            address: contracts.mainnet.ARMPoolController.address,
            abi: contracts.mainnet.ARMPoolController.abi,
            functionName: 'liquidityProviderCaps',
            args: [address ?? ZERO_ADDRESS],
          },
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'balanceOf',
            args: [address ?? ZERO_ADDRESS],
          },
        ],
      }),
      queryClient.fetchQuery({
        queryKey: useTokenPrices.getKey([
          '1:ARM-WETH-stETH_1:WETH',
          '1:ARM-WETH-stETH_1:ETH',
          '1:ARM-WETH-stETH_USD',
        ]),
        queryFn: useTokenPrices.fetcher(config),
      }),
    ]);

    const waveCap =
      res[0][0].status === 'success'
        ? ([
            BigInt(res[0][0].result),
            tokens.mainnet['ARM-WETH-stETH'].decimals,
          ] as Dnum)
        : from(0);
    const userCap =
      !!address && res[0][1].status === 'success'
        ? ([
            BigInt(res[0][1].result),
            tokens.mainnet['ARM-WETH-stETH'].decimals,
          ] as Dnum)
        : from(0);
    const userBalance =
      res[0][2].status === 'success'
        ? ([
            BigInt(res[0][2].result),
            tokens.mainnet['ARM-WETH-stETH'].decimals,
          ] as Dnum)
        : from(0);

    return {
      waveNumber: 1,
      waveCap,
      userCap,
      userBalance,
      prices: res[1],
      requests: [
        {
          claimable: true,
          amount: 10_000_000_000_000_000n,
          id: '1',
          requestId: 1n,
          timestamp: '1',
          queued: 1n,
          claimed: false,
          blockNumber: 1,
          txHash: '1',
        },
        {
          claimable: false,
          amount: 10_000_000_000_000_000n,
          id: '2',
          requestId: 2n,
          timestamp: '1',
          queued: 2n,
          claimed: false,
          blockNumber: 1,
          txHash: '1',
        },
      ],
    };
  };

export const useArmVault = () => {
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: getKey(address),
    queryFn: fetcher(config, queryClient),
  });
};
useArmVault.getKey = getKey;
useArmVault.fetcher = fetcher;
