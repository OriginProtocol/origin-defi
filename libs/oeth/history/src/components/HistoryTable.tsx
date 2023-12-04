import { useMemo, useState } from 'react';

import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ExpandIcon,
  TablePagination,
  TransactionIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';

import { useAggregatedHistory } from '../hooks';

import type { StackProps } from '@mui/material';
import type { HistoryType } from '@origin/oeth/shared';
import type { ExpandedState } from '@tanstack/react-table';

import type { DailyHistory } from '../types';

const columnHelper = createColumnHelper<DailyHistory>();

export type HistoryTableProps = {
  filters: HistoryType[];
};

export function HistoryTable({ filters }: HistoryTableProps) {
  const intl = useIntl();
  const { formatAmount, formatQuantity } = useFormat();
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { data } = useAggregatedHistory(filters);

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
        enableColumnFilter: true,
        filterFn: (row, _, value) => {
          if (!value.value.length) return true;
          return value.value.includes(row.original.type);
        },
      }),
      columnHelper.accessor('value', {
        cell: (info) => (
          <Typography textAlign="end">
            {formatAmount(BigInt(info.getValue() ?? '0'))}
          </Typography>
        ),
        header: () => (
          <Typography textAlign="end">
            {intl.formatMessage({ defaultMessage: 'Change' })}
          </Typography>
        ),
      }),
      columnHelper.accessor('balance', {
        cell: (info) => (
          <Typography textAlign="end">
            {formatQuantity(BigInt(info.getValue() ?? '0'))}
          </Typography>
        ),
        header: () => (
          <Typography textAlign="end">
            {intl.formatMessage({ defaultMessage: 'Balance' })}
          </Typography>
        ),
      }),
      columnHelper.display({
        id: 'link',
        cell: (info) => {
          if (info.row.getCanExpand()) {
            return (
              <ExpandIcon
                sx={{ width: 12, color: (theme) => theme.palette.primary.main }}
                isExpanded={info.row.getIsExpanded()}
              />
            );
          }

          return (
            !isNilOrEmpty(info.row.original.txHash) && (
              <Link
                href={`https://etherscan.io/tx/${info.row.original.txHash}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <Box
                  component="img"
                  src="/images/icons/arrow-up-right-from-square.svg"
                  alt="link"
                  sx={{ height: 12, width: 12 }}
                />
              </Link>
            )
          );
        },
      }),
    ],
    [formatAmount, formatQuantity, intl],
  );

  const table = useReactTable({
    data,
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
            <TableRow
              key={headerGroup.id}
              sx={{
                '& > *:first-of-type': {
                  width: '50%',
                },
              }}
            >
              {headerGroup.headers.map((header, index) => (
                <TableCell
                  key={header.id}
                  sx={{ py: 3 }}
                  align={index > 0 ? 'center' : 'left'}
                >
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
                    backgroundColor: 'grey.900',
                  },
                }),
                ...(row.depth > 0 && {
                  borderTopStyle: 'hidden',
                }),
                '& > *:first-of-type': {
                  width: '50%',
                },
                '& > *:last-of-type': {
                  pl: 0,
                  textAlign: 'end',
                },
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination table={table} />
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
      <TransactionIcon
        type={type}
        zIndex={1}
        tokenIcon={tokens.mainnet.OETH.icon}
      />
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
            top: '-150%',
            left: '50%',
            bottom: '50%',
            width: 2,
            backgroundColor: 'grey.800',
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
            backgroundColor: 'grey.800',
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
