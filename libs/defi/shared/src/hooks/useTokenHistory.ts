import { useCallback } from 'react';

import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { descend, groupBy, sort } from 'ramda';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { HistoryType } from '../generated/graphql';
import { useOTokenHistoriesQuery } from '../queries';

import type { Token } from '@origin/shared/contracts';
import type { UseQueryOptions } from '@tanstack/react-query';

import type { OTokenHistoriesQuery } from '../queries';

export type History = OTokenHistoriesQuery['oTokenHistories'][number];

export type DailyHistory = History & {
  transactions?: History[];
};

export const useTokenHistory = (
  token: Token,
  filters?: HistoryType[],
  options?: Omit<
    UseQueryOptions<OTokenHistoriesQuery, Error, DailyHistory[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { address, isConnected } = useAccount();

  return useOTokenHistoriesQuery(
    {
      address: address?.toLowerCase() ?? ZERO_ADDRESS,
      chainId: token.chainId,
      token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
      filters: isNilOrEmpty(filters) ? undefined : filters,
    },
    {
      staleTime: 120e3,
      refetchOnWindowFocus: false,
      enabled: isConnected && !!address,
      select: useCallback((data: OTokenHistoriesQuery) => {
        const history = data?.oTokenHistories;

        const grouped = groupBy(
          (hist) =>
            Intl.DateTimeFormat('fr-CA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(hist.timestamp)),
          history ?? [],
        );

        const aggregated = Object.entries(grouped).reduce(
          (acc, [day, values]) => {
            if (!values) {
              return acc;
            }

            if (values.length === 1) {
              return [...acc, ...values];
            }

            const yieldCount =
              values.filter((v) => v.type === HistoryType.Yield)?.length ?? 0;

            if (yieldCount <= 1) {
              return [...acc, ...values];
            }

            const dailyYield = values.reduce(
              (a: DailyHistory, c) => {
                if (c.type === HistoryType.Yield) {
                  a.value = formatUnits(
                    parseUnits(a.value, 18) + parseUnits(c.value, 18),
                    18,
                  );
                  if (
                    +formatUnits(parseUnits(a.balance, 18), 18) <
                    +formatUnits(parseUnits(c.balance, 18), 18)
                  ) {
                    a.balance = c.balance;
                  }
                  a.transactions?.push(c);
                }

                return a;
              },
              {
                type: HistoryType.Yield,
                value: '0',
                txHash: '',
                timestamp: day,
                balance: '0',
                transactions: [],
              },
            );

            return [
              ...acc,
              ...values.filter((v) => v.type !== HistoryType.Yield),
              dailyYield,
            ];
          },
          [] as DailyHistory[],
        );

        return sort(
          descend((h) =>
            Intl.DateTimeFormat('fr-CA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              second: 'numeric',
            }).format(new Date(h.timestamp)),
          ),
          aggregated,
        ) as DailyHistory[];
      }, []),
      ...options,
    },
  );
};
