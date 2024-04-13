import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useWOETHHistory } from '../../../hooks';
import { HistoryTable } from './HistoryTable';

export function HistoryCard() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { transfersQuery, balancesQuery } = useWOETHHistory();

  const isFetching = transfersQuery.isFetching || balancesQuery.isFetching;
  const isEmpty =
    !transfersQuery.data?.erc20Transfers.length ||
    !balancesQuery.data?.erc20Balances.length;

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'wOETH Transactions' })}
      />
      {isConnected ? (
        isFetching ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        ) : isEmpty ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'No transaction' })}
            </Typography>
          </Stack>
        ) : (
          <HistoryTable
            transfers={transfersQuery.data!.erc20Transfers}
            balances={balancesQuery.data!.erc20Balances}
          />
        )
      ) : (
        <Stack
          sx={{
            height: '15rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your history',
            })}
          </Typography>
          <ConnectedButton />
        </Stack>
      )}
    </Card>
  );
}
