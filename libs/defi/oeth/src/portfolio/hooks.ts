import { useCallback, useMemo } from 'react';

import {
  useBalancesQuery,
  useBridgeTransfersQuery,
  useTransfersQuery,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sortBy, uniq } from 'ramda';
import { useSearchParams } from 'react-router';
import { useAccount } from 'wagmi';

import type {
  BalancesQuery,
  BridgeTransfersQuery,
  TransfersQuery,
} from '@origin/defi/shared';

import type { WOETHHistoryType } from './types';

export const useTokenSelect = () => {
  const [search, setSearch] = useSearchParams({
    t: 'oeth',
  });

  return useMemo(
    () => ({
      token: search.get('t') ?? 'oeth',
      update: (newVal: 'oeth' | 'woeth') => {
        setSearch((params) => {
          params.set('t', newVal);
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};

export const useWoethHistory = (filters: WOETHHistoryType[]) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useQuery({
    staleTime: 120e3,
    enabled: !!address,
    queryKey: ['useWoethHistory', address],
    queryFn: async () => {
      const transfersQueryArgs = {
        tokens: [
          tokens.mainnet.wOETH.address.toLowerCase(),
          tokens.arbitrum.wOETH.address.toLowerCase(),
        ],
        account: address?.toLowerCase() ?? ZERO_ADDRESS,
      };
      const bridgeTransferQueryArgs = {
        address: address?.toLowerCase() ?? ZERO_ADDRESS,
        limit: 1000,
      };
      const [transfers, bridgeTransfers] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: useTransfersQuery.getKey(transfersQueryArgs),
          queryFn: useTransfersQuery.fetcher(transfersQueryArgs),
        }),
        queryClient.fetchQuery({
          queryKey: useBridgeTransfersQuery.getKey(bridgeTransferQueryArgs),
          queryFn: useBridgeTransfersQuery.fetcher(bridgeTransferQueryArgs),
        }),
      ]);

      const balanceQueryArgs = {
        ...transfersQueryArgs,
        blocks: uniq([
          ...transfers.erc20Transfers.map((b) => b.blockNumber),
          ...bridgeTransfers.bridgeTransfers.map((b) => b.blockNumber),
        ]),
      };
      const balances = await queryClient.fetchQuery({
        queryKey: useBalancesQuery.getKey(balanceQueryArgs),
        queryFn: useBalancesQuery.fetcher(balanceQueryArgs),
      });

      return {
        bridgeTransfers,
        transfers,
        balances,
      };
    },
    select: useCallback(
      (data: {
        bridgeTransfers: BridgeTransfersQuery;
        transfers: TransfersQuery;
        balances: BalancesQuery;
      }) => {
        if (
          !address ||
          !data.bridgeTransfers?.bridgeTransfers ||
          !data.transfers?.erc20Transfers ||
          !data.balances?.erc20Balances
        ) {
          return [];
        }

        const latestBalanceByChainId = new Map<number, string>();
        const aggregatedBalances = sortBy(
          (b) => b.timestamp,
          data.balances.erc20Balances,
        )
          .map((b) => {
            latestBalanceByChainId.set(b.chainId, b.balance);
            return {
              ...b,
              balance: [...latestBalanceByChainId.values()]
                .reduce((sum, b) => sum + BigInt(b), 0n)
                .toString(),
            };
          })
          .reverse();

        const transferRows = data.transfers.erc20Transfers
          .map((t) => {
            const balance =
              aggregatedBalances.find((ab) => ab.timestamp <= t.timestamp)
                ?.balance ?? '0';
            return {
              id: t.id,
              chainId: t.chainId,
              blockNumber: t.blockNumber,
              timestamp: t.timestamp,
              address: t.address,
              txHash: t.txHash,
              type: (t.from.toLowerCase() === address.toLowerCase()
                ? 'Sent'
                : 'Received') as WOETHHistoryType,
              change: t.value,
              balance,
            };
          })
          .filter((t) => !filters.length || filters.includes(t.type));

        const bridgeRows = data.bridgeTransfers.bridgeTransfers.map((b) => {
          const balance =
            aggregatedBalances.find((ab) => ab.timestamp < b.timestamp)
              ?.balance ?? '0';
          return {
            id: `${b.id}-bridge`,
            chainId: b.chainIn,
            blockNumber: b.blockNumber,
            timestamp: b.timestamp,
            address: b.tokenIn,
            txHash: b.txHashIn,
            type: 'Bridge' as WOETHHistoryType,
            change: b.amountIn,
            balance,
          };
        });

        return sortBy(
          (r) => r.timestamp,
          [...transferRows, ...bridgeRows],
        ).reverse();
      },
      [address, filters],
    ),
  });
};
