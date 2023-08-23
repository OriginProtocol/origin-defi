import { useState } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { Card } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { HistoryFilterButton } from './HistoryButton';
import { HistoryTable } from './HistoryTable';

import type { ColumnFilter } from '@tanstack/react-table';

export function HistoryCard() {
  const [isConnected, setConnectionState] = useState(false);
  const intl = useIntl();
  const [filter, setFilter] = useState<ColumnFilter>({
    id: 'type',
    value: [],
  });

  function filterRows(value: string) {
    setFilter((prev) => {
      if ((prev.value as string[]).includes(value)) {
        return {
          ...prev,
          value: [...(prev.value as string[]).filter((val) => val !== value)],
        };
      } else {
        return {
          ...prev,
          value: [...(prev.value as string[]), value],
        };
      }
    });
  }
  return (
    <Card
      sx={{ mt: 3 }}
      title={
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography color="primary.contrastText">History</Typography>
          <Stack direction="row" gap={2} sx={{ marginInline: 'auto' }}>
            {[
              intl.formatMessage({ defaultMessage: 'Received' }),
              intl.formatMessage({ defaultMessage: 'Sent' }),
              intl.formatMessage({ defaultMessage: 'Swap' }),
              intl.formatMessage({ defaultMessage: 'Yield' }),
            ].map((label) => (
              <HistoryFilterButton
                key={label}
                circle
                selected={(filter.value as string[]).includes(
                  label.toLowerCase(),
                )}
                onClick={() => filterRows(label.toLowerCase())}
              >
                {label}
              </HistoryFilterButton>
            ))}
          </Stack>
          <HistoryFilterButton>
            {intl.formatMessage({ defaultMessage: 'Export CSV' })}
          </HistoryFilterButton>
        </Stack>
      }
    >
      {isConnected ? (
        <HistoryTable rows={[]} isLoading={false} filter={filter} />
      ) : (
        <Box sx={{ height: '15rem', display: 'grid', placeContent: 'center' }}>
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your history',
            })}
          </Typography>
          <Button onClick={() => setConnectionState(true)}>Connect</Button>
        </Box>
      )}
    </Card>
  );
}
