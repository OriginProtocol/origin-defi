import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  BridgePromoCard,
  MergerBanner,
  Page,
  SectionTitle,
} from '@origin/defi/shared';
import { BadgeIcon, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { Yield } from '@origin/shared/icons';
import { usePushNotification } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { ProductCard } from '../components/ProductCard';
import { StakeOGNCard } from '../components/StakeOGNCard';
import { products } from '../constants';

import type { NotificationOptions } from '@origin/shared/providers';

export const HomeView = () => {
  const intl = useIntl();
  const push = usePushNotification();
  const [hideDuration, setHiderutaion] = useState<number | undefined>(5000);

  const option: NotificationOptions = {
    icon: (
      <BadgeIcon badgeContent={<Yield />}>
        <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 36 }} />
      </BadgeIcon>
    ),
    title: 'This is a cool notification',
    message: 'You earned a lot by reading this cool notif',
    hideDuration: hideDuration,
    blockExplorerLinkProps: {
      hash: '0x1126b73ae5dd212e7be2de170637a04c984771453164d04860aa205e72150b4a',
    },
  };

  const handleInfo = () => {
    push({
      ...option,
      severity: 'info',
    });
  };
  const handleSuccess = () => {
    push({
      ...option,
      severity: 'success',
    });
  };
  const handleError = () => {
    push({
      ...option,
      severity: 'error',
    });
  };
  const handleWarning = () => {
    push({
      ...option,
      severity: 'warning',
    });
  };

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

        <FormControlLabel
          label="autoHide"
          control={<Switch checked={!!hideDuration} />}
          onChange={() => {
            setHiderutaion((prev) => (prev ? undefined : 5000));
          }}
        />
        <Stack direction="row" alignItems="center" spacing={1} py={3}>
          <Button onClick={handleInfo}>Info</Button>
          <Button onClick={handleSuccess}>Success</Button>
          <Button onClick={handleError}>Error</Button>
          <Button onClick={handleWarning}>Warning</Button>
        </Stack>

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
              <BridgePromoCard />
            </Grid2>
          </Grid2>
        </Box>
        <SectionTitle
          dotColor="primary.main"
          label={intl.formatMessage({ defaultMessage: 'Governance' })}
        />
        <MergerBanner
          sx={{ my: 3 }}
          endSlot={
            <Button component={RouterLink} to="/more/migration" size="large">
              {intl.formatMessage({ defaultMessage: 'Convert' })}
            </Button>
          }
        />
        <StakeOGNCard />
      </Container>
    </Page>
  );
};
