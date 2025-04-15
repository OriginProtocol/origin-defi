import { useMemo } from 'react';

import { useOTokenWithdrawalRequestsQuery } from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { isFulfilled, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { addSeconds, isAfter } from 'date-fns';
import { useSearchParams } from 'react-router';
import { erc20Abi } from 'viem';
import { base, plumeMainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import type { Contract, Token } from '@origin/shared/contracts';
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

export const useSuperOethConfig = () => {
  const { chainId } = useAccount();

  return useMemo(() => {
    const token =
      {
        [base.id]: tokens.base.superOETHb,
        [plumeMainnet.id]: tokens.plume.superOETHp,
      }[chainId ?? base.id] ?? tokens.base.superOETHb;
    const vault =
      {
        [base.id]: contracts.base.superOETHbVault,
        [plumeMainnet.id]: contracts.plume.superOETHpVault,
      }[chainId ?? base.id] ?? contracts.base.superOETHbVault;
    const weth =
      {
        [base.id]: tokens.base.WETH,
        [plumeMainnet.id]: tokens.plume.WETH,
      }[chainId ?? base.id] ?? tokens.base.WETH;

    return { token, vault, weth };
  }, [chainId]);
};

type Key = [
  'useSuperOethbClaimableRequests',
  HexAddress | undefined,
  Token,
  Contract,
  Token,
];

const getKey = (
  address: HexAddress | undefined,
  token: Token,
  vault: Contract,
  weth: Token,
): Key =>
  ['useSuperOethbClaimableRequests', address, token, vault, weth] as const;

const fetcher: (
  config: Config,
  queryClient: QueryClient,
) => QueryFunction<WithdrawalRequest[], Key> =
  (config, queryClient) =>
  async ({ queryKey: [, address, token, vault, weth] }) => {
    const res = await Promise.allSettled([
      readContract(config, {
        address: vault.address,
        abi: contracts.base.superOETHbVault.abi,
        functionName: 'withdrawalQueueMetadata',
        chainId: vault.chainId,
      }),
      queryClient.fetchQuery({
        queryKey: useOTokenWithdrawalRequestsQuery.getKey({
          token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
          chainId: token.chainId,
          withdrawer: (address as string)?.toLowerCase() ?? ZERO_ADDRESS,
        }),
        queryFn: useOTokenWithdrawalRequestsQuery.fetcher({
          token: token?.address?.toLowerCase() ?? ZERO_ADDRESS,
          chainId: token.chainId,
          withdrawer: (address as string)?.toLowerCase() ?? ZERO_ADDRESS,
        }),
      }),
      readContract(config, {
        address: weth.address ?? ZERO_ADDRESS,
        abi: erc20Abi,
        functionName: 'balanceOf',
        chainId: weth.chainId,
        args: [vault.address],
      }),
      readContract(config, {
        address: vault.address,
        abi: vault.abi,
        functionName: 'withdrawalClaimDelay',
        chainId: vault.chainId,
      }),
    ]);
    const queueData = isFulfilled(res[0]) ? res[0].value : null;
    const requests = isFulfilled(res[1])
      ? (res[1].value?.oTokenWithdrawalRequests ?? [])
      : [];
    const wethBalance = isFulfilled(res[2]) ? res[2].value : 0n;
    const delay = isFulfilled(res[3]) ? res[3].value : 0;

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
  const { token, vault, weth } = useSuperOethConfig();

  return useQuery({
    ...options,
    queryKey: getKey(address, token, vault, weth),
    queryFn: fetcher(config, queryClient),
  });
};
useWithdrawalRequests.getKey = getKey;
useWithdrawalRequests.fetcher = fetcher;
