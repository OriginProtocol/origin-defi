import { useCallback, useMemo } from 'react';

import { useTransfersQuery } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { sortBy } from 'ramda';
import { useSearchParams } from 'react-router';
import { useAccount } from 'wagmi';

import type { HistoryType, TransfersQuery } from '@origin/defi/shared';

import type { WsuperOETHbHistory } from './types';

export const useTokenSelect = () => {
  const [search, setSearch] = useSearchParams({
    t: tokens.base.superOETHb.symbol,
  });

  return useMemo(
    () => ({
      symbol: search.get('t') ?? tokens.base.superOETHb.symbol,
      update: (newVal: 'superOETHb' | 'wsuperOETHb') => {
        setSearch((params) => {
          params.set('t', newVal);
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};

export const useSuperWoethHistory = (filters: HistoryType[]) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useQuery({
    staleTime: 120e3,
    enabled: !!address,
    queryKey: ['useWoethHistory', address],
    queryFn: async () => {
      const transfersQueryArgs = {
        tokens: [tokens.base.wsuperOETHb.address.toLowerCase()],
        account: address?.toLowerCase() ?? ZERO_ADDRESS,
      };

      const [transfers] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: useTransfersQuery.getKey(transfersQueryArgs),
          queryFn: useTransfersQuery.fetcher(transfersQueryArgs),
        }),
      ]);

      return {
        transfers,
      };
    },
    select: useCallback(
      (data: { transfers: TransfersQuery }) => {
        if (!address || !data.transfers?.erc20Transfers) {
          return [];
        }

        const transferRows = data.transfers.erc20Transfers
          .map((t) => {
            return {
              id: t.id,
              chainId: t.chainId,
              blockNumber: t.blockNumber,
              timestamp: t.timestamp,
              address: t.address,
              txHash: t.txHash,
              type: (t.from.toLowerCase() === address.toLowerCase()
                ? 'Sent'
                : 'Received') as HistoryType,
              change: t.value,
              balance:
                t.from.toLowerCase() === address.toLowerCase()
                  ? t.fromBalance
                  : t.toBalance,
            };
          })
          .filter((t) => !filters.length || filters.includes(t.type));

        return sortBy(
          (r) => r.timestamp,
          transferRows,
        ).reverse() as WsuperOETHbHistory[];
      },
      [address, filters],
    ),
  });
};
