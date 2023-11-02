import { useMemo } from 'react';

import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
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
import { formatEther } from 'viem';

import { HistoryFilterButton } from './HistoryButton';
import { TransactionIcon } from './TransactionIcon';

import type { StackProps } from '@mui/material';
import type { HistoryType } from '@origin/oeth/shared';

import type { HistoryPageQuery } from '../queries.generated';

export type Rows = HistoryPageQuery['oethAddresses'][0]['history'];

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
          <HistoryTypeCell
            type={info.getValue()}
            timestamp={info.row.original.timestamp}
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
        cell: (info) => (
          <Typography textAlign="end">
            {intl.formatNumber(
              +formatEther(BigInt(info.getValue() ?? '0')),
              quantityFormat,
            )}
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
            {intl.formatNumber(
              +formatEther(BigInt(info.getValue() ?? '0')),
              quantityFormat,
            )}
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
        cell: (info) => (
          <LinkIcon
            size={10}
            url={`https://etherscan.io/tx/${info.row.original.txHash}`}
          />
        ),
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
              sx={{
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
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="flex-end"
        gap={1}
        sx={{ px: { xs: 2, md: 3 }, py: 2 }}
      >
        <HistoryFilterButton
          disabled={!hasPreviousPage}
          onClick={() => setPage(page - 1)}
        >
          {intl.formatMessage({ defaultMessage: 'Previous' })}
        </HistoryFilterButton>
        <Typography fontSize={13} px={2}>
          {intl.formatMessage(
            { defaultMessage: 'Page {page}' },
            { page: page + 1 },
          )}
        </Typography>
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

type HistoryTypeCellProps = {
  timestamp: string;
  type: HistoryType;
} & StackProps;

function HistoryTypeCell({ timestamp, type, ...rest }: HistoryTypeCellProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" alignItems="center" gap={1.5}>
      <TransactionIcon type={type} />
      <Stack>
        <Typography fontWeight="500">{type}</Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatDate(new Date(timestamp))}
        </Typography>
      </Stack>
    </Stack>
  );
}
