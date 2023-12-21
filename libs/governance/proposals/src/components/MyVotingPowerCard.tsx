import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useGovernanceInfo, useUserInfoQuery } from '@origin/governance/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton, useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();
  const { data: user, isLoading: isUserLoading } = useUserInfoQuery(
    { address: address?.toLowerCase() },
    { enabled: !!address, select: (data) => data?.ogvAddresses?.at?.(0) },
  );

  const percent =
    +formatUnits(
      BigInt(user?.votingPower ?? 0n),
      tokens.mainnet.veOGV.decimals,
    ) /
    +formatUnits(info?.veOgvTotalSupply ?? 1n, tokens.mainnet.veOGV.decimals);

  return (
    <Card {...props}>
      <CardContent>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'My Voting Power' })}
          labelProps={{ sx: { fontSize: 14 } }}
          isLoading={isInfoLoading || isUserLoading}
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
                    BigInt(user?.votingPower ?? '0'),
                    tokens.mainnet.veOGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {percent <= 1e-6 && percent > 0 && `~ `}
                  {intl.formatMessage(
                    {
                      defaultMessage: '({value} of total votes)',
                    },
                    {
                      value: intl.formatNumber(percent, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
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
