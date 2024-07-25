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
import type { UseQueryOptions } from '@tanstack/react-query';

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

export const useWithdrawalRequests = (
  options?: Omit<
    UseQueryOptions<
      WithdrawalRequest[],
      Error,
      WithdrawalRequest[],
      ['useClaimableRequests', HexAddress | undefined]
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryKey: ['useClaimableRequests', address],
    queryFn: async () => {
      const res = await Promise.allSettled([
        readContract(config, {
          address: contracts.mainnet.OETHVault.address,
          abi: contracts.mainnet.OETHVault.abi,
          functionName: 'withdrawalQueueMetadata',
          chainId: contracts.mainnet.OETHVault.chainId,
        }),
        queryClient.fetchQuery({
          queryKey: useWithdrawalRequestsQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
          queryFn: useWithdrawalRequestsQuery.fetcher({
            address: address ?? ZERO_ADDRESS,
          }),
        }),
      ]);
      const queueData = isFulfilled(res[0]) ? res[0].value : null;
      const requests = isFulfilled(res[1])
        ? (res[1].value?.oethWithdrawalRequests ?? [])
        : [];
      console.log(queueData);
      return requests.map((r) => {
        console.log(
          r.queued,
          queueData?.claimable,
          BigInt(r.queued) <= BigInt(queueData?.claimable ?? 0),
        );
        const claimable =
          !r.claimed &&
          BigInt(r.queued) <= BigInt(queueData?.claimable ?? 0) &&
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
    },
  });
};
