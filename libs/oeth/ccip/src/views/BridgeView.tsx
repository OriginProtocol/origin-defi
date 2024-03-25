import { Container } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';

import { BalancesCard } from '../components/BalancesCard';
import { BridgeActivityCard } from '../components/BridgeActivityCard';
import { BridgeCard } from '../components/BridgeCard';
import { BridgeProvider } from '../state';

import type { SxProps } from '@mui/material';

export function BridgeView() {
  const cellSx: SxProps = {
    display: {
      xs: 'flex',
      md: 'block',
    },
    justifyContent: {
      xs: 'center',
      md: 'inherit',
    },
  };
  return (
    <BridgeProvider>
      <Container
        sx={{
          mt: 3,
          mb: 10,
          maxWidth: {
            xs: '100%',
            sm: 600,
            md: 800,
            lg: 1200,
          },
        }}
      >
        <Grid2 container spacing={3}>
          <Grid2 xs={12} lg={8} sx={cellSx}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeCard />
            </ErrorBoundary>
          </Grid2>
          <Grid2 xs={12} lg={4} sx={cellSx}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BalancesCard title={'Your wOETH balances'} />
            </ErrorBoundary>
          </Grid2>
          <Grid2 xs={12} lg={8} sx={cellSx}>
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
