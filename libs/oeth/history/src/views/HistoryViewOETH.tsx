import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { HistoryCard } from '../components/oeth/HistoryCard';
import { HistoryHeader } from '../components/oeth/HistoryHeader';

export function HistoryViewOETH() {
  return (
    <>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <HistoryHeader />
      </ErrorBoundary>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <HistoryCard />
      </ErrorBoundary>
    </>
  );
}
