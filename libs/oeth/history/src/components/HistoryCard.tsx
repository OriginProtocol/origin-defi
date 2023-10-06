import { useState } from 'react';

import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useHistoryPageQuery } from '../queries.generated';
import { ExportData } from './ExportData';
import { HistoryFilters } from './HistoryFilters';
import { HistoryTable } from './HistoryTable';

import type { HistoryType } from '@origin/oeth/shared';

const PAGE_SIZE = 20;

export function HistoryCard() {
  const intl = useIntl();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<HistoryType[]>([]);
  const { address, isConnected } = useAccount();
  const { data, isFetching, isLoading } = useHistoryPageQuery(
    {
      address: address?.toLowerCase(),
      filters: filters.length ? filters : undefined,
      offset: page * PAGE_SIZE,
    },
    { enabled: isConnected, select: (data) => data?.addresses?.at(0)?.history },
  );

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
          hasNextPage={data?.length === PAGE_SIZE}
          hasPreviousPage={page > 0}
          page={page}
          setPage={(page) => setPage(page)}
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
