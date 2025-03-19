import { useMemo } from 'react';

import { useOTokenWithdrawalRequestsQuery } from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import dayjs from 'dayjs';
import { sub } from 'dnum';
import { pathOr } from 'ramda';
import { useSearchParams } from 'react-router';
import { useAccount, useConfig, useReadContracts } from 'wagmi';

import type { HexAddress } from '@origin/shared/utils';
import type {
  QueryClient,
  QueryFunction,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { Config } from '@wagmi/core';
import type { Dnum } from 'dnum';

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
    const [queueData, requests, wSBalance, withdrawalClaimDelay] =
      await Promise.all([
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

    return requests.oTokenWithdrawalRequests.map((r) => {
      const delay = Number(withdrawalClaimDelay);
      const queueDiff = BigInt(queueData?.[1] ?? 0) - BigInt(r?.queued ?? 0);
      const balanceDiff = wSBalance - BigInt(r.amount);
      const timeRemaining = dayjs
        .utc(r.timestamp)
        .add(delay, 'seconds')
        .diff(dayjs.utc(), 'seconds');
      const claimable =
        !r.claimed &&
        queueDiff >= 0n &&
        balanceDiff >= 0n &&
        timeRemaining <= 0;

      return {
        ...r,
        requestId: BigInt(r.requestId),
        amount: BigInt(r.amount),
        queued: BigInt(r.queued),
        claimable,
        timeRemaining,
        delay,
        queueDiff,
        balanceDiff,
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

export const useQueueState = () => {
  return useReadContracts({
    contracts: [
      {
        address: contracts.sonic.osVault.address,
        abi: contracts.sonic.osVault.abi,
        functionName: 'withdrawalQueueMetadata',
        chainId: contracts.sonic.osVault.chainId,
      },
      {
        address: tokens.sonic.wS.address,
        abi: tokens.sonic.wS.abi,
        functionName: 'balanceOf',
        chainId: tokens.sonic.wS.chainId,
        args: [contracts.sonic.osVault.address],
      },
      {
        address: contracts.sonic.osVault.address,
        abi: contracts.sonic.osVault.abi,
        functionName: 'withdrawalClaimDelay',
        chainId: contracts.sonic.osVault.chainId,
      },
    ],
    query: {
      select: (data) => {
        const claimable = [
          pathOr(0n, [0, 'result', 1], data),
          tokens.sonic.OS.decimals,
        ] as Dnum;
        const claimed = [
          pathOr(0n, [0, 'result', 2], data),
          tokens.sonic.OS.decimals,
        ] as Dnum;

        return {
          queued: [
            pathOr(0n, [0, 'result', 0], data),
            tokens.sonic.OS.decimals,
          ] as Dnum,
          claimable,
          claimed,
          pending: sub(claimable, claimed),
          vaultWSBalance: [
            pathOr(0n, [1, 'result'], data),
            tokens.sonic.wS.decimals,
          ] as Dnum,
          secondsDelay: Number(pathOr(0, [2, 'result'], data)),
        };
      },
    },
  });
};
