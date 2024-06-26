import { Box, Container, Stack } from '@mui/material';
import { trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { BalancesCard } from '../components/BalancesCard';
import { BridgeActivityCard } from '../components/BridgeActivityCard';
import { BridgeCard } from '../components/BridgeCard';
import { BridgeProvider } from '../state';

export function BridgeView() {
  const intl = useIntl();
  const cardWidth = { xs: 1, sm: 552 };
  const cardWidthSide = { xs: 1, sm: 552, lg: 375 };
  return (
    <BridgeProvider>
      <Container
        sx={{
          mt: 3,
          mb: 10,
        }}
      >
        <Stack
          width={1}
          justifyContent={{ lg: 'center' }}
          alignItems={{ xs: 'center', lg: 'inherit' }}
          direction={{ xs: 'column', lg: 'row' }}
          gap={3}
        >
          <Box minWidth={cardWidth} maxWidth={cardWidth}>
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeCard />
            </ErrorBoundary>
          </Box>
          <Stack minWidth={cardWidthSide} maxWidth={cardWidthSide} gap={3}>
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
            <ErrorBoundary
              ErrorComponent={<ErrorCard />}
              onError={trackSentryError}
            >
              <BridgeActivityCard />
            </ErrorBoundary>
          </Stack>
        </Stack>
      </Container>
    </BridgeProvider>
  );
}
