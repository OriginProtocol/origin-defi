import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { LinkIcon, quantityFormat } from '@origin/shared/components';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';

import type { ColumnFilter, ColumnFiltersState } from '@tanstack/react-table';

type Filter = 'swap' | 'yield' | 'received' | 'sent';

export interface HistoryRow {
  date: Date;
  type: Filter;
  change: number;
  balance: number;
  link: string;
}

interface Props {
  rows: HistoryRow[];
  isLoading: boolean;
  filter: ColumnFilter;
}

const columnHelper = createColumnHelper<HistoryRow>();

export function HistoryTable({ rows, filter }: Props) {
  const intl = useIntl();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        cell: (info) => intl.formatDate(info.getValue()),
        header: intl.formatMessage({ defaultMessage: 'Date' }),
      }),
      columnHelper.accessor('type', {
        id: 'type',
        cell: (info) => info.getValue(),
        header: intl.formatMessage({ defaultMessage: 'Type' }),
        enableColumnFilter: true,
        filterFn: (row, _, value) => {
          if (!value.value.length) return true;
          return value.value.includes(row.original.type);
        },
      }),
      columnHelper.accessor('change', {
        cell: (info) => intl.formatNumber(info.getValue(), quantityFormat),
        header: intl.formatMessage({ defaultMessage: 'Change' }),
      }),
      columnHelper.accessor('balance', {
        cell: (info) => (
          <Stack
            direction="row"
            alignItems="center"
            gap={0.5}
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

            <LinkIcon url={info.row.original.link} />
          </Stack>
        ),
        header: intl.formatMessage({ defaultMessage: 'OETH Balance' }),
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
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    // add when we do server side pagination
    // manualPagination: true,
    pageCount: rows.length / 3,
    // add when we do server side pagination
    // onPaginationChange: setPagination
  });

  useEffect(() => {
    table.getColumn('type')?.setFilterValue(filter);
  }, [filter, table]);
  return (
    <Stack gap={2}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
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
      <Pagination
        count={table.getPageCount()}
        shape="rounded"
        variant="outlined"
        hidePrevButton
        hideNextButton
        onChange={(_, page) => table.setPageIndex(page)}
      />
    </Stack>
  );
}
