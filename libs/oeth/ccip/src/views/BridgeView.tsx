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
  const cardWidth = 552;
  return (
    <BridgeProvider>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
          mb: 10,
        }}
      >
        <Grid2 container gap={3} justifyContent={'center'}>
          <Grid2 xs={12} lg={8} maxWidth={cardWidth}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeCard />
            </ErrorBoundary>
          </Grid2>
          <Grid2 xs={12} lg={4} maxWidth={cardWidth}>
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
          <Grid2 xs={12} lg={8} maxWidth={cardWidth}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeActivityCard />
            </ErrorBoundary>
          </Grid2>
          <Grid2 xs={12} lg={4} maxWidth={cardWidth} />
        </Grid2>
      </Container>
    </BridgeProvider>
  );
}
