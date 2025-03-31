import { Box, Grid, Stack } from '@mui/material';
import {
  AdCards,
  GlobalStatsCard,
  trackSentryError,
} from '@origin/prime/shared';
import { ErrorBoundary, ErrorCard, ErrorPage } from '@origin/shared/components';
import { useReferrerTracker } from '@origin/shared/providers';
import { Outlet } from 'react-router';

import { Topnav } from './components/Topnav';

export const App = () => {
  useReferrerTracker('Origin');

  return (
    <ErrorBoundary
      ErrorComponent={<ErrorPage height={1} width={1} />}
      onError={trackSentryError}
    >
      <Stack
        sx={{
          minWidth: 370,
          mb: 5,
        }}
      >
        <Topnav />
        <Box
          sx={{
            px: { xs: 2, md: 4 },
          }}
        >
          <Grid container spacing={4}>
            <Grid
              sx={{ order: { xs: 2, md: 1 } }}
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <AdCards
                sx={{
                  gap: 3,
                  maxWidth: { xs: 1, md: 250 },
                  flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                }}
              />
            </Grid>
            <Grid
              sx={{ order: { xs: 1, md: 2 } }}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Outlet />
            </Grid>
            <Grid
              sx={{ order: 3 }}
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <Stack
                sx={{
                  alignItems: 'flex-end',
                }}
              >
                <ErrorBoundary
                  ErrorComponent={<ErrorCard />}
                  onError={trackSentryError}
                >
                  <GlobalStatsCard
                    sx={{ width: 1, maxWidth: { xs: 1, md: 250 } }}
                  />
                </ErrorBoundary>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </ErrorBoundary>
  );
};
