import { Box, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { ChartButton } from './ChartButton';
import { Card } from '@origin/shared/components';

export function ChartCard() {
  const intl = useIntl();
  return (
    <Card
      sx={{ mt: 3 }}
      title={
        <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography color="primary.contrastText">History</Typography>
          <Stack direction="row" gap={2} sx={{marginInline: 'auto'}}>
            {[
              intl.formatMessage({ defaultMessage: 'Received' }),
              intl.formatMessage({ defaultMessage: 'Sent' }),
              intl.formatMessage({ defaultMessage: 'Swap' }),
              intl.formatMessage({ defaultMessage: 'Yield' }),
            ].map((label) => (
              <ChartButton key={label} circle>
                {label}
              </ChartButton>
            ))}
          </Stack>
          <ChartButton>{intl.formatMessage({defaultMessage: 'Export CSV'})}</ChartButton>
        </Stack>
      }
    >
      <Box sx={{ height: '15rem', display: 'grid', placeContent: 'center' }}>
        <Typography>
          {intl.formatMessage({defaultMessage: 'Connect your wallet to see your history'})}
        </Typography>
      </Box>
    </Card>
  );
}
