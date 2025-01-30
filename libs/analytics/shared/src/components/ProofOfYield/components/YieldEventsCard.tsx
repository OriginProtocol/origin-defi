import { useMemo } from 'react';

import {
  Card,
  CardContent,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ExternalLink,
  Spinner,
  TablePagination,
} from '@origin/shared/components';
import { supportedChains } from '@origin/shared/constants';
import { middleTruncate, ZERO_ADDRESS } from '@origin/shared/utils';
import { keepPreviousData } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { sub, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import { useOTokenRebasesQuery } from '../../../queries';
import { usePoY } from '../hooks';

import type { CardProps } from '@mui/material';
import type { Dnum } from 'dnum';
import type { Hex } from 'viem';

const columnHelper = createColumnHelper<{
  timestamp: number;
  blocknumber: number;
  amount: number;
  txHash: Hex;
  fees: number;
}>();

export const YieldEventsCard = (props: CardProps) => {
  const { token, selectedItem } = usePoY();
  const ts = dayjs.utc(selectedItem?.timestamp);
  const morning = ts.hour(0).minute(0).second(0).millisecond(0);
  const evening = ts.hour(23).minute(59).second(59).millisecond(999);

  const intl = useIntl();
  const { data: rebases, isLoading: isRebasesLoading } = useOTokenRebasesQuery(
    {
      token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
      chainId: token.chainId,
      from: morning.toISOString(),
      to: evening.toISOString(),
    },
    {
      placeholderData: keepPreviousData,
      select: (data) =>
        data?.oTokenRebases?.map((d) => {
          const fees = [BigInt(d?.feeETH ?? 0), token.decimals] as Dnum;
          const amount = sub([BigInt(d?.yieldETH ?? 0), token.decimals], fees);

          return {
            timestamp: new Date(d.timestamp).getTime(),
            blocknumber: d.blockNumber,
            amount: toNumber(amount, {
              digits: token.decimals,
              decimalsRounding: 'ROUND_DOWN',
            }),
            txHash: d.txHash as Hex,
            fees: toNumber(fees, {
              digits: token.decimals,
              decimalsRounding: 'ROUND_DOWN',
            }),
          };
        }) ?? [],
    },
  );
  const columns = useMemo(
    () => [
      columnHelper.accessor('timestamp', {
        cell: (info) => (
          <Stack
            direction="row"
            useFlexGap
            sx={{
              alignItems: 'baseline',
              flexWrap: 'wrap',
              rowGap: 0.5,
              columnGap: 2,
            }}
          >
            <Typography sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {info.row.original.blocknumber}
            </Typography>
            <Typography variant="caption1" color="text.secondary">
              {dayjs.utc(info.getValue()).format('hh:mm:ss')}
            </Typography>
          </Stack>
        ),
        header: intl.formatMessage({ defaultMessage: 'Block / Time' }),
        size: 200,
      }),
      columnHelper.accessor('amount', {
        cell: (info) =>
          intl.formatNumber(info.getValue(), { maximumFractionDigits: 4 }),
        header: intl.formatMessage({ defaultMessage: 'Amount' }),
        size: 100,
      }),
      columnHelper.accessor('fees', {
        cell: (info) =>
          intl.formatNumber(info.getValue(), { maximumFractionDigits: 4 }),
        header: intl.formatMessage({ defaultMessage: 'Fees' }),
        size: 100,
      }),
      columnHelper.accessor('txHash', {
        cell: (info) => (
          <ExternalLink
            href={`${supportedChains[token.chainId].blockExplorers.default.url}/tx/${info.getValue()}`}
            noWrap
          >
            {middleTruncate(info.getValue())}
          </ExternalLink>
        ),

        header: intl.formatMessage({ defaultMessage: 'Transaction' }),
        size: 100,
      }),
    ],
    [intl, token.chainId],
  );
  const table = useReactTable({
    data: rebases ?? [],
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
            {intl.formatMessage({
              defaultMessage: 'Yield distribution events',
            })}
          </Typography>
          <Typography color="text.secondary">
            {intl.formatMessage(
              {
                defaultMessage:
                  '{symbol} wallet balances increase at least once per day. Anyone can trigger yield distribution at any time. Each time yield is distributed, there is one corresponding transaction on the blockchain.',
              },
              { symbol: token?.name },
            )}
          </Typography>
        </Stack>
      </CardContent>
      <Divider />
      {isRebasesLoading ? (
        <Spinner sx={{ width: 1, height: 200 }} />
      ) : (
        <TableContainer sx={{ overflowX: 'auto', minHeight: 200 }}>
          <Table
            sx={{
              '& .MuiTableCell-root': {
                px: { xs: 2, md: 3 },
                py: { xs: 1.75, md: 1.5 },
              },
            }}
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} sx={{ width: header.getSize() }}>
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
                      sx={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {table.getPageCount() > 1 && (
        <Stack
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TablePagination
            table={table}
            disableScrollToTop
            buttonsProps={{
              variant: 'outlined',
              color: 'secondary',
              size: 'small',
            }}
          />
        </Stack>
      )}
    </Card>
  );
};
