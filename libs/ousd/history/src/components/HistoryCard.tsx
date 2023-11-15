import { useState } from 'react';

import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { ExportData } from './ExportData';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

export function HistoryCard() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [filters, setFilters] = useState([]);

  return (
    <Card>
      <CardHeader
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'OUSD Transactions' })}
            </Typography>
            <Stack direction="row" gap={1}>
              <HistoryFilters filters={filters} setFilters={setFilters} />
              <ExportData />
            </Stack>
          </Stack>
        }
      />

      {isConnected ? (
        <HistoryTable filters={filters} />
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
