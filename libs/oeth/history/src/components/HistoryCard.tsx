import { useState } from 'react';

import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useAggregatedHistory } from '../hooks';
import { ExportData } from './ExportData';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

import type { HistoryType } from '@origin/oeth/shared';

export function HistoryCard() {
  const intl = useIntl();
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { isConnected } = useAccount();
  const { data, isLoading, isFetching, date, setDate } =
    useAggregatedHistory(filters);

  return (
    <Card>
      <CardHeader
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'OETH Transactions' })}
            </Typography>
            <Stack direction="row" gap={1}>
              <HistoryFilters
                filters={filters}
                onChange={(values) => setFilters(values)}
              />
              <ExportData data={data} />
            </Stack>
          </Stack>
        }
      />

      {isConnected ? (
        <HistoryTable
          rows={data || []}
          isLoading={isFetching && isLoading}
          date={date}
          setDate={setDate}
        />
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
