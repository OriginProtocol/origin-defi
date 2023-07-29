import { Box, Stack, Typography } from '@mui/material';
import { Card } from '@origin/shared/components';
import { useIntl } from 'react-intl';

export function SwapRoute() {
  const intl = useIntl();
  return (
    <Card title={intl.formatMessage({ defaultMessage: 'Swap Routes' })}>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            {intl.formatMessage({ defaultMessage: '(estimate)' })}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
