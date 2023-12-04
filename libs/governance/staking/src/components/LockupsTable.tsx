import { useMemo } from 'react';

import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TablePagination } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { formatDistanceToNowStrict, isFuture, isPast } from 'date-fns';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useUserLockupsQuery } from '../queries.generated';
import { LockupTransactionsButton } from './LockupTransactionsModal';

import type { Lockup } from '../types';

const columnHelper = createColumnHelper<Lockup>();

export const LockupsTable = () => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const { data } = useUserLockupsQuery(
    { address },
    {
      select: (data) => data.ogvLockups,
      enabled: !!address,
      placeholderData: { ogvLockups: [] },
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGV' }),
        cell: (info) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <Box component="img" src={tokens.mainnet.OGV.icon} width={24} />
            <Typography>{formatAmount(BigInt(info.getValue()))}</Typography>
          </Stack>
        ),
      }),
      columnHelper.accessor('end', {
        header: intl.formatMessage({ defaultMessage: 'Lock-up Ends' }),
        cell: (info) => (
          <Typography>
            {intl.formatDate(info.getValue(), {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
        ),
      }),
      columnHelper.display({
        id: 'timeRemaining',
        header: intl.formatMessage({ defaultMessage: 'Time Remaining' }),
        cell: (info) => (
          <Typography>
            {formatDistanceToNowStrict(new Date(info.row.original.end), {
              unit: 'month',
              roundingMethod: 'ceil',
            })}
          </Typography>
        ),
      }),
      columnHelper.accessor('veogv', {
        header: intl.formatMessage({ defaultMessage: 'Voting Power' }),
        cell: (info) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <Box component="img" src={tokens.mainnet.veOGV.icon} width={24} />
            <Typography>{formatAmount(BigInt(info.getValue()))}</Typography>
          </Stack>
        ),
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              disabled={isPast(new Date(info.row.original.end))}
            >
              {intl.formatMessage({ defaultMessage: 'Extend' })}
            </Button>
            <Button
              variant="outlined"
              disabled={isFuture(new Date(info.row.original.end))}
            >
              {intl.formatMessage({ defaultMessage: 'Unstake' })}
            </Button>
            <LockupTransactionsButton
              variant="text"
              logs={info.row.original.logs}
            >
              <Box
                component="img"
                src="images/icons/chart-pie-light.svg"
                width={16}
              />
            </LockupTransactionsButton>
          </Stack>
        ),
      }),
    ],
    [formatAmount, intl],
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Stack>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableCell
                  key={header.id}
                  sx={{ width: header.getSize(), color: 'text.secondary' }}
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
            <TableRow key={row.id}>
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
};
