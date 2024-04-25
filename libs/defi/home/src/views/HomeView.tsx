import { Box, Container, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useIntl } from 'react-intl';

import { ProductCard } from '../components/ProductCard';
import { StakeOGNCard } from '../components/StakeOGNCard';
import { products } from '../constants';

export const HomeView = () => {
  const intl = useIntl();

  return (
    <Container>
      <Stack mb={5}>
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              width: 10,
              height: 10,
            }}
          />
          <Typography variant="mono">
            {intl.formatMessage({ defaultMessage: 'Products' })}
          </Typography>
        </Stack>
        <Box py={3}>
          <Grid2 container spacing={3}>
            {products.map((product) => (
              <Grid2 key={product.token.symbol} xs={12} md={4}>
                <ProductCard product={product} sx={{ height: 1 }} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              width: 10,
              height: 10,
            }}
          />
          <Typography variant="mono">
            {intl.formatMessage({ defaultMessage: 'Governance' })}
          </Typography>
        </Stack>
        <StakeOGNCard sx={{ my: 3 }} />
      </Stack>
    </Container>
  );
};
