import { Box, Container, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PageTitle, Swapper, trackEvent } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { oethSwapActions } from '../actions';
import { CexCard } from '../components/CexCard';
import { FAQCard } from '../components/FAQCard';
import { OethDetailCard } from '../components/OethDetailCard';
import { oethSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Container maxWidth="md">
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Swap' })}
        subtitle={intl.formatMessage({
          defaultMessage:
            'Secure the most competitive rates when swapping in and out of OETH using our swap form.',
        })}
        token={tokens.mainnet.OETH}
      />
      <Box>
        <Grid2 container spacing={4}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={4}>
              <Swapper
                swapActions={oethSwapActions}
                swapRoutes={oethSwapRoutes}
                buttonsProps={{ variant: 'action' }}
                trackEvent={trackEvent}
              />
              <CexCard />
              <FAQCard />
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={4}>
            <OethDetailCard />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};
