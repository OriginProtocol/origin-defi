import { Grid2, Stack } from '@mui/material';
import { Page, PageSection, PageTitle } from '@origin/defi/shared';
import { ARM } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import {
  AboutCard,
  ApyCard,
  ContractInfoCard,
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
        title={intl.formatMessage({
          defaultMessage: 'ETH Vault: stETH Redemptions',
        })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Passive earnings on ETH',
        })}
        icon={ARM}
      >
        <PageTitleSection />
      </PageTitle>
      <PageSection containerProps={{ maxWidth: 'lg' }}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 7 }} order={{ xs: 1, md: 0 }}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={3}
                sx={{ alignItems: 'flex-start' }}
              >
                <ApyCard sx={{ width: 1, height: 170 }} />
                <TvlCard sx={{ width: 1, height: 170 }} />
              </Stack>
              <AboutCard />
              <ApyChart height={200} />
              <TvlChart height={200} />
              <OwnershipChart height={200} />
              <ContractInfoCard />
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
