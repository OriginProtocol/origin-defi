import { useMemo } from 'react';

import { contracts, tokens } from '@origin/shared/contracts';
import { useTokenPrices } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { addMinutes, isAfter } from 'date-fns';
import { from } from 'dnum';
import { useSearchParams } from 'react-router-dom';
import { useAccount, useConfig } from 'wagmi';

import {
  useArmDailyStatsQuery,
  useArmWithdrawalRequestsQuery,
} from './queries.generated';

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
  totalSupply: Dnum;
  totalAssets: Dnum;
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
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'claimable',
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
      queryClient.fetchQuery({
        queryKey: useArmWithdrawalRequestsQuery.getKey({
          address: address ?? ZERO_ADDRESS,
        }),
        queryFn: useArmWithdrawalRequestsQuery.fetcher({
          address: address ?? ZERO_ADDRESS,
        }),
      }),
      queryClient.fetchQuery({
        queryKey: useArmDailyStatsQuery.getKey({
          limit: 1,
        }),
        queryFn: useArmDailyStatsQuery.fetcher({
          limit: 1,
        }),
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
    const claimableRes =
      res[0][3].status === 'success' ? BigInt(res[0][3].result ?? 0) : 0n;
    const requests = res[2].armRedemptions.map((r) => {
      const claimable =
        !r.claimed &&
        BigInt(r?.queued ?? 0) < claimableRes &&
        isAfter(new Date(), addMinutes(new Date(r.timestamp), 11));
      return {
        ...r,
        requestId: BigInt(r.requestId),
        amount: BigInt(r.amount),
        queued: BigInt(r.queued),
        claimable,
      };
    });
    const totalSupply = [
      BigInt(res?.[3]?.armDailyStats?.[0]?.totalSupply ?? 0),
      tokens.mainnet['ARM-WETH-stETH'].decimals,
    ] as Dnum;
    const totalAssets = [
      BigInt(res?.[3]?.armDailyStats?.[0]?.totalAssets ?? 0),
      tokens.mainnet['ARM-WETH-stETH'].decimals,
    ] as Dnum;

    return {
      waveNumber: 1,
      totalSupply,
      totalAssets,
      waveCap,
      userCap,
      userBalance,
      prices: res[1],
      requests,
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
