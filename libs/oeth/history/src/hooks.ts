import { queryClient } from '@origin/oeth/shared';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { fetchBalance, getAccount } from '@wagmi/core';

import { useHistoryTableQuery } from './queries.generated';

import type { Token } from '@origin/shared/contracts';
import type { QueryOptions } from '@tanstack/react-query';

import type { HistoryTableQuery } from './queries.generated';

export const usePendingYield = (token: Token, options?: QueryOptions) =>
  useQuery({
    queryKey: ['usePendingYield', token.symbol],
    queryFn: async () => {
      const { address, isConnected } = getAccount();

      if (!isConnected) {
        return 0;
      }

      // TODO endpoint for next userCredits is not yet available on subsquid
      const [balance, data] = await Promise.all([
        fetchBalance({ address, token: token.address }),
        queryClient.fetchQuery<HistoryTableQuery>({
          queryKey: useHistoryTableQuery.getKey({ address, offset: 0 }),
          queryFn: useHistoryTableQuery.fetcher({
            address: address.toLowerCase(),
            offset: 0,
          }),
        }),
      ]);

      if (isNilOrEmpty(data?.addressById) || balance?.value === 0n) return 0;

      return 0;
    },
  });
