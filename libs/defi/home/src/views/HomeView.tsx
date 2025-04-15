import { Container, Stack, Typography } from '@mui/material';
import { Page, SonicBanner } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { ARMRow } from '../components/ARMRow';
import { GovernanceRow } from '../components/GovernanceRow';
import { HeaderRow } from '../components/HeaderRow';
import { TokenRow } from '../components/TokenRow';

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
          <SonicBanner />
          <HeaderRow />
          <TokenRow
            token={tokens.mainnet.OUSD}
            currency="USD"
            productDescription={intl.formatMessage({
              defaultMessage: 'Stablecoin',
            })}
            href="ousd"
          />
          <TokenRow
            token={tokens.sonic.OS}
            currency="S"
            productDescription={intl.formatMessage({
              defaultMessage: 'LST',
            })}
            href="os"
          />
          <ARMRow />
          <GovernanceRow />
          <TokenRow
            token={tokens.base.superOETHb}
            currency="ETH"
            productDescription={intl.formatMessage({
              defaultMessage: 'Supercharged LST',
            })}
            href="super"
          />
          <TokenRow
            token={tokens.plume.superOETHp}
            currency="ETH"
            productDescription={intl.formatMessage({
              defaultMessage: 'Supercharged LST',
            })}
            href="super"
          />
          <TokenRow
            token={tokens.mainnet.OETH}
            currency="ETH"
            productDescription={intl.formatMessage({
              defaultMessage: 'LST',
            })}
            href="oeth"
          />
        </Stack>
      </Container>
    </Page>
  );
};
