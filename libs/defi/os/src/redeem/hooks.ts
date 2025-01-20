import { useMemo } from 'react';

import { useOTokenWithdrawalRequestsQuery } from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { addSeconds, isAfter } from 'date-fns';
import { useSearchParams } from 'react-router';
import { useAccount, useConfig } from 'wagmi';

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
  'useOsClaimableRequests',
  address,
];

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<WithdrawalRequest[]> =
  (config, queryClient) =>
  async ({ queryKey: [, address] }) => {
    const res = await Promise.all([
      readContract(config, {
        address: contracts.sonic.osVault.address,
        abi: contracts.sonic.osVault.abi,
        functionName: 'withdrawalQueueMetadata',
        chainId: contracts.sonic.osVault.chainId,
      }),
      queryClient.fetchQuery({
        queryKey: useOTokenWithdrawalRequestsQuery.getKey({
          token: tokens.sonic.OS.address.toLowerCase(),
          chainId: tokens.sonic.OS.chainId,
          withdrawer: (address as string)?.toLowerCase() ?? ZERO_ADDRESS,
        }),
        queryFn: useOTokenWithdrawalRequestsQuery.fetcher({
          token: tokens.sonic.OS.address.toLowerCase(),
          chainId: tokens.sonic.OS.chainId,
          withdrawer: (address as string)?.toLowerCase() ?? ZERO_ADDRESS,
        }),
      }),
      readContract(config, {
        address: tokens.sonic.wS.address,
        abi: tokens.sonic.wS.abi,
        functionName: 'balanceOf',
        chainId: tokens.sonic.wS.chainId,
        args: [contracts.sonic.osVault.address],
      }),
      readContract(config, {
        address: contracts.sonic.osVault.address,
        abi: contracts.sonic.osVault.abi,
        functionName: 'withdrawalClaimDelay',
        chainId: contracts.sonic.osVault.chainId,
      }),
    ]);
    const queueData = res[0];
    const requests = res[1]?.oTokenWithdrawalRequests?.length
      ? res[1].oTokenWithdrawalRequests
      : [];
    const wethBalance = res[2] ?? 0n;
    const delay = res[3] ?? 0;

    return requests.map((r) => {
      const claimable =
        !r.claimed &&
        wethBalance + BigInt(queueData?.[1] ?? 0) - BigInt(r?.queued ?? 0) >
          0n &&
        wethBalance >= BigInt(r.amount) &&
        isAfter(new Date(), addSeconds(new Date(r.timestamp), Number(delay)));

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
