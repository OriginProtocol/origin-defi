import { Stack, Typography } from '@mui/material';
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
      <Stack direction="row" spacing={2} alignItems="stretch">
        {products.map((product) => (
          <ProductCard
            key={product.token.symbol}
            href={
              product.token.symbol !== 'OGN'
                ? product.token.symbol.toLowerCase()
                : undefined
            }
            product={product}
            width={0.33}
          />
        ))}
      </Stack>
      <StakeOGVCard />
    </Stack>
  );
};
