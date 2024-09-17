import { Stack, Typography } from '@mui/material';
import {
  ApyCard,
  ProtocolRevenueCard,
  TotalSupplyCard,
  useLayout,
  WrappedSupplyCard,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

export const OverviewView = () => {
  const intl = useIntl();
  const [{ width }] = useLayout();

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        {intl.formatMessage({ defaultMessage: 'OETH overview' })}
      </Typography>
      <ApyCard
        token={tokens.mainnet.OETH}
        width={width}
        height={400}
        from="2023-06-01T00:00:00.000000Z"
      />
      <TotalSupplyCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from="2023-06-01T00:00:00.000000Z"
      />
      <WrappedSupplyCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from="2023-06-01T00:00:00.000000Z"
      />
      <ProtocolRevenueCard
        token={tokens.mainnet.OETH}
        width={width}
        height={200}
        from="2023-06-01T00:00:00.000000Z"
      />
    </Stack>
  );
};
