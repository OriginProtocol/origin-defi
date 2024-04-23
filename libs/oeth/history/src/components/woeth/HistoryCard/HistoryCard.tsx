import { useMemo, useState } from 'react';

import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { DownloadCsvButton } from '@origin/shared/components';
import { ConnectedButton } from '@origin/shared/providers';
import { sortBy } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

import { useWOETHHistory } from '../../../hooks';
import { FilterButton } from '../../FilterButton';
import { HistoryTable } from './HistoryTable';

import type { MessageDescriptor } from 'react-intl';

import type { WOETHHistoryType } from './types';

const filterOptions: { label: MessageDescriptor; value: WOETHHistoryType }[] = [
  {
    label: defineMessage({ defaultMessage: 'Bridge' }),
    value: 'Bridge',
  },
  { label: defineMessage({ defaultMessage: 'Sent' }), value: 'Sent' },
  {
    label: defineMessage({ defaultMessage: 'Received' }),
    value: 'Received',
  },
];

export function HistoryCard() {
  const intl = useIntl();
  const { address: userAddress, isConnected } = useAccount();
  const [filters, setFilters] = useState<WOETHHistoryType[]>([]);
  const woethHistory = useWOETHHistory();

  const isFetching = woethHistory.isFetching;
  const bridges = woethHistory.data?.bridgeTransfers;
  const transfers = woethHistory.data?.erc20Transfers;
  const balances = woethHistory.data?.erc20Balances;

  const rows = useMemo(() => {
    if (!userAddress || !bridges || !transfers || !balances) return [];
    const latestBalanceByChainId = new Map<number, string>();
    const aggregatedBalances = sortBy((b) => b.timestamp, balances)
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

    const transferRows = transfers
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
          type: (t.from.toLowerCase() === userAddress.toLowerCase()
            ? 'Sent'
            : 'Received') as WOETHHistoryType,
          change: t.value,
          balance,
        };
      })
      .filter((t) => !filters.length || filters.includes(t.type));

    const bridgeRows = bridges.map((b) => {
      const balance =
        aggregatedBalances.find((ab) => ab.timestamp < b.timestamp)?.balance ??
        '0';
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
  }, [userAddress, bridges, transfers, balances, filters]);

  const isEmpty = !rows.length;

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'wOETH Transactions' })}
        action={
          <Stack direction="row" gap={1}>
            <FilterButton
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />
            <ExportData rows={rows} />
          </Stack>
        }
      />
      {isConnected ? (
        isFetching ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        ) : isEmpty ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <Typography>
              {filters.length > 0
                ? intl.formatMessage({
                    defaultMessage: 'No transactions matching filter',
                  })
                : intl.formatMessage({ defaultMessage: 'No transaction' })}
            </Typography>
          </Stack>
        ) : (
          <HistoryTable rows={rows} />
        )
      ) : (
        <Stack
          sx={{
            height: '15rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your history',
            })}
          </Typography>
          <ConnectedButton />
        </Stack>
      )}
    </Card>
  );
}

function ExportData({
  rows,
}: {
  rows: {
    id: string;
    chainId: number;
    blockNumber: number;
    timestamp: string;
    address: string;
    txHash: string;
    type: WOETHHistoryType;
    change: string;
    balance: string;
  }[];
}) {
  const intl = useIntl();

  const data = [
    [
      'id',
      'chainId',
      'blockNumber',
      'timestamp',
      'address',
      'txHash',
      'type',
      'change',
      'balance',
    ],
    ...rows.map((r) => [
      r.id,
      r.chainId,
      r.blockNumber,
      r.timestamp,
      r.address,
      r.txHash,
      r.type,
      formatEther(BigInt(r.change)),
      formatEther(BigInt(r.balance)),
    ]),
  ];

  return (
    <DownloadCsvButton
      data={data}
      buttonLabel={intl.formatMessage({ defaultMessage: 'CSV' })}
      filename="woeth_transaction_history.csv"
    />
  );
}
