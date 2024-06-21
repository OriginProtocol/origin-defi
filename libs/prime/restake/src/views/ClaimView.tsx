import { alpha, Button, Divider, Stack, Typography } from '@mui/material';
import { Countdown } from '@origin/shared/components';
import { ConnectedButton, useFormat } from '@origin/shared/providers';
import { add } from 'date-fns';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

export const ClaimView = () => {
  const intl = useIntl();
  const { formatCurrency } = useFormat();

  const targetDate = add(new Date('2024-06-20'), { days: 7 });

  return (
    <Stack p={3}>
      <Stack direction="row" alignItems="center" mb={4}>
        <Stack width={0.5}>
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Wait time' })}
          </Typography>
          <Countdown
            targetDate={targetDate}
            valueLabelProps={{
              labelProps: { sx: { display: 'none' } },
              valueProps: { fontSize: 32, fontWeight: 'medium' },
            }}
            showUnits
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction="row" justifyContent="space-around" width={0.5} px={2}>
          <Stack alignItems="flex-start">
            <Typography variant="subtitle2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Available' })}
            </Typography>
            <Typography fontSize={16} fontWeight="medium">
              {intl.formatMessage(
                { defaultMessage: 'Ξ {amount}' },
                { amount: '62.257' },
              )}
            </Typography>
            <Typography variant="subtitle2">
              {formatCurrency(13645456)}
            </Typography>
          </Stack>
          <Stack alignItems="flex-start">
            <Typography variant="subtitle2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Pending' })}
            </Typography>
            <Typography fontSize={16} fontWeight="medium">
              {intl.formatMessage(
                { defaultMessage: 'Ξ {amount}' },
                { amount: '0' },
              )}
            </Typography>
            <Typography variant="subtitle2">{formatCurrency(0)}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <ConnectedButton
        sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60, mb: 2 }}
      >
        {intl.formatMessage({ defaultMessage: 'Claim OETH' })}
      </ConnectedButton>
      <Button
        component={RouterLink}
        to="/restake/migrate"
        sx={{
          fontSize: 20,
          py: 2,
          borderRadius: 8,
          height: 60,
          color: '#fff',
          backgroundColor: '#000',
          '&:hover': {
            color: '#fff',
            backgroundColor: alpha('#000', 0.8),
          },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Pre-Mint ynLSD' })}
      </Button>
    </Stack>
  );
};
