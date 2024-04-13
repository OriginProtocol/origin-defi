import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { HistoryCard } from '../components/woeth/HistoryCard';
import { HistoryHeader } from '../components/woeth/HistoryHeader';

export function HistoryViewWOETH() {
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
