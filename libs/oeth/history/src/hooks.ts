import { HistoryType } from '@origin/oeth/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { descend, groupBy, sort } from 'ramda';
import { formatEther, formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useHistoryTransactionQuery } from './queries.generated';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions, UseQueryOptions } from '@tanstack/react-query';

import type { HistoryTransactionQuery } from './queries.generated';
import type { DailyHistory } from './types';

export const usePendingYield = (
  isWrapped = false,
  options?: QueryOptions<
    number,
    Error,
    number,
    ['usePendingYield', boolean, HexAddress, boolean]
  >,
) => {
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ['usePendingYield', isWrapped, address, isConnected],
    queryFn: async () => {
      if (!isConnected) {
        return 0;
      }

      const [
        totalValue,
        totalSupply,
        availableFunds,
        nonRebasingSupply,
        balance,
      ] = (
        await readContracts({
          contracts: [
            {
              address: contracts.mainnet.OETHVault.address,
              abi: contracts.mainnet.OETHVault.abi,
              functionName: 'totalValue',
            },
            {
              address: tokens.mainnet.OETH.address,
              abi: tokens.mainnet.OETH.abi,
              functionName: 'totalSupply',
            },
            {
              address: contracts.mainnet.OETHDripper.address,
              abi: contracts.mainnet.OETHDripper.abi,
              functionName: 'availableFunds',
            },
            {
              address: tokens.mainnet.OETH.address,
              abi: tokens.mainnet.OETH.abi,
              functionName: 'nonRebasingSupply',
            },
            {
              address: tokens.mainnet.OETH.address,
              abi: tokens.mainnet.OETH.abi,
              functionName: 'balanceOf',
              args: [address],
            },
          ],
        })
      ).map((res) => (res.status === 'success' ? +formatEther(res.result) : 0));

      const vaultYield = totalValue - totalSupply;
      const expectedYield = vaultYield + availableFunds;
      const rebasingSupply = totalSupply - nonRebasingSupply;
      const expectedYieldPerOeth = expectedYield / rebasingSupply;
      const expectedYieldPerOethWithFee = expectedYieldPerOeth * 0.8;

      return balance * expectedYieldPerOethWithFee;
    },
    ...options,
  });
};

export const useAggregatedHistory = (
  filters?: HistoryType[],
  options?: UseQueryOptions<HistoryTransactionQuery, Error, DailyHistory[]>,
) => {
  const { address, isConnected } = useAccount();

  return useHistoryTransactionQuery(
    {
      address,
      filters: isNilOrEmpty(filters) ? undefined : filters,
    },
    {
      ...options,
      enabled: isConnected,
      placeholderData: { oethAddresses: [{ history: [] }] },
      select: (data) => {
        const history = data?.oethAddresses?.at(0)?.history;

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
            if (isNilOrEmpty(values)) {
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
                  a.transactions = [...a.transactions, c];
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
          [],
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
      },
    },
  );
};
