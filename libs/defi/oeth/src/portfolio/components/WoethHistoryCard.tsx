import { useMemo, useState } from 'react';

import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ConnectPage, FiltersButton } from '@origin/defi/shared';
import {
  DownloadCsvButton,
  TablePagination,
  TransactionIcon,
} from '@origin/shared/components';
import { getTokenByAddress } from '@origin/shared/contracts';
import { FaArrowUpRightFromSquareRegular } from '@origin/shared/icons';
import { getChain, useFormat } from '@origin/shared/providers';
import { isNilOrEmpty, txLink } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { defineMessage, useIntl } from 'react-intl';
import { formatEther } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { useWoethHistory } from '../hooks';

import type { MessageDescriptor } from 'react-intl';

import type { WOETHHistory, WOETHHistoryType } from '../types';

const filterOptions = [
  {
    label: defineMessage({ defaultMessage: 'Bridge' }),
    value: 'Bridge' as WOETHHistoryType,
  },
  {
    label: defineMessage({ defaultMessage: 'Sent' }),
    value: 'Sent' as WOETHHistoryType,
  },
  {
    label: defineMessage({ defaultMessage: 'Received' }),
    value: 'Received' as WOETHHistoryType,
  },
];

export const WoethHistoryCard = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState<WOETHHistoryType[]>([]);
  const { data: rows, isFetching: isRowsFetching } = useWoethHistory(filters);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'wOETH Transactions' })}
        action={
          <Stack direction="row" alignItems="center" gap={1}>
            <FiltersButton
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
              disabled={isRowsFetching || isNilOrEmpty(rows)}
            />
            <ExportDataButton rows={rows} />
          </Stack>
        }
      />
      <Divider />
      {isConnected ? (
        isRowsFetching ? (
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
        ) : isNilOrEmpty(rows) ? (
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
        <ConnectPage sx={{ borderRadius: 0 }} />
      )}
    </Card>
  );
};

type ExportDataButtonProps = {
  rows?: WOETHHistory[];
};

function ExportDataButton({ rows }: ExportDataButtonProps) {
  const { isConnected } = useAccount();

  const txData = (rows ?? []).reduce(
    (acc, curr) => [
      ...acc,
      [
        curr.id,
        curr.chainId,
        curr.blockNumber,
        curr.timestamp,
        curr.address,
        curr.txHash,
        curr.type,
        formatEther(BigInt(curr.change)),
        formatEther(BigInt(curr.balance)),
      ],
    ],
    [
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
    ] as (string | number)[][],
  );

  return (
    <DownloadCsvButton
      data={txData}
      filename="oeth_transaction_history.csv"
      variant="outlined"
      color="secondary"
      buttonLabel="CSV"
      disabled={!isConnected || txData.length === 1}
    />
  );
}

const columnHelper = createColumnHelper<WOETHHistory>();

const typeLabels: Record<WOETHHistoryType, MessageDescriptor> = {
  Sent: defineMessage({ defaultMessage: 'Sent' }),
  Received: defineMessage({ defaultMessage: 'Received' }),
  Bridge: defineMessage({ defaultMessage: 'Bridge' }),
};

type HistoryTableProps = {
  rows?: WOETHHistory[];
};

function HistoryTable({ rows }: HistoryTableProps) {
  const intl = useIntl();
  const config = useConfig();
  const { formatAmount, formatQuantity } = useFormat();

  const columns = useMemo(
    () => [
      columnHelper.accessor('type', {
        cell: (info) => {
          const token = getTokenByAddress(
            info.row.original.address,
            info.row.original.chainId,
          );

          if (!token) return null;

          return (
            <Stack direction="row" alignItems="center" gap={1.5}>
              <TransactionIcon
                type={info.row.original.type}
                token={token}
                sx={{
                  fontSize: { xs: 24, sm: 32 },
                }}
              />
              <Stack spacing={0.5}>
                <Typography fontWeight="medium">
                  {intl.formatMessage(typeLabels[info.row.original.type])}
                </Typography>
                <Typography color="text.secondary" variant="caption1">
                  {intl.formatDate(new Date(info.row.original.timestamp), {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </Typography>
              </Stack>
            </Stack>
          );
        },
        header: intl.formatMessage({ defaultMessage: 'Type' }),
        size: 400,
      }),
      columnHelper.accessor('change', {
        cell: (info) => formatAmount(BigInt(info.row.original.change)),
        header: () => intl.formatMessage({ defaultMessage: 'Change' }),
        size: 50,
      }),
      columnHelper.accessor('balance', {
        cell: (info) => formatQuantity(BigInt(info.getValue() ?? '0')),
        header: () => intl.formatMessage({ defaultMessage: 'Balance' }),
        size: 50,
      }),
      columnHelper.display({
        id: 'link',
        size: 10,
        cell: (info) => {
          if (isNilOrEmpty(info.row.original.txHash)) {
            return null;
          }

          const href = txLink(
            getChain(config, info.row.original.chainId),
            info.row.original.txHash,
          );

          return (
            <IconButton
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                width: 28,
                height: 28,
              }}
            >
              <FaArrowUpRightFromSquareRegular sx={{ fontSize: 12 }} />
            </IconButton>
          );
        },
      }),
    ],
    [config, formatAmount, formatQuantity, intl],
  );

  const table = useReactTable({
    data: rows ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });

  return (
    <Stack>
      <Table sx={{ '& .MuiTableCell-root': { px: { xs: 2, md: 3 } } }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} sx={{ width: header.getSize() }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={row.getToggleExpandedHandler()}
              sx={[
                row.getCanExpand() && {
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: 'primary.faded',
                  },
                },
              ]}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} sx={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack alignItems="center" justifyContent="center">
        <TablePagination
          table={table}
          disableScrollToTop
          buttonsProps={{
            variant: 'outlined',
            color: 'secondary',
          }}
        />
      </Stack>
    </Stack>
  );
}
