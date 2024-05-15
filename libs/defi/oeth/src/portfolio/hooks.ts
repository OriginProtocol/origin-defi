import { useCallback, useMemo } from 'react';

import {
  HistoryType,
  useBalancesQuery,
  useBridgeTransfersQuery,
  useTransfersQuery,
} from '@origin/defi/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { descend, groupBy, sort, sortBy, uniq } from 'ramda';
import { useSearchParams } from 'react-router-dom';
import { formatEther, formatUnits, parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useOethHistoryTransactionQuery } from './queries.generated';

import type {
  BalancesQuery,
  BridgeTransfersQuery,
  TransfersQuery,
} from '@origin/defi/shared';
import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type { OethHistoryTransactionQuery } from './queries.generated';
import type { DailyHistory, WOETHHistoryType } from './types';

export const useTokenSelect = () => {
  const [search, setSearch] = useSearchParams({
    t: 'oeth',
  });

  return useMemo(
    () => ({
      token: search.get('t') ?? 'oeth',
      update: (newVal: string) => {
        setSearch((params) => {
          params.set('t', newVal.toString());
          return params;
        });
      },
    }),
    [search, setSearch],
  );
};

export const usePendingYield = (
  options?: QueryOptions<
    number,
    Error,
    number,
    ['usePendingYield', HexAddress | undefined, boolean, Config]
  >,
) => {
  const config = useConfig();
  const { address, isConnected } = useAccount();

  return useQuery({
    queryKey: ['usePendingYield', address, isConnected, config],
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
      ).map((res) =>
        res.status === 'success'
          ? +formatEther(res?.result as unknown as bigint)
          : 0,
      );

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

export const useOethHistory = (
  filters?: HistoryType[],
  options?: UseQueryOptions<OethHistoryTransactionQuery, Error, DailyHistory[]>,
) => {
  const { address, isConnected } = useAccount();

  return useOethHistoryTransactionQuery(
    {
      address: address ?? ZERO_ADDRESS,
      filters: isNilOrEmpty(filters) ? undefined : filters,
    },
    {
      refetchOnWindowFocus: false,
      ...options,
      enabled: isConnected && !!address,
      placeholderData: { oTokenHistories: [] },
      select: useCallback((data: OethHistoryTransactionQuery) => {
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

export const useWoethHistory = (filters: WOETHHistoryType[]) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useQuery({
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
