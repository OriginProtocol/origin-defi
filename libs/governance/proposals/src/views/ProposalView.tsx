import { Stack } from '@mui/material';
import { trackSentryError } from '@origin/governance/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { ProposalHeader } from '../components/ProposalHeader';

export const ProposalView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ProposalHeader />
      </ErrorBoundary>
    </Stack>
  );
};
