import { Box, Card, CardContent, Divider, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ValueLabel } from '@origin/shared/components';
import { useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { usePendingYield } from '../hooks';
import { useOusdHistoryUserStatQuery } from '../queries.generated';

import type { BoxProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const StatCards = (props: BoxProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: lifetimeEarnings, isLoading: isLifetimeEarningsLoading } =
    useOusdHistoryUserStatQuery(
      { address: address ?? ZERO_ADDRESS },
      {
        enabled: !!address,
        select: (data) => data?.ousdAddresses?.at(0),
      },
    );
  const { data: pendingYield, isLoading: pendingYieldLoading } =
    usePendingYield();

  return (
    <Box {...props}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <Card sx={{ backgroundColor: 'background.default' }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider flexItem orientation="vertical" />}
              >
                <ValueLabel
                  label={intl.formatMessage({
                    defaultMessage: 'Lifetime earnings',
                  })}
                  value={
                    isConnected
                      ? formatAmount(BigInt(lifetimeEarnings?.earned ?? '0'))
                      : '-'
                  }
                  isLoading={isConnected && isLifetimeEarningsLoading}
                  {...valueLabelProps}
                />
                <ValueLabel
                  label={intl.formatMessage({
                    defaultMessage: 'Pending yield',
                  })}
                  value={isConnected ? formatAmount(pendingYield) : '-'}
                  isLoading={isConnected && pendingYieldLoading}
                  {...valueLabelProps}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Card sx={{ backgroundColor: 'background.default' }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider flexItem orientation="vertical" />}
              >
                <ValueLabel
                  label={intl.formatMessage({
                    defaultMessage: '24hr earnings',
                  })}
                  value={isConnected ? formatAmount(pendingYield) : '-'}
                  isLoading={isConnected && pendingYieldLoading}
                  {...valueLabelProps}
                />
                <ValueLabel
                  label={intl.formatMessage({
                    defaultMessage: '7d earnings',
                  })}
                  value={isConnected ? formatAmount(pendingYield) : '-'}
                  isLoading={isConnected && pendingYieldLoading}
                  {...valueLabelProps}
                />
                <ValueLabel
                  label={intl.formatMessage({
                    defaultMessage: '30d earnings',
                  })}
                  value={isConnected ? formatAmount(pendingYield) : '-'}
                  isLoading={isConnected && pendingYieldLoading}
                  {...valueLabelProps}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  labelProps: { variant: 'body1' },
  valueProps: { variant: 'body1', sx: { fontSize: 16 } },
  sx: { width: 1, alignItems: 'center' },
};
