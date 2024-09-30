import { Layout, trackSentryError } from '@origin/analytics/shared';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';

import { routes } from './routes';

export const App = () => {
  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
    >
      <Layout routes={routes} />
    </ErrorBoundary>
  );
};
