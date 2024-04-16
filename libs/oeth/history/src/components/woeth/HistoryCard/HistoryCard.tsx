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
import { indexBy } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

import { useWOETHHistory } from '../../../hooks';
import { FilterButton } from '../../FilterButton';
import { HistoryTable } from './HistoryTable';

import type { HistoryType } from '@origin/oeth/shared';
import type { MessageDescriptor } from 'react-intl';

type FilterOption = 'Sent' | 'Received' | 'Bridge';
const filterOptions: { label: MessageDescriptor; value: FilterOption }[] = [
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
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const { transfersQuery, balancesQuery } = useWOETHHistory();

  const isFetching = transfersQuery.isFetching || balancesQuery.isFetching;
  const isEmpty =
    !transfersQuery.data?.erc20Transfers.length ||
    !balancesQuery.data?.erc20Balances.length;

  const transfers = transfersQuery.data?.erc20Transfers;
  const balances = balancesQuery.data?.erc20Balances;
  const rows = useMemo(() => {
    if (!userAddress || !transfers || !balances) return [];
    const balanceMap = indexBy(
      (b) =>
        `${b.chainId}-${b.blockNumber}-${b.address}-${b.account.toLowerCase()}`,
      balances,
    );

    return transfers
      .map((t) => {
        return {
          id: t.id,
          chainId: t.chainId,
          blockNumber: t.blockNumber,
          timestamp: t.timestamp,
          address: t.address,
          txHash: t.txHash,
          type: (t.from.toLowerCase() === userAddress.toLowerCase()
            ? 'Sent'
            : 'Received') as HistoryType,
          change: t.value,
          balance:
            balanceMap[
              `${t.chainId}-${t.blockNumber}-${t.address}-${userAddress.toLowerCase()}`
            ]?.balance,
        };
      })
      .filter((t) => !filters.length || filters.includes(t.type as any)); // TODO: Fix any type
  }, [userAddress, transfers, balances, filters]);

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
              {intl.formatMessage({ defaultMessage: 'No transaction' })}
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
    type: HistoryType;
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
