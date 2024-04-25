import { useState } from 'react';

import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { DownloadCsvButton } from '@origin/shared/components';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useAggregatedHistory } from '../hooks';
import { useOusdHistoryTransactionQuery } from '../queries.generated';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

import type { HistoryType } from '@origin/ousd/shared';

export function HistoryCard() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { data, isFetching } = useAggregatedHistory(filters);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'OUSD Transactions' })}
        action={
          <Stack direction="row" gap={1}>
            <HistoryFilters filters={filters} setFilters={setFilters} />
            <ExportData />
          </Stack>
        }
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
        ) : isNilOrEmpty(data) ? (
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
          <HistoryTable filters={filters} />
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

function ExportData() {
  const intl = useIntl();
  const { address } = useAccount();
  const { data } = useOusdHistoryTransactionQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      select: (data) => {
        if (!data?.oTokenHistories) {
          return;
        }

        return data.oTokenHistories.reduce(
          (acc, curr) => [
            ...acc,
            [curr.timestamp, curr.type, curr.value, curr.balance, curr.txHash],
          ],
          [['Date', 'Type', 'Amount', 'Balance', 'Transaction Hash']],
        );
      },
    },
  );

  return (
    <DownloadCsvButton
      data={data}
      buttonLabel={intl.formatMessage({ defaultMessage: 'CSV' })}
      filename="transaction_history.csv"
      variant="outlined"
    />
  );
}
