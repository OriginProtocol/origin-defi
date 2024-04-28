import { Box, Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Page, products, SectionTitle } from '@origin/defi/shared';
import { useIntl } from 'react-intl';

import { ProductCard } from '../components/ProductCard';
import { StakeOGNCard } from '../components/StakeOGNCard';

export const HomeView = () => {
  const intl = useIntl();

  return (
    <Page showFooterMargin>
      <Container>
        <Stack spacing={2} sx={{ justifyContent: 'center', py: 6 }}>
          <Typography variant="h5" textAlign="center">
            {intl.formatMessage({ defaultMessage: 'Origin' })}
          </Typography>
          <Typography variant="mono" textAlign="center" color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'The easiest way to earn more yield on-chain',
            })}
          </Typography>
        </Stack>
        <SectionTitle
          dotColor="primary.main"
          label={intl.formatMessage({ defaultMessage: 'Products' })}
        />
        <Box py={3}>
          <Grid2 container spacing={3}>
            {[products.oeth, products.primeETH, products.ousd].map(
              (product) => (
                <Grid2 key={product.token.symbol} xs={12} md={4}>
                  <ProductCard product={product} sx={{ height: 1 }} />
                </Grid2>
              ),
            )}
          </Grid2>
        </Box>
        <SectionTitle
          dotColor="primary.main"
          label={intl.formatMessage({ defaultMessage: 'Governance' })}
        />
        <StakeOGNCard sx={{ my: 3 }} />
      </Container>
    </Page>
  );
};
