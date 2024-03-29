import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { BalancesCard } from '../components/BalancesCard';
import { BridgeActivityCard } from '../components/BridgeActivityCard';
import { BridgeCard } from '../components/BridgeCard';
import { BridgeProvider } from '../state';

export function BridgeView() {
  const intl = useIntl();

  return (
    <BridgeProvider>
      <Container sx={{ mt: 3, mb: 10 }} maxWidth="md">
        <Grid2 container spacing={3}>
          <Grid2 xs={12} lg={8}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeCard />
            </ErrorBoundary>
          </Grid2>
          <Grid2 xs={12} lg={4}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BalancesCard
                title={intl.formatMessage({
                  defaultMessage: 'Your wOETH balances',
                })}
              />
            </ErrorBoundary>
          </Grid2>
          <Grid2 xs={12} lg={8}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeActivityCard />
            </ErrorBoundary>
          </Grid2>
        </Grid2>
      </Container>
    </BridgeProvider>
  );
}
