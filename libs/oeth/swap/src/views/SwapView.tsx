import { Card, Container, Stack, Typography } from '@mui/material';
import { ApyHeader, trackEvent, trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { ArbitrumBW } from '@origin/shared/icons';
import { Swapper } from '@origin/shared/providers';
import { Link } from 'react-router-dom';

import { swapActions } from '../actions';
import { swapRoutes } from '../constants';

export const SwapView = () => {
  return (
    <Container
      sx={{
        mt: 3,
        mb: 10,
      }}
      maxWidth="sm"
    >
      <Stack spacing={3}>
        <ErrorBoundary
          ErrorComponent={<ErrorCard />}
          onError={trackSentryError}
        >
          <ApyHeader />
        </ErrorBoundary>
        <ErrorBoundary
          ErrorComponent={<ErrorCard />}
          onError={trackSentryError}
        >
          <Swapper
            swapActions={swapActions}
            swapRoutes={swapRoutes}
            onError={trackSentryError}
            trackEvent={trackEvent}
            buttonsProps={{ variant: 'action' }}
          />
        </ErrorBoundary>
        <Link to={'/bridge'} style={{ textDecoration: 'none' }}>
          <Card sx={{ borderRadius: 4 }}>
            {/* Not using a CardContent here because at small sizes it has thicker
               padding at the bottom which we don't want. */}
            <Stack
              p={{ xs: 2, sm: 3 }}
              direction={'row'}
              alignItems={'center'}
              spacing={3}
            >
              <ArbitrumBW sx={{ fontSize: '32px' }} />
              <Stack spacing={1}>
                <Typography fontWeight={'bold'} fontSize={16}>
                  Arbitrum bridge
                </Typography>
                <Typography color={'text.secondary'} fontSize={16}>
                  Transfer wOETH to the Arbitrum network
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Link>
      </Stack>
    </Container>
  );
};
