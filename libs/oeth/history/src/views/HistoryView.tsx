import { Container, Stack } from '@mui/material';
import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { APYContainer } from '../components/APYContainer';
import { HistoryCard } from '../components/HistoryCard';

export function HistoryView() {
  return (
    <Container
      sx={{
        mt: 3,
        mb: 10,
      }}
      maxWidth="sm"
    >
      <Stack spacing={3}>
        <ErrorBoundary
          ErrorComponent={<ErrorCard />}
          onError={trackSentryError}
        >
          <APYContainer />
        </ErrorBoundary>
        <ErrorBoundary
          ErrorComponent={<ErrorCard />}
          onError={trackSentryError}
        >
          <HistoryCard />
        </ErrorBoundary>
      </Stack>
    </Container>
  );
}
