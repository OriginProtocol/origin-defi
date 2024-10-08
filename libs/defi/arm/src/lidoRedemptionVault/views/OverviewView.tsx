import { Grid2, Stack } from '@mui/material';
import { Page, PageSection, PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { ARM } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import {
  AboutCard,
  ApyCard,
  TvlCard,
  VaultBalanceCard,
} from '../components/Cards';
import { ApyChart, OwnershipChart, TvlChart } from '../components/Charts';
import { OperationPanel } from '../components/OperationPanel';
import { PageTitleSection } from '../components/PageTitleSection';
export const OverviewView = () => {
  const intl = useIntl();

  return (
    <Page>
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'stETH Redemption Vault' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'This ETH vault funds Lido stETH redeems',
        })}
        icon={ARM}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 7 }} order={{ xs: 1, md: 0 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <ApyCard sx={{ width: 1 }} />
                <TvlCard sx={{ width: 1 }} />
              </Stack>
              <AboutCard />
              <ApyChart
                token={tokens.mainnet.OETH}
                height={200}
                from="2023-06-01T00:00:00.000000Z"
              />
              <TvlChart
                token={tokens.mainnet.OETH}
                height={200}
                from="2023-06-01T00:00:00.000000Z"
              />
              <OwnershipChart
                token={tokens.mainnet.OETH}
                height={200}
                from="2023-06-01T00:00:00.000000Z"
              />
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 5 }} order={{ xs: 0, md: 1 }}>
            <Stack spacing={3}>
              <OperationPanel />
              <VaultBalanceCard />
            </Stack>
          </Grid2>
        </Grid2>
      </PageSection>
    </Page>
  );
};
