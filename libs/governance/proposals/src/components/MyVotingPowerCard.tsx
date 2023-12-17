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
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();

  return (
    <Card {...props}>
      <CardContent>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'My Voting Power' })}
          isLoading={isInfoLoading}
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
                  {formatAmount(
                    info?.veOgvBalance ?? 0n,
                    tokens.mainnet.veOGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: '({value} of total votes)',
                    },
                    {
                      value: intl.formatNumber(info?.votingPowerPercent ?? 0, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    },
                  )}
                </Typography>
              </Stack>
            ) : (
              <ConnectedButton variant="connect" />
            )
          }
          spacing={1.5}
          sx={{ width: 1, alignItems: 'flex-start' }}
        />
      </CardContent>
    </Card>
  );
};
