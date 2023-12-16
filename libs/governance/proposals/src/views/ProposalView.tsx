import { Stack, Typography } from '@mui/material';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

export const ProposalView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <Typography>Proposal</Typography>
      </ErrorBoundary>
    </Stack>
  );
};
