import { Card, CardContent, Grid2, Stack } from '@mui/material';
import { Overview } from '@origin/analytics/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useTvl } from '@origin/shared/providers';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import { OethDistributionCard } from '../components/OethDistributionCard';

export const OverviewView = () => {
  const intl = useIntl();
  const { data: mainnetTvl, isLoading: isMainnetTvlLoading } = useTvl(
    tokens.mainnet.OETH,
  );
  const { data: arbTvl, isLoading: isArbTvlLoading } = useTvl(
    tokens.arbitrum.wOETH,
  );

  return (
    <Overview token={tokens.mainnet.OETH} currency="ETH">
      <Grid2 size={12}>
        <Stack
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: 2,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Card sx={{ width: 1 }}>
                <CardContent>
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Ethereum TVL',
                    })}
                    value={format(mainnetTvl ?? from(0), 2)}
                    isLoading={isMainnetTvlLoading}
                    currency="ETH"
                  />
                </CardContent>
              </Card>
              <Card sx={{ width: 1 }}>
                <CardContent>
                  <ValueLabel
                    label={intl.formatMessage({
                      defaultMessage: 'Arbitrum TVL',
                    })}
                    value={format(arbTvl ?? from(0), 2)}
                    isLoading={isArbTvlLoading}
                    currency="ETH"
                  />
                </CardContent>
              </Card>
            </Stack>
            <OethDistributionCard height={300} />
          </Stack>
        </Stack>
      </Grid2>
    </Overview>
  );
};
