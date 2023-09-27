import { useState } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useHistoryTableWithFiltersQuery } from '../queries.generated';
import { ExportData } from './ExportData';
import { HistoryFilters } from './Filters';
import { HistoryTable } from './HistoryTable';

const PAGE_SIZE = 20;

export function HistoryCard() {
  const intl = useIntl();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const { address, isConnected } = useAccount();

  const { data, isFetching } = useHistoryTableWithFiltersQuery(
    {
      address: address?.toLowerCase(),
      filters: filters.length ? filters : undefined,
      offset: page * PAGE_SIZE,
    },
    { enabled: isConnected },
  );

  return (
    <Box sx={{ borderRadius: 1, backgroundColor: 'background.paper', mt: 3 }}>
      <Stack
        sx={{
          paddingInline: { xs: 2, sm: 3 },
          paddingBlock: { xs: 1.75, md: 2.75 },
        }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>
          {intl.formatMessage({ defaultMessage: 'OETH transactions' })}
        </Typography>
        <Stack direction="row" gap={1}>
          <HistoryFilters
            filters={filters}
            onChange={(values) => setFilters(values)}
          />
          <ExportData data={data?.addressById?.history} />
        </Stack>
      </Stack>
      <Divider />
      {isConnected ? (
        <HistoryTable
          rows={data?.addressById?.history || []}
          isLoading={isFetching}
          hasNextPage={data?.addressById?.history?.length === PAGE_SIZE}
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
    </Box>
  );
}
