import { useMemo } from 'react';

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import {
  ArrowLink,
  LoadingLabel,
  TablePagination,
  TokenIcon,
} from '@origin/shared/components';
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
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserLockupsQuery } from '../queries.generated';
import { ExtendButton } from './ExtendFormModal';
import { UnstakeButton } from './UnstakeFormModal';

import type { Lockup } from '../types';

const columnHelper = createColumnHelper<Lockup>();

export const LockupsTable = () => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const { data: govInfo, isLoading: isGovInfoLoading } = useGovernanceInfo();
  const { data, isLoading } = useUserLockupsQuery(
    { address },
    {
      select: (data) => data?.ogvLockups,
      enabled: !!address,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGV' }),
        cell: (info) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <TokenIcon symbol={tokens.mainnet.OGV.symbol} />
            <Typography>{formatAmount(BigInt(info.getValue()))}</Typography>
          </Stack>
        ),
      }),
      columnHelper.accessor('end', {
        header: intl.formatMessage({ defaultMessage: 'Lock-up Ends' }),
        cell: (info) =>
          intl.formatDate(info.getValue(), {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
      }),
      columnHelper.display({
        id: 'timeRemaining',
        header: intl.formatMessage({ defaultMessage: 'Time Remaining' }),
        cell: (info) =>
          formatDistanceToNowStrict(new Date(info.row.original.end), {
            unit: 'month',
            roundingMethod: 'floor',
          }),
      }),
      columnHelper.accessor('veogv', {
        id: 'veogv',
        header: tokens.mainnet.veOGV.symbol,
        cell: (info) => (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <TokenIcon
              symbol={tokens.mainnet.veOGV.symbol}
              sx={{ transform: 'translateY(4px)' }}
            />
            <Typography>{formatAmount(BigInt(info.getValue()))}</Typography>
          </Stack>
        ),
      }),
      columnHelper.accessor('veogv', {
        id: 'vp',
        header: intl.formatMessage({ defaultMessage: 'Voting power' }),
        cell: (info) => (
          <LoadingLabel
            isLoading={isLoading || isGovInfoLoading}
            sWidth={50}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {intl.formatNumber(
              +formatUnits(
                BigInt(info.getValue()) ?? 0n,
                tokens.mainnet.veOGV.decimals,
              ) /
                +formatUnits(
                  govInfo?.veOgvTotalSupply ?? 1n,
                  tokens.mainnet.veOGV.decimals,
                ),
              {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 5,
              },
            )}
          </LoadingLabel>
        ),
      }),
      columnHelper.display({
        id: 'action',
        cell: (info) => {
          return (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <ExtendButton
                lockup={info.row.original}
                variant="outlined"
                color="secondary"
                disabled={isPast(new Date(info.row.original.end))}
              >
                {intl.formatMessage({ defaultMessage: 'Extend' })}
              </ExtendButton>

              <UnstakeButton
                lockup={info.row.original}
                variant="outlined"
                color="secondary"
                disabled={isFuture(new Date(info.row.original.end))}
              >
                {intl.formatMessage({ defaultMessage: 'Unstake' })}
              </UnstakeButton>

              <ArrowLink
                iconSize={12}
                href={`https://etherscan.io/tx/${
                  info.row.original?.logs?.[0]?.hash ?? ''
                }`}
              />
            </Stack>
          );
        },
      }),
    ],
    [
      formatAmount,
      govInfo?.veOgvTotalSupply,
      intl,
      isGovInfoLoading,
      isLoading,
    ],
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
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ width: 1 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      width: header.getSize(),
                      textAlign: index === 0 ? 'start' : 'end',
                      color: 'text.secondary',
                    }}
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
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      textAlign: index === 0 ? 'start' : 'end',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination table={table} />
    </Stack>
  );
};
