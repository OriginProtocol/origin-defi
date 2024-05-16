import { useMemo, useState } from 'react';

import {
  Box,
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
import { ConnectPage, FiltersButton, HistoryType } from '@origin/defi/shared';
import {
  DownloadCsvButton,
  ExpandIcon,
  TablePagination,
  TransactionIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightFromSquareRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useOethHistory } from '../hooks';
import { useOethHistoryTransactionQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { ExpandedState } from '@tanstack/react-table';

import type { DailyHistory } from '../types';

const filterOptions = [
  {
    label: defineMessage({ defaultMessage: 'Yield' }),
    value: HistoryType.Yield,
  },
  { label: defineMessage({ defaultMessage: 'Sent' }), value: HistoryType.Sent },
  {
    label: defineMessage({ defaultMessage: 'Received' }),
    value: HistoryType.Received,
  },
];

export const OethHistoryCard = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { data, isFetching } = useOethHistory(filters);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Transactions' })}
        action={
          <Stack direction="row" alignItems="center" gap={1}>
            <FiltersButton
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />
            <ExportDataButton />
          </Stack>
        }
      />
      <Divider />
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
        ) : isNilOrEmpty(data) ? (
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
          <HistoryTable filters={filters} />
        )
      ) : (
        <ConnectPage />
      )}
    </Card>
  );
};

function ExportDataButton() {
  const { address, isConnected } = useAccount();
  const { data: txData } = useOethHistoryTransactionQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: isConnected,
      select: (data) => {
        if (!data?.oTokenHistories) {
          return;
        }

        return data.oTokenHistories.reduce(
          (acc, curr) => [
            ...acc,
            [curr.timestamp, curr.type, curr.value, curr.balance, curr.txHash],
          ],
          [['Date', 'Type', 'Amount', 'Balance', 'Transaction Hash']],
        );
      },
    },
  );

  return (
    <DownloadCsvButton
      data={txData}
      filename="oeth_transaction_history.csv"
      variant="outlined"
      color="secondary"
      buttonLabel="CSV"
      disabled={!isConnected || txData?.length === 1}
    />
  );
}

const columnHelper = createColumnHelper<DailyHistory>();

type HistoryTableProps = {
  filters: HistoryType[];
};

function HistoryTable({ filters }: HistoryTableProps) {
  const intl = useIntl();
  const { formatAmount, formatQuantity } = useFormat();
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { data } = useOethHistory(filters);

  const columns = useMemo(
    () => [
      columnHelper.accessor('type', {
        cell: (info) => {
          if (info.row.depth > 0) {
            return (
              <AggregatedTypeCell
                type={info.getValue()}
                timestamp={info.row.original.timestamp}
              />
            );
          }

          return (
            <HistoryTypeCell
              type={info.getValue()}
              timestamp={info.row.original.timestamp}
              sx={{ pl: info.row.depth * 2 }}
            />
          );
        },
        header: intl.formatMessage({ defaultMessage: 'Type' }),
        size: 400,
        enableColumnFilter: true,
        filterFn: (row, _, value) => {
          if (!value.value.length) return true;
          return value.value.includes(row.original.type);
        },
      }),
      columnHelper.accessor('value', {
        cell: (info) => (
          <Typography>
            {formatAmount(BigInt(info.getValue() ?? '0'))}
          </Typography>
        ),
        header: () => (
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Change' })}
          </Typography>
        ),
        size: 50,
      }),
      columnHelper.accessor('balance', {
        cell: (info) => (
          <Typography>
            {formatQuantity(BigInt(info.getValue() ?? '0'))}
          </Typography>
        ),
        header: () => (
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Balance' })}
          </Typography>
        ),
        size: 50,
      }),
      columnHelper.display({
        id: 'link',
        size: 10,
        cell: (info) => {
          if (info.row.getCanExpand()) {
            return (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                }}
              >
                <ExpandIcon
                  sx={{ width: 12 }}
                  isExpanded={info.row.getIsExpanded()}
                />
              </Box>
            );
          }

          return (
            !isNilOrEmpty(info.row.original.txHash) && (
              <IconButton
                href={`https://etherscan.io/tx/${info.row.original.txHash}`}
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
            )
          );
        },
      }),
    ],
    [formatAmount, formatQuantity, intl],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      expanded,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row?.transactions,
    getExpandedRowModel: getExpandedRowModel(),
    autoResetPageIndex: true,
    paginateExpandedRows: false,
  });

  return (
    <Stack>
      <Table sx={{ '& .MuiTableCell-root': { px: { xs: 2, md: 3 } } }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
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

type HistoryTypeCellProps = {
  timestamp: string;
  type: HistoryType;
} & StackProps;

function HistoryTypeCell({ timestamp, type, ...rest }: HistoryTypeCellProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" alignItems="center" gap={1.5}>
      <TransactionIcon type={type} zIndex={1} token={tokens.mainnet.OETH} />
      <Stack>
        <Typography fontWeight="500">{type}</Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatDate(new Date(timestamp))}
        </Typography>
      </Stack>
    </Stack>
  );
}

type AggregatedCellProps = {
  timestamp: string;
  type: HistoryType;
} & StackProps;

function AggregatedTypeCell({ timestamp, type, ...rest }: AggregatedCellProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" alignItems="center" gap={1.5}>
      <Box
        sx={{
          position: 'relative',
          width: { xs: '1.375rem', md: '2rem' },
          height: { xs: '1.375rem', md: '2rem' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-200%',
            left: '50%',
            bottom: '50%',
            width: 2,
            backgroundColor: 'divider',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50%',
            height: 2,
            backgroundColor: 'divider',
            zIndex: 0,
          }}
        />
      </Box>
      <Stack>
        <Typography color="text.secondary" variant="body2">
          {intl.formatDate(new Date(timestamp), {
            hourCycle: 'h23',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Stack>
    </Stack>
  );
}
