import { useMemo } from 'react';

import { useArmDailyStatsQuery } from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { useTokenPrices } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { addMinutes, isAfter } from 'date-fns';
import { from, mul } from 'dnum';
import { useSearchParams } from 'react-router-dom';
import { parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useArmWithdrawalRequestsQuery } from './queries.generated';

import type { SupportedTokenPrice } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
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
  totalSupply: Dnum;
  totalAssets: Dnum;
  userBalance: Dnum;
  userWethBalance: Dnum;
  claimable: bigint;
  claimDelay: bigint;
  withdrawsQueued: bigint;
  lpToWeth: Dnum;
  wethToLp: Dnum;
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
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'previewRedeem',
            args: [parseUnits('1', tokens.mainnet['ARM-WETH-stETH'].decimals)],
          },
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'previewDeposit',
            args: [parseUnits('1', tokens.mainnet.WETH.decimals)],
          },
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'claimDelay',
          },
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'withdrawsQueued',
          },
        ],
      }),
      queryClient.fetchQuery({
        queryKey: useTokenPrices.getKey([
          '1:ARM-WETH-stETH_1:WETH',
          '1:ARM-WETH-stETH_1:ETH',
          '1:ARM-WETH-stETH_USD',
          '1:WETH_USD',
        ]),
        queryFn: useTokenPrices.fetcher(config),
      }),
      queryClient.fetchQuery({
        queryKey: useArmWithdrawalRequestsQuery.getKey({
          address: address?.toLowerCase() ?? ZERO_ADDRESS,
        }),
        queryFn: useArmWithdrawalRequestsQuery.fetcher({
          address: address?.toLowerCase() ?? ZERO_ADDRESS,
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

    const userBalance =
      res[0][0].status === 'success'
        ? ([
            BigInt(res[0][0].result),
            tokens.mainnet['ARM-WETH-stETH'].decimals,
          ] as Dnum)
        : from(0);
    const claimable = res[0][1].status === 'success' ? res[0][1].result : 0n;
    const lpToWeth =
      res[0][2].status === 'success'
        ? ([
            BigInt(res[0][2].result ?? 0),
            tokens.mainnet['ARM-WETH-stETH'].decimals,
          ] as Dnum)
        : from(0);
    const wethToLp =
      res[0][3].status === 'success'
        ? ([
            BigInt(res[0][3].result ?? 0),
            tokens.mainnet['ARM-WETH-stETH'].decimals,
          ] as Dnum)
        : from(0);
    const claimDelay = res[0][4].status === 'success' ? res[0][4].result : 0n;
    const withdrawsQueued =
      res[0][5].status === 'success' ? res[0][5].result : 0n;
    const requests = res[2].armWithdrawalRequests
      .filter((r) => !r.claimed)
      .map((r) => {
        const isClaimable =
          BigInt(r?.queued ?? 0) < claimable &&
          isAfter(new Date(), addMinutes(new Date(r.timestamp), 11));
        return {
          ...r,
          requestId: BigInt(r.requestId),
          amount: BigInt(r.amount),
          queued: BigInt(r.queued),
          claimable: isClaimable,
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

    const userWethBalance = mul(userBalance, lpToWeth, {
      rounding: 'ROUND_DOWN',
    });

    return {
      totalSupply,
      totalAssets,
      userBalance,
      userWethBalance,
      claimable,
      claimDelay,
      withdrawsQueued,
      lpToWeth,
      wethToLp,
      prices: res[1],
      requests,
    };
  };

export const useArmInfo = () => {
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: getKey(address),
    queryFn: fetcher(config, queryClient),
  });
};
useArmInfo.getKey = getKey;
useArmInfo.fetcher = fetcher;

type ClaimInfo = {
  withdrawer: string;
  claimed: boolean;
  claimTimestamp: number;
  assets: bigint;
  queued: bigint;
  claimable: bigint;
};

export const useClaimInfo = (
  requestId: bigint,
  options?: Omit<
    UseQueryOptions<ClaimInfo, Error, ClaimInfo, ['useClaimInfo', bigint]>,
    'queryFn' | 'queryKey'
  >,
) => {
  const config = useConfig();

  return useQuery({
    ...options,
    queryKey: ['useClaimInfo', requestId],
    queryFn: async () => {
      const res = await readContracts(config, {
        contracts: [
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'withdrawalRequests',
            args: [requestId],
          },
          {
            address: contracts.mainnet.ARMstETHWETHPool.address,
            abi: contracts.mainnet.ARMstETHWETHPool.abi,
            functionName: 'claimable',
          },
        ],
      });
      const requestRes = res[0].status === 'success' ? res[0].result : null;

      if (!requestRes) {
        return {
          withdrawer: ZERO_ADDRESS,
          claimed: false,
          claimTimestamp: 0,
          assets: 0n,
          queued: 0n,
          claimable: 0n,
        };
      }

      const [withdrawer, claimed, claimTimestamp, assets, queued] = requestRes;
      const claimable = res[1].status === 'success' ? res[1].result : 0n;

      return {
        withdrawer,
        claimed,
        claimTimestamp,
        assets,
        queued,
        claimable,
      };
    },
  });
};
