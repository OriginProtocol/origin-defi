import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const LockupsCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Lock-ups' })}
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>
              {intl.formatMessage({ defaultMessage: 'My vAPY' })}
            </Typography>
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The current APY you are earning across all of your lock-ups.',
              })}
            />
            <Typography
              variant="h3"
              sx={{
                background:
                  'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {intl.formatNumber(0.2489, {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          color="text.secondary"
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'OGV' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Lock-up Ends' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Time Remaining' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Voting Power' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'veOGV' })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
