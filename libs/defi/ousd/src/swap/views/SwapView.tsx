import { Box, Container, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PageTitle, Swapper } from '@origin/defi/shared';
import { OUSD } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import { ousdSwapActions } from '../actions';
import { CexCard } from '../components/CexCard';
import { FAQCard } from '../components/FAQCard';
import { OusdDetailCard } from '../components/OusdDetailCard';
import { ousdSwapRoutes } from '../constants';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Container>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Swap' })}
        subtitle={intl.formatMessage({
          defaultMessage:
            'Secure the most competitive rates when swapping in and out of OETH using our swap form.',
        })}
        icon={OUSD}
      />
      <Box>
        <Grid2 container spacing={4}>
          <Grid2 xs={12} md={8}>
            <Stack spacing={4}>
              <Swapper
                swapActions={ousdSwapActions}
                swapRoutes={ousdSwapRoutes}
                buttonsProps={{ variant: 'action' }}
              />
              <CexCard />
              <FAQCard />
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={4}>
            <OusdDetailCard />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};
