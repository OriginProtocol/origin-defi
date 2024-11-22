import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { LrtWithdrawalStatus } from '@origin/prime/shared';
import { ExternalLink, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useTokenPrice } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useMatch } from 'react-router';
import { useAccount } from 'wagmi';

import { useUserWithdrawalsQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { Dnum } from 'dnum';

export const PastClaimsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const match = useMatch('/restake/claim');
  const { data: price, isLoading: isPriceLoading } =
    useTokenPrice('1:OETH_USD');
  const { data: withdrawals, isLoading: iswithdrawalsLoading } =
    useUserWithdrawalsQuery(
      { address: address?.toLowerCase() ?? ZERO_ADDRESS },
      {
        enabled: isConnected,
        select: (data) =>
          data?.lrtWithdrawalRequests?.filter(
            (r) => r.status !== LrtWithdrawalStatus.Requested,
          ) ?? [],
      },
    );

  if (!match || iswithdrawalsLoading || isNilOrEmpty(withdrawals)) {
    return null;
  }

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Past Claims' })}
      />
      <CardContent>
        <TableContainer sx={{ pb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Transaction Type' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Date' })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ defaultMessage: 'Amount' })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {withdrawals?.map((r) => {
                const amt = [
                  BigInt(r?.assetAmount ?? 0),
                  tokens.mainnet.OETH.decimals,
                ] as Dnum;
                const converted = mul(amt, price ?? 0);
                const type =
                  r.status === LrtWithdrawalStatus.Claimed
                    ? intl.formatMessage({ defaultMessage: 'Claimed' })
                    : intl.formatMessage({ defaultMessage: 'Migrated' });

                return (
                  <TableRow key={r.id}>
                    <TableCell>{type}</TableCell>
                    <TableCell>
                      {intl.formatDate(new Date(r.timestamp), {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <LoadingLabel isLoading={isPriceLoading}>
                        {intl.formatMessage(
                          { defaultMessage: '{amount} {converted}' },
                          {
                            amount: `${format(amt, 4)} OETH`,
                            converted: (
                              <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                  color: 'text.secondary',
                                  textAlign: 'start',
                                }}
                              >
                                (${format(converted, 2)})
                              </Typography>
                            ),
                          },
                        )}
                      </LoadingLabel>{' '}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <ExternalLink
          href="https://app.yieldnest.finance/portfolio"
          color="primary.main"
        >
          {intl.formatMessage({ defaultMessage: 'View on YieldNest Website' })}
        </ExternalLink>
      </CardContent>
    </Card>
  );
};
