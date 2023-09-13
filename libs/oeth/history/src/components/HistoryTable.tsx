import { useMemo } from 'react';

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { LinkIcon } from '@origin/shared/components';
import { quantityFormat } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';

import { HistoryFilterButton } from './HistoryButton';
import { HistoryCell } from './HistoryCell';

import type { HistoryTableQuery } from '../queries.generated';

export type Rows = HistoryTableQuery['addressById']['history'];

interface Props {
  rows: Rows;
  isLoading: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  page: number;
  setPage: (page: number) => void;
}

const columnHelper = createColumnHelper<Rows[0]>();

export function HistoryTable({
  rows,
  hasNextPage,
  hasPreviousPage,
  page,
  setPage,
}: Props) {
  const intl = useIntl();
  const columns = useMemo(
    () => [
      columnHelper.accessor('type', {
        cell: (info) => (
          <HistoryCell
            // @ts-expect-error type-mismatch
            type={info.getValue()}
            timestamp={info.row.original.timestamp}
            transactionHash={info.row.original.txHash}
          />
        ),
        header: intl.formatMessage({ defaultMessage: 'Type' }),
        enableColumnFilter: true,
        filterFn: (row, _, value) => {
          if (!value.value.length) return true;
          return value.value.includes(row.original.type);
        },
      }),
      columnHelper.accessor('value', {
        cell: (info) => intl.formatNumber(info.getValue(), quantityFormat),
        header: intl.formatMessage({ defaultMessage: 'Change' }),
      }),
      columnHelper.accessor('balance', {
        cell: (info) => (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            sx={{ textAlign: 'right' }}
          >
            <Box
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '75%',
              }}
              component="span"
            >
              {intl.formatNumber(info.getValue(), quantityFormat)}
            </Box>

            <LinkIcon
              url={`https://etherscan.io/tx/${info.row.original.txHash}`}
              sx={{ transform: 'translateY(6.5%)' }}
            />
          </Stack>
        ),
        header: intl.formatMessage({ defaultMessage: 'Balance' }),
      }),
    ],
    [intl],
  );

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // add when we do server side pagination
    // manualPagination: true,
    // add when we do server side pagination
    // onPaginationChange: setPagination
  });

  return (
    <Stack gap={2}>
      <Table
        sx={{ '& .MuiTableCell-root': { paddingInline: { xs: 2, md: 3 } } }}
      >
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
                  sx={{ paddingBlock: 3 }}
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
              sx={{
                '& > *:first-of-type': {
                  width: '50%',
                },
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  align="left"
                  sx={{
                    ...(cell.column.columnDef.id === 'type'
                      ? { '&:first-letter': { textTransform: 'uppercase' } }
                      : {}),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        justifyContent="flex-end"
        gap={1}
        sx={{ paddingInline: 2 }}
      >
        <HistoryFilterButton
          disabled={!hasPreviousPage}
          onClick={() => setPage(page - 1)}
        >
          {intl.formatMessage({ defaultMessage: 'Previous' })}
        </HistoryFilterButton>
        <HistoryFilterButton
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          {intl.formatMessage({ defaultMessage: 'Next' })}
        </HistoryFilterButton>
      </Stack>
    </Stack>
  );
}
