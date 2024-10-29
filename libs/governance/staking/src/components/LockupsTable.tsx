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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import {
  ArrowLink,
  LoadingLabel,
  TablePagination,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { formatDistanceToNowStrict } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserLockupsQuery } from '../queries.generated';
import { UnstakeButton } from './UnstakeFormModal';

import type { Lockup } from '../types';

const columnHelper = createColumnHelper<Lockup>();

export const LockupsTable = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { address } = useAccount();
  const { data: govInfo, isLoading: isGovInfoLoading } = useGovernanceInfo();
  const { data: lockups, isLoading: isLockupsLoading } = useUserLockupsQuery(
    { address: address?.toLowerCase() ?? ZERO_ADDRESS },
    {
      select: (data) => data?.ogvLockups,
      enabled: !!address,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGV' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(BigInt(info.getValue()), tokens.mainnet.OGV.decimals),
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            },
          ),
      }),
      ...(isSm
        ? []
        : [
            columnHelper.accessor('end', {
              header: intl.formatMessage({ defaultMessage: 'Lock-up Ends' }),
              cell: (info) =>
                intl.formatDate(info.getValue(), {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }),
            }),
          ]),
      columnHelper.display({
        id: 'timeRemaining',
        header: intl.formatMessage({ defaultMessage: 'Time Remaining' }),
        cell: (info) =>
          formatDistanceToNowStrict(new Date(info.row.original.end), {
            unit: 'month',
            roundingMethod: 'floor',
          }),
      }),
      ...(isSm
        ? []
        : [
            columnHelper.accessor('veogv', {
              id: 'veogv',
              header: tokens.mainnet.veOGV.symbol,
              cell: (info) =>
                intl.formatNumber(
                  +formatUnits(
                    BigInt(info.getValue()),
                    tokens.mainnet.veOGV.decimals,
                  ),
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  },
                ),
            }),
          ]),
      columnHelper.accessor('veogv', {
        id: 'vp',
        header: intl.formatMessage({ defaultMessage: 'Voting power' }),
        cell: (info) => (
          <LoadingLabel
            isLoading={isLockupsLoading || isGovInfoLoading}
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
                maximumFractionDigits: 6,
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
              sx={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <UnstakeButton
                lockup={info.row.original}
                variant="outlined"
                color="secondary"
              >
                {intl.formatMessage({ defaultMessage: 'Unlock' })}
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
    [govInfo?.veOgvTotalSupply, intl, isGovInfoLoading, isLockupsLoading, isSm],
  );

  const table = useReactTable({
    data: lockups ?? [],
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
                    sx={[
                      {
                        width: header.getSize(),
                        color: 'text.secondary',
                      },
                      index === 0
                        ? {
                            textAlign: 'start',
                          }
                        : {
                            textAlign: 'end',
                          },
                    ]}
                  >
                    <Typography noWrap>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Typography>
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
                    sx={[
                      index === 0
                        ? {
                            textAlign: 'start',
                          }
                        : {
                            textAlign: 'end',
                          },
                    ]}
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
