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
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightFromSquareRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
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
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';

import { useSuperWoethHistory } from '../hooks';

import type { HistoryType } from '@origin/defi/shared';
import type { MessageDescriptor } from 'react-intl';

import type { WsuperOETHbHistory } from '../types';

const filterOptions = [
  {
    label: defineMessage({ defaultMessage: 'Sent' }),
    value: 'Sent' as HistoryType,
  },
  {
    label: defineMessage({ defaultMessage: 'Received' }),
    value: 'Received' as HistoryType,
  },
];

export const WsuperOethHistoryCard = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { data: rows, isFetching: isRowsFetching } =
    useSuperWoethHistory(filters);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'wsuperOETHb Transactions',
        })}
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
  rows?: WsuperOETHbHistory[];
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
      filename="wsuperoethb_transaction_history.csv"
      variant="outlined"
      color="secondary"
      buttonLabel="CSV"
      disabled={!isConnected || txData.length === 1}
    />
  );
}

const columnHelper = createColumnHelper<WsuperOETHbHistory>();

const typeLabels: Record<HistoryType, MessageDescriptor> = {
  Sent: defineMessage({ defaultMessage: 'Sent' }),
  Received: defineMessage({ defaultMessage: 'Received' }),
  Yield: defineMessage({ defaultMessage: 'Yield' }),
};

type HistoryTableProps = {
  rows?: WsuperOETHbHistory[];
};

function HistoryTable({ rows }: HistoryTableProps) {
  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();

  const columns = useMemo(
    () => [
      columnHelper.accessor('type', {
        cell: (info) => {
          return (
            <Stack direction="row" alignItems="center" gap={1.5}>
              <TransactionIcon
                type={info.row.original.type}
                token={tokens.base.wsuperOETHb}
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
        header: () => intl.formatMessage({ defaultMessage: 'Value' }),
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

          const href = txLink(base, info.row.original.txHash);

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
    [formatAmount, formatQuantity, intl],
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
              sx={{
                ...(row.getCanExpand() && {
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: 'primary.faded',
                  },
                }),
              }}
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
