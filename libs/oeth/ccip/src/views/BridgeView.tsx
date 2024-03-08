import { Container, Stack } from '@mui/material';
import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { BalancesCard } from '../components/BalancesCard';
import { BridgeActivityCard } from '../components/BridgeActivityCard';
import { BridgeCard } from '../components/BridgeCard';
import { BridgeProvider } from '../state';

export function BridgeView() {
  return (
    <BridgeProvider>
      <Container
        sx={{
          mt: 3,
          mb: 10,
        }}
      >
        <Stack
          spacing={3}
          alignContent={'center'}
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          <Stack spacing={3} direction={'column'}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeCard />
            </ErrorBoundary>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeActivityCard />
            </ErrorBoundary>
          </Stack>
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <BalancesCard title={'Your wOETH balances'} />
          </ErrorBoundary>
        </Stack>
      </Container>
    </BridgeProvider>
  );
}
