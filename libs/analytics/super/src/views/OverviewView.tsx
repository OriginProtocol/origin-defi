import { Stack, Typography } from '@mui/material';
import {
  ApyChartCard,
  TotalSupplyChartCard,
  useLayout,
} from '@origin/analytics/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

export const OverviewView = () => {
  const intl = useIntl();
  const [{ width }] = useLayout();

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        {intl.formatMessage({ defaultMessage: 'Super OETH overview' })}
      </Typography>
      <ApyChartCard token={tokens.base.superOETHb} width={width} height={400} />
      <TotalSupplyChartCard
        token={tokens.base.superOETHb}
        width={width}
        height={200}
      />
    </Stack>
  );
};
