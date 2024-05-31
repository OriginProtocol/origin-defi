import { useCallback } from 'react';

import { useBridgeTransfersQuery } from '@origin/oeth/ccip';
import { HistoryType } from '@origin/oeth/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { descend, groupBy, sort, uniq } from 'ramda';
import { formatEther, formatUnits, parseUnits } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import {
  useBalancesQuery,
  useHistoryTransactionQuery,
  useTransfersQuery,
} from './queries.generated';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryOptions, UseQueryOptions } from '@tanstack/react-query';
import type { Config } from '@wagmi/core';

import type { HistoryTransactionQuery } from './queries.generated';
import type { DailyHistory } from './types';

export const usePendingYield = (
  isWrapped = false,
  options?: QueryOptions<
    number,
    Error,
    number,
    ['usePendingYield', boolean, HexAddress, boolean, Config]
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
      config,
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
              address: contracts.mainnet.OETHVault.address,
              abi: contracts.mainnet.OETHVault.abi,
              chainId: contracts.mainnet.OETHVault.chainId,
              functionName: 'totalValue',
            },
            {
              address: tokens.mainnet.OETH.address,
              abi: tokens.mainnet.OETH.abi,
              chainId: tokens.mainnet.OETH.chainId,
              functionName: 'totalSupply',
            },
            {
              address: contracts.mainnet.OETHDripper.address,
              abi: contracts.mainnet.OETHDripper.abi,
              chainId: contracts.mainnet.OETHDripper.chainId,
              functionName: 'availableFunds',
            },
            {
              address: tokens.mainnet.OETH.address,
              abi: tokens.mainnet.OETH.abi,
              chainId: tokens.mainnet.OETH.chainId,
              functionName: 'nonRebasingSupply',
            },
            {
              address: tokens.mainnet.OETH.address,
              abi: tokens.mainnet.OETH.abi,
              chainId: tokens.mainnet.OETH.chainId,
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

export const useAggregatedHistory = (
  filters?: HistoryType[],
  options?: UseQueryOptions<HistoryTransactionQuery, Error, DailyHistory[]>,
) => {
  const { address, isConnected } = useAccount();

  return useHistoryTransactionQuery(
    {
      address: address ?? ZERO_ADDRESS,
      filters: isNilOrEmpty(filters) ? undefined : filters,
    },
    {
      refetchOnWindowFocus: false,
      ...options,
      enabled: isConnected && !!address,
      placeholderData: { oTokenHistories: [] },
      select: useCallback((data: HistoryTransactionQuery) => {
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

export const useWOETHHistory = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['useWOETHHistory', address],
    queryFn: async () => {
      if (!address) {
        return undefined;
      }

      const transfersQueryFilter = {
        tokens: [
          tokens.mainnet.wOETH.address.toLowerCase(),
          tokens.arbitrum.wOETH.address.toLowerCase(),
        ],
        account: address?.toLowerCase() as HexAddress,
      };
      const bridgeTransferQueryFilter = {
        address: address?.toLowerCase() as HexAddress,
        limit: 1000,
      };

      const [transfersQuery, bridgeQuery] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: useTransfersQuery.getKey(transfersQueryFilter),
          queryFn: useTransfersQuery.fetcher(transfersQueryFilter),
        }),
        queryClient.fetchQuery({
          queryKey: useBridgeTransfersQuery.getKey(bridgeTransferQueryFilter),
          queryFn: useBridgeTransfersQuery.fetcher(bridgeTransferQueryFilter),
        }),
      ]);

      const balanceQueryFilter = {
        ...transfersQueryFilter,
        blocks: uniq([
          ...transfersQuery.erc20Transfers.map((b) => b.blockNumber),
          ...bridgeQuery.bridgeTransfers.map((b) => b.blockNumber),
        ]),
      };
      const balancesQuery = await queryClient.fetchQuery({
        queryKey: useBalancesQuery.getKey(balanceQueryFilter),
        queryFn: useBalancesQuery.fetcher(balanceQueryFilter),
      });
      return {
        bridgeTransfers: bridgeQuery.bridgeTransfers,
        erc20Transfers: transfersQuery.erc20Transfers,
        erc20Balances: balancesQuery.erc20Balances,
      };
    },
  });
};
