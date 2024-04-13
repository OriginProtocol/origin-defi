import { useMemo } from 'react';

import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ExternalLink, TransactionIcon } from '@origin/shared/components';
import { getTokenByAddress } from '@origin/shared/contracts';
import { getChain } from '@origin/shared/providers';
import { formatAmount, txLink } from '@origin/shared/utils';
import { indexBy } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import type { HistoryType } from '@origin/oeth/shared';

import type { BalancesQuery, TransfersQuery } from '../../../queries.generated';

export type HistoryTableProps = {
  transfers: TransfersQuery['erc20Transfers'];
  balances: BalancesQuery['erc20Balances'];
};

export function HistoryTable({ transfers, balances }: HistoryTableProps) {
  const config = useConfig();
  const intl = useIntl();
  const { address: userAddress } = useAccount();
  const rows = useMemo(() => {
    if (!userAddress) return [];
    const balanceMap = indexBy(
      (b) =>
        `${b.chainId}-${b.blockNumber}-${b.address}-${b.account.toLowerCase()}`,
      balances,
    );
    return transfers.map((t) => {
      return {
        id: t.id,
        chainId: t.chainId,
        blockNumber: t.blockNumber,
        timestamp: t.timestamp,
        address: t.address,
        txHash: t.txHash,
        type: (t.from.toLowerCase() === userAddress.toLowerCase()
          ? 'Sent'
          : 'Received') as HistoryType,
        change: t.value,
        balance:
          balanceMap[
            `${t.chainId}-${t.blockNumber}-${t.address}-${userAddress.toLowerCase()}`
          ]?.balance,
      };
    });
  }, [userAddress, transfers, balances]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell width={1} sx={{ paddingLeft: 0 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const token = getTokenByAddress(row.address, row.chainId);
            if (!token) return null;
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <TransactionIcon
                      type={row.type}
                      token={token}
                      sx={{
                        width: 32,
                        height: 32,
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
                <TableCell align="right">{formatAmount(row.change)}</TableCell>
                <TableCell align="right">
                  {row.balance && formatAmount(row.balance)}
                </TableCell>{' '}
                <TableCell align="right" sx={{ paddingLeft: 0 }}>
                  <ExternalLink
                    href={txLink(getChain(config, row.chainId), row.txHash)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
