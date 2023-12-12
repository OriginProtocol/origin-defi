import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton, useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const {
    data: { veOgvBalance, votingPowerPercent },
  } = useGovernanceInfo();

  return (
    <Card {...props}>
      <CardContent>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'My Voting Power' })}
          value={
            isConnected ? (
              <Stack direction="row" alignItems="baseline" spacing={0.75}>
                <Box
                  component="img"
                  src={tokens.mainnet.veOGV.icon}
                  width={26}
                  sx={{ transform: 'translateY(4px)' }}
                />
                <Typography variant="h3">
                  {formatAmount(veOgvBalance, tokens.mainnet.veOGV.decimals)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: '({value} of total votes)',
                    },
                    {
                      value: intl.formatNumber(votingPowerPercent, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    },
                  )}
                </Typography>
              </Stack>
            ) : (
              <ConnectedButton
                sx={{
                  minWidth: 160,
                  background:
                    'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                  ':hover': {
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                  },
                }}
              />
            )
          }
          spacing={1.5}
          sx={{ width: 1, alignItems: 'flex-start' }}
        />
      </CardContent>
    </Card>
  );
};
