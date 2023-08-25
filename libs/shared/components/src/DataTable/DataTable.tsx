import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import type {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
} from '@tanstack/react-table';

type Data = Record<string, unknown>;

interface Props<Data> {
  rows: Data[];
  columns: ColumnDef<Data, unknown>[];
  isLoading: boolean;
  pageSize?: number;
  pageCount: number;
}

export const DataTable = forwardRef(
  ({ rows, columns, pageSize = 20, pageCount }: Props<Data>, ref) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
      data: rows,
      columns,
      state: {
        pagination: {
          pageSize,
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
      pageCount,
      // add when we do server side pagination
      // onPaginationChange: setPagination
    });

    useImperativeHandle(
      ref,
      (): DataTableRef => {
        return {
          setFilter: (filter: ColumnFilter, columnName: string) => {
            table.getColumn(columnName)?.setFilterValue(filter);
          },
        };
      },
      [table],
    );
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
  },
);

DataTable.displayName = 'DataTable';

export type DataTableRef = {
  setFilter: (filter: ColumnFilter, columnName: string) => void;
};
