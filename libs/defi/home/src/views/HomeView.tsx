import { Box, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useIntl } from 'react-intl';

import { ProductCard } from '../components/ProductCard';
import { StakeOGVCard } from '../components/StakeOGVCard';
import { products } from '../constants';

export const HomeView = () => {
  const intl = useIntl();

  return (
    <Stack spacing={4} mb={5}>
      <Stack spacing={3} sx={{ justifyContent: 'center', py: 15 }}>
        <Typography variant="h1" textAlign="center">
          {intl.formatMessage({ defaultMessage: 'Origin products' })}
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
        >
          {intl.formatMessage({
            defaultMessage:
              'Origin provides a decentralized suite of products helping you earn yield on your digital assets',
          })}
        </Typography>
      </Stack>
      <Box>
        <Grid2 container spacing={2}>
          {products.map((product) => (
            <Grid2 key={product.token.symbol} xs={12} sm={6} md={4}>
              <ProductCard
                href={
                  product.token.symbol !== 'OGN'
                    ? product.token.symbol.toLowerCase()
                    : undefined
                }
                product={product}
                height={1}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <StakeOGVCard />
    </Stack>
  );
};
