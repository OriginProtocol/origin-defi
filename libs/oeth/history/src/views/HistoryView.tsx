import { Stack } from '@mui/material';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { APYContainer } from '../components/APYContainer';
import { HistoryCard } from '../components/HistoryCard';

export function HistoryView() {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />}>
        <APYContainer />
      </ErrorBoundary>
      <ErrorBoundary ErrorComponent={<ErrorCard />}>
        <HistoryCard />
      </ErrorBoundary>
    </Stack>
  );
}
