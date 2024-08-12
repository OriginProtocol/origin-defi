import { useMemo } from 'react';

import { contracts } from '@origin/shared/contracts';
import { isFulfilled, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { addMinutes, isAfter } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useAccount, useConfig } from 'wagmi';

import { WITHDRAW_DELAY } from './constants';
import { useWithdrawalRequestsQuery } from './queries.generated';

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
        queryKey: useWithdrawalRequestsQuery.getKey({
          address: (address as string) ?? ZERO_ADDRESS,
        }),
        queryFn: useWithdrawalRequestsQuery.fetcher({
          address: (address as string) ?? ZERO_ADDRESS,
        }),
      }),
    ]);
    const queueData = isFulfilled(res[0]) ? res[0].value : null;
    const requests = isFulfilled(res[1])
      ? (res[1].value?.oethWithdrawalRequests ?? [])
      : [];
    return requests.map((r) => {
      const claimable =
        !r.claimed &&
        BigInt(r.queued) <= BigInt(queueData?.[1] ?? 0) &&
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
