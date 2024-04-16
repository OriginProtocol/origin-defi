import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TablePagination, TransactionIcon } from '@origin/shared/components';
import { getTokenByAddress } from '@origin/shared/contracts';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { getChain } from '@origin/shared/providers';
import { formatAmount, txLink } from '@origin/shared/utils';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useIntl } from 'react-intl';
import { useConfig } from 'wagmi';

import type { HistoryType } from '@origin/oeth/shared';

export type HistoryTableProps = {
  rows: {
    id: string;
    chainId: number;
    blockNumber: number;
    timestamp: string;
    address: string;
    txHash: string;
    type: HistoryType;
    change: string;
    balance: string;
  }[];
};

export function HistoryTable({ rows }: HistoryTableProps) {
  const config = useConfig();
  const intl = useIntl();
  const table = useReactTable({
    columns: [{ id: 'type' }, { id: 'change' }, { id: 'balance' }],
    data: rows,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });
  const displayRows = table.getRowModel().rows;

  const cellSx = { paddingX: { xs: 1, md: 3 } };

  return (
    <Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 3, width: '50%', ...cellSx }}>Type</TableCell>
            <TableCell align="right" sx={cellSx}>
              Change
            </TableCell>
            <TableCell align="right" sx={cellSx}>
              Balance
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {displayRows.map(({ original: row }) => {
            const token = getTokenByAddress(row.address, row.chainId);
            if (!token) return null;
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" sx={cellSx}>
                  <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <TransactionIcon
                      type={row.type}
                      token={token}
                      sx={{
                        width: { xs: 24, sm: 32 },
                        height: { xs: 24, sm: 32 },
                      }}
                    />
                    <Box>
                      <Typography fontWeight="500">{row.type}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {intl.formatDate(new Date(row.timestamp))}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align="right" sx={cellSx}>
                  {formatAmount(row.change)}
                </TableCell>
                <TableCell align="right" sx={cellSx}>
                  {row.balance && formatAmount(row.balance)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ paddingLeft: 0, paddingRight: { xs: 2, md: 3 } }}
                >
                  <Link
                    href={txLink(getChain(config, row.chainId), row.txHash)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <FaArrowUpRightRegular sx={{ fontSize: 12 }} />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </Stack>
  );
}
