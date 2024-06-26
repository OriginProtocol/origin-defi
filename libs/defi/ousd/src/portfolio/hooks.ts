import { useCallback } from 'react';

import { useOTokenHistoriesQuery } from '@origin/defi/shared';
import { HistoryType } from '@origin/ousd/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { descend, groupBy, sort } from 'ramda';
import { formatEther, formatUnits, parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import type { OTokenHistoriesQuery } from '@origin/defi/shared';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions, UseQueryOptions } from '@tanstack/react-query';

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
  const config = useConfig();
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: [
      'usePendingYield',
      isWrapped,
      address ?? ZERO_ADDRESS,
      isConnected,
    ],
    queryFn: async () => {
      if (!isConnected || !address) {
        return 0;
      }

      const [
        totalValue,
        totalSupply,
        availableFunds,
        nonRebasingSupply,
        balance,
      ] = (
        await readContracts(config, {
          contracts: [
            {
              address: contracts.mainnet.OUSDVault.address,
              abi: contracts.mainnet.OUSDVault.abi,
              functionName: 'totalValue',
            },
            {
              address: tokens.mainnet.OUSD.address,
              abi: tokens.mainnet.OUSD.abi,
              functionName: 'totalSupply',
            },
            {
              address: contracts.mainnet.OUSDDripper.address,
              abi: contracts.mainnet.OUSDDripper.abi,
              functionName: 'availableFunds',
            },
            {
              address: tokens.mainnet.OUSD.address,
              abi: tokens.mainnet.OUSD.abi,
              functionName: 'nonRebasingSupply',
            },
            {
              address: tokens.mainnet.OUSD.address,
              abi: tokens.mainnet.OUSD.abi,
              functionName: 'balanceOf',
              args: [address],
            },
          ],
        })
      ).map((res) => (res.status === 'success' ? +formatEther(res.result) : 0));

      const vaultYield = totalValue - totalSupply;
      const expectedYield = vaultYield + availableFunds;
      const rebasingSupply = totalSupply - nonRebasingSupply;
      const expectedYieldPerOusd = expectedYield / rebasingSupply;
      const expectedYieldPerOusdWithFee = expectedYieldPerOusd * 0.8;

      return balance * expectedYieldPerOusdWithFee;
    },
    ...options,
  });
};

export const useOusdHistory = (
  filters?: HistoryType[],
  options?: Omit<
    UseQueryOptions<OTokenHistoriesQuery, Error, DailyHistory[]>,
    'select'
  >,
) => {
  const { address, isConnected } = useAccount();

  return useOTokenHistoriesQuery(
    {
      address: address ?? ZERO_ADDRESS,
      filters: isNilOrEmpty(filters) ? undefined : filters,
      token: tokens.mainnet.OUSD.address,
      chainId: tokens.mainnet.OUSD.chainId,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 120e3,
      ...options,
      enabled: isConnected && !isNilOrEmpty(address),
      placeholderData: { oTokenHistories: [] },
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
    },
  );
};
