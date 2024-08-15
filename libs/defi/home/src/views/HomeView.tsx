import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  BridgePromoCard,
  MergerBanner,
  Page,
  SectionTitle,
  trackSentryError,
} from '@origin/defi/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { LSTCard } from '../components/LSTCard';
import { ProductCard } from '../components/ProductCard';
import { StakeOGNCard } from '../components/StakeOGNCard';
import { SuperOethbBanner } from '../components/SuperOethbBanner';
import { products } from '../constants';

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
        <SuperOethbBanner />
        <LSTCard />
        <SectionTitle
          dotColor="primary.main"
          label={intl.formatMessage({ defaultMessage: 'Products' })}
        />
        <Box pt={3} pb={6}>
          <Grid2 container spacing={3}>
            {[products.oeth, products.ousd].map((product) => (
              <Grid2 key={product.token.symbol} xs={12} md={4}>
                <ProductCard product={product} sx={{ height: 1 }} />
              </Grid2>
            ))}
            <Grid2 xs={12} md={4}>
              <BridgePromoCard sx={{ height: 1 }} />
            </Grid2>
          </Grid2>
        </Box>
        <SectionTitle
          dotColor="primary.main"
          label={intl.formatMessage({ defaultMessage: 'Governance' })}
        />
        <ErrorBoundary
          ErrorComponent={<ErrorCard />}
          onError={trackSentryError}
        >
          <MergerBanner
            sx={{ my: 3 }}
            endSlot={
              <Button component={RouterLink} to="/more/migration" size="large">
                {intl.formatMessage({ defaultMessage: 'Convert' })}
              </Button>
            }
          />
        </ErrorBoundary>
        <ErrorBoundary
          ErrorComponent={<ErrorCard />}
          onError={trackSentryError}
        >
          <StakeOGNCard />
        </ErrorBoundary>
      </Container>
    </Page>
  );
};
