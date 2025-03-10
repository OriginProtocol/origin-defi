import { useMemo } from 'react';

import {
  Box,
  Button,
  Skeleton,
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
import { useOgnInfo } from '@origin/defi/shared';
import { LoadingLabel, TablePagination } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useOgnLockupsQuery } from '../queries.generated';
import { useLockupPolling } from '../state';
import { formatTimeRemaining } from '../utils';
import { ExtendAddButton } from './ExtendAddLockupModal';
import { UnstakeLockupButton } from './UnstakeLockupModal';

import type { Lockup } from '../types';

const columnHelper = createColumnHelper<Lockup>();

export const LockupsTable = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { address } = useAccount();
  const [{ lockupId, refetchInterval }] = useLockupPolling();
  const { data: govInfo, isLoading: isGovInfoLoading } = useOgnInfo();
  const { data, isLoading } = useOgnLockupsQuery(
    { address: address?.toLowerCase() ?? ZERO_ADDRESS },
    {
      select: (data) => data?.esLockups,
      enabled: !!address,
    },
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: intl.formatMessage({ defaultMessage: 'OGN' }),
        cell: (info) =>
          intl.formatNumber(
            +formatUnits(
              BigInt(info.getValue() ?? 0),
              tokens.mainnet.OGN.decimals,
            ),
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
              header: intl.formatMessage({ defaultMessage: 'Lockup Ends' }),
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
        cell: (info) => formatTimeRemaining(info.row.original.end),
      }),
      ...(isSm
        ? []
        : [
            columnHelper.accessor('points', {
              id: 'xogn',
              header: tokens.mainnet.xOGN.symbol,
              cell: (info) =>
                intl.formatNumber(
                  +formatUnits(
                    BigInt(info.getValue() ?? 0),
                    tokens.mainnet.xOGN.decimals,
                  ),
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  },
                ),
            }),
          ]),
      columnHelper.accessor('points', {
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
                BigInt(info.getValue() ?? 0),
                tokens.mainnet.xOGN.decimals,
              ) /
                +formatUnits(
                  govInfo?.xOgnTotalSupply ?? 1n,
                  tokens.mainnet.xOGN.decimals,
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
          if (info.row.original.lockupId === lockupId) {
            return (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Skeleton width={275} height={37} />
              </Stack>
            );
          }

          return (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'stretch',
                justifyContent: 'flex-end',
              }}
            >
              <ExtendAddButton
                lockup={info.row.original}
                variant="outlined"
                color="secondary"
                disableNetworkCheck
              >
                {intl.formatMessage({ defaultMessage: 'Extend/Add' })}
              </ExtendAddButton>
              <UnstakeLockupButton
                lockup={info.row.original}
                variant="outlined"
                color="secondary"
                disableNetworkCheck
              >
                {intl.formatMessage({ defaultMessage: 'Unlock' })}
              </UnstakeLockupButton>
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                rel="noopener noreferrer nofollow"
                href={`https://etherscan.io/tx/${
                  info.row.original?.events?.[0]?.txHash ?? ''
                }`}
                sx={{ minWidth: 0 }}
              >
                <FaArrowUpRightRegular />
              </Button>
            </Stack>
          );
        },
      }),
    ],
    [
      govInfo?.xOgnTotalSupply,
      intl,
      isGovInfoLoading,
      isLoading,
      isSm,
      lockupId,
    ],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
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
            {refetchInterval !== false && !lockupId && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Skeleton width="100%" height={37} />
                </TableCell>
              </TableRow>
            )}
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
      {table.getPageCount() > 1 && (
        <TablePagination
          table={table}
          disableScrollToTop
          buttonsProps={{
            variant: 'contained',
            color: 'inherit',
          }}
        />
      )}
    </Stack>
  );
};
