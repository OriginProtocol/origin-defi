import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { InfoTooltip, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();

  return (
    <Card {...props}>
      <CardContent>
        <ValueLabel
          label={
            <Typography>
              {intl.formatMessage({ defaultMessage: 'My Voting Power' })}&nbsp;
              <InfoTooltip
                tooltipLabel={intl.formatMessage({
                  defaultMessage: 'Voting power',
                })}
              />
            </Typography>
          }
          value={
            <Stack direction="row">
              <Box component="img" src={tokens.mainnet.veOGV.icon} width={24} />
              <Typography>{formatAmount(512432.82)}</Typography>
              <Typography>
                {intl.formatMessage(
                  {
                    defaultMessage: '({value} of total votes)',
                  },
                  {
                    value: intl.formatNumber(0.00563, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                  },
                )}
              </Typography>
            </Stack>
          }
        />
      </CardContent>
    </Card>
  );
};
