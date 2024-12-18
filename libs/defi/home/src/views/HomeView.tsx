import { Container, Stack, Typography } from '@mui/material';
import { Page, SuperOethbBanner } from '@origin/defi/shared';
import { useIntl } from 'react-intl';

import {
  ArmVaultCard,
  LSTCard,
  StableCard,
  StakingCard,
} from '../components/Cards';

export const HomeView = () => {
  const intl = useIntl();

  return (
    <Page showFooterMargin>
      <Container>
        <Stack spacing={2} sx={{ justifyContent: 'center', py: 6 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Better yield. Everywhere.',
            })}
          </Typography>
          <Typography
            variant="mono"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'The easiest way to earn more yield on-chain',
            })}
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <SuperOethbBanner />
          <LSTCard />
          <ArmVaultCard />
          <StakingCard />
          <StableCard />
        </Stack>
      </Container>
    </Page>
  );
};
