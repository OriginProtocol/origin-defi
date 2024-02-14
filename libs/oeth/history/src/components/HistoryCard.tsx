import { useState } from 'react';

import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useAggregatedHistory } from '../hooks';
import { ExportData } from './ExportData';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

import type { HistoryType } from '@origin/oeth/shared';

export function HistoryCard() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { data, isFetching } = useAggregatedHistory(filters);

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'OETH Transactions' })}
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
