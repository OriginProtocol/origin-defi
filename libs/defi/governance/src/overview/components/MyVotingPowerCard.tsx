import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useOgnInfo } from '@origin/defi/shared';
import { TokenChip, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserInfoQuery } from '../queries.generated';
import { DelegationPanel } from './DelegationPanel';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const { data: user, isLoading: isUserLoading } = useUserInfoQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data?.ogvAddresses?.at?.(0) },
  );

  const percent =
    +formatUnits(
      BigInt(user?.votingPower ?? 0n),
      tokens.mainnet.xOGN.decimals,
    ) / +formatUnits(info?.xOgnTotalSupply ?? 1n, tokens.mainnet.xOGN.decimals);

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your voting power' })}
      />
      <Divider />
      {isConnected ? (
        <>
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Typography variant="featured3" fontWeight="bold">
                {formatAmount(
                  BigInt(user?.votingPower ?? '0'),
                  tokens.mainnet.xOGN.decimals,
                  undefined,
                  { notation: 'compact', maximumSignificantDigits: 4 },
                )}
              </Typography>
              <TokenChip
                token={tokens.mainnet.xOGN}
                iconProps={{ sx: { fontSize: 24 } }}
                labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
              />
            </Stack>
            <ValueLabel
              label={intl.formatMessage({
                defaultMessage: 'Percentage of total votes',
              })}
              labelProps={{
                variant: 'body3',
                color: 'text.secondary',
                fontWeight: 'medium',
              }}
              isLoading={isInfoLoading || isUserLoading}
              value={intl.formatMessage(
                {
                  defaultMessage: '{tilt}{value}',
                },
                {
                  value: intl.formatNumber(percent, {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                  }),
                  tilt: percent <= 1e-6 && percent > 0 ? `~ ` : '',
                },
              )}
              sx={{ width: 1, alignItems: 'flex-start' }}
            />
          </CardContent>
          <CardContent sx={{ pt: 0 }}>
            <DelegationPanel />
          </CardContent>
        </>
      ) : (
        <CardContent>
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your voting power',
            })}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};