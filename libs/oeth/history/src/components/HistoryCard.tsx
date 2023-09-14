import { useState } from 'react';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { graphqlClient } from '@origin/oeth/shared';
import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import {
  HistoryTableDocument,
  HistoryTableWithFiltersDocument,
} from '../queries.generated';
import { ExportData } from './ExportData';
import { HistoryFilters } from './Filters';
import { HistoryTable } from './HistoryTable';

import type { HistoryTableQuery } from '../queries.generated';

const PAGE_SIZE = 20;

export function HistoryCard() {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const { address, isConnected } = useAccount();

  const { data, isFetching } = useQuery(
    ['history-table', address, filters, page],
    () => {
      return graphqlClient<
        HistoryTableQuery,
        { addressId: string; filters?: string[]; offset: number }
      >(
        filters.length ? HistoryTableWithFiltersDocument : HistoryTableDocument,
        {
          addressId: address?.toLowerCase(),
          filters: filters.length ? filters : undefined,
          offset: page * PAGE_SIZE,
        },
      )();
    },

    {
      enabled: isConnected,
    },
  );

  const intl = useIntl();

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
        <Typography color="primary.contrastText">
          {intl.formatMessage({ defaultMessage: 'OETH transactions' })}
        </Typography>
        <Stack direction="row" gap={1}>
          <HistoryFilters onChange={(values) => setFilters(values)} />
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
        <Box sx={{ height: '15rem', display: 'grid', placeContent: 'center' }}>
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your history',
            })}
          </Typography>
          <Button onClick={() => console.log('test')}>Connect</Button>
        </Box>
      )}
    </Box>
  );
}
