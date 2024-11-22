import { useMemo } from 'react';

import { useOTokenWithdrawalRequestsQuery } from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { isFulfilled, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { addMinutes, isAfter } from 'date-fns';
import { useSearchParams } from 'react-router';
import { useAccount, useConfig } from 'wagmi';

import { WITHDRAW_DELAY } from './constants';

import type { HexAddress } from '@origin/shared/utils';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type { WithdrawalRequest } from './types';

export const useViewSelect = () => {
  const [search, setSearch] = useSearchParams({
    v: 'request',
  });

  return useMemo(
    () => ({
      view: search.get('v') ?? 'request',
      update: (newVal: 'request' | 'claim') => {
        setSearch((params) => {
          params.set('v', newVal);
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};

const getKey = (address: HexAddress | undefined) => [
  'useClaimableRequests',
  address,
];

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<WithdrawalRequest[]> =
  (config, queryClient) =>
  async ({ queryKey: [, address] }) => {
    const res = await Promise.allSettled([
      readContract(config, {
        address: contracts.mainnet.OETHVault.address,
        abi: contracts.mainnet.OETHVault.abi,
        functionName: 'withdrawalQueueMetadata',
        chainId: contracts.mainnet.OETHVault.chainId,
      }),
      queryClient.fetchQuery({
        queryKey: useOTokenWithdrawalRequestsQuery.getKey({
          token: tokens.mainnet.OETH.address.toLowerCase(),
          chainId: tokens.mainnet.OETH.chainId,
          withdrawer: (address as string)?.toLowerCase() ?? ZERO_ADDRESS,
        }),
        queryFn: useOTokenWithdrawalRequestsQuery.fetcher({
          token: tokens.mainnet.OETH.address.toLowerCase(),
          chainId: tokens.mainnet.OETH.chainId,
          withdrawer: (address as string)?.toLowerCase() ?? ZERO_ADDRESS,
        }),
      }),
      readContract(config, {
        address: tokens.mainnet.WETH.address,
        abi: tokens.mainnet.WETH.abi,
        functionName: 'balanceOf',
        chainId: tokens.mainnet.WETH.chainId,
        args: [contracts.mainnet.OETHVault.address],
      }),
    ]);
    const queueData = isFulfilled(res[0]) ? res[0].value : null;
    const requests = isFulfilled(res[1])
      ? (res[1].value?.oTokenWithdrawalRequests ?? [])
      : [];
    const wethBalance = isFulfilled(res[2]) ? res[2].value : 0n;
    return requests.map((r) => {
      const claimable =
        !r.claimed &&
        wethBalance + BigInt(queueData?.[1] ?? 0) - BigInt(r?.queued ?? 0) >
          0n &&
        isAfter(
          new Date(),
          addMinutes(new Date(r.timestamp), WITHDRAW_DELAY + 1),
        );

      return {
        ...r,
        requestId: BigInt(r.requestId),
        amount: BigInt(r.amount),
        queued: BigInt(r.queued),
        claimable,
      };
    });
  };

export const useWithdrawalRequests = (
  options?: Omit<
    UseQueryOptions<
      WithdrawalRequest[],
      Error,
      WithdrawalRequest[],
      ReturnType<typeof getKey>
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: getKey(address),
    queryFn: fetcher(config, queryClient),
  });
};
useWithdrawalRequests.getKey = getKey;
useWithdrawalRequests.fetcher = fetcher;
