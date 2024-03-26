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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useOgvInfo } from '@origin/defi/shared';
import {
  LoadingLabel,
  TablePagination,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { TransactionButton } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { formatDistanceToNowStrict, isFuture } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useOgvLockupsQuery } from '../queries.generated';
import { ExtendButton } from './ExtendFormModal';

import type { Lockup } from '../types';

const columnHelper = createColumnHelper<Lockup>();

export const LockupsTable = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: govInfo, isLoading: isGovInfoLoading } = useOgvInfo();
  const { data, isLoading } = useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
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
              alignItems="stretch"
              justifyContent="flex-end"
            >
              <ExtendButton
                lockup={info.row.original}
                variant="outlined"
                color="secondary"
              >
                {intl.formatMessage({ defaultMessage: 'Extend' })}
              </ExtendButton>
              <TransactionButton
                contract={tokens.mainnet.veOGV}
                functionName="unstake"
                args={[info.row.original.lockupId]}
                variant="outlined"
                color="secondary"
                disabled={isFuture(new Date(info.row.original.end))}
                label={intl.formatMessage({ defaultMessage: 'Unstake' })}
                waitingSignatureLabel={intl.formatMessage({
                  defaultMessage: 'Signing',
                })}
                waitingTxLabel={intl.formatMessage({
                  defaultMessage: 'Unstaking',
                })}
                activityTitle={intl.formatMessage({
                  defaultMessage: 'Unstake',
                })}
                activitySubtitle={intl.formatMessage({
                  defaultMessage: 'Unstake lock-up',
                })}
                activityEndIcon={
                  <TokenIcon
                    token={tokens.mainnet.veOGV}
                    sx={{ transform: 'translateY(4px)' }}
                  />
                }
                onSuccess={() => {
                  queryClient.invalidateQueries();
                }}
              />
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                rel="noopener noreferrer nofollow"
                href={`https://etherscan.io/tx/${
                  info.row.original?.logs?.[0]?.hash ?? ''
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
      govInfo?.veOgvTotalSupply,
      intl,
      isGovInfoLoading,
      isLoading,
      isSm,
      queryClient,
    ],
  );

  const table = useReactTable({
    data: data ?? [],
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
