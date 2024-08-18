import { Container, Stack, Typography } from '@mui/material';
import { Page } from '@origin/defi/shared';
import { useIntl } from 'react-intl';

import { LSTCard, StableCard, StakingCard } from '../components/Cards';
import { SuperOethbBanner } from '../components/SuperOethbBanner';

export const HomeView = () => {
  const intl = useIntl();

  return (
    <Page showFooterMargin>
      <Container>
        <Stack spacing={2} sx={{ justifyContent: 'center', py: 6 }}>
          <Typography variant="h5" textAlign="center">
            {intl.formatMessage({
              defaultMessage: 'Better yield. Everywhere.',
            })}
          </Typography>
          <Typography variant="mono" textAlign="center" color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'The easiest way to earn more yield on-chain',
            })}
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <SuperOethbBanner />
          <LSTCard />
          <StakingCard />
          <StableCard />
        </Stack>
      </Container>
    </Page>
  );
};
