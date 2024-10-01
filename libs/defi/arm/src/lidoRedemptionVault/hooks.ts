import { useMemo } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { from } from 'dnum';
import { useSearchParams } from 'react-router-dom';
import { useConfig } from 'wagmi';

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

export const useArmVault = () => {
  const config = useConfig();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useArmVault'],
    queryFn: async () => {
      const res = await Promise.all([]);

      return {
        balance: from(50.23, 18),
        requests: [
          {
            claimable: true,
            amount: 10_000_000_000_000_000n,
            id: '1',
            requestId: 1n,
            timestamp: '1',
            queued: 1n,
            claimed: false,
            blockNumber: 1,
            txHash: '1',
          },
        ],
      };
    },
  });
};
