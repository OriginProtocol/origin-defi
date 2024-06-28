import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { TokenChip, useOgnInfo } from '@origin/defi/shared';
import { LoadingLabel, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { div, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useUserVotingPowerQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: ognInfo, isLoading: isOgnInfoLoading } = useOgnInfo();
  const { data: info, isLoading: isInfoLoading } = useUserVotingPowerQuery(
    {
      address: address ?? '',
    },
    {
      enabled: isConnected,
      select: (data) =>
        data.esAccounts.find(
          (a) =>
            a?.address?.toLowerCase() ===
            tokens.mainnet.xOGN.address.toLowerCase(),
        ),
    },
  );

  const votingPowerPercent = toNumber(
    div(
      [BigInt(info?.votingPower ?? 0), tokens.mainnet.xOGN.decimals],
      [BigInt(ognInfo?.xOgnTotalSupply ?? 1), tokens.mainnet.xOGN.decimals],
    ),
  );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your voting power' })}
      />
      <Divider />
      {isConnected ? (
        <CardContent>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <LoadingLabel
              isLoading={isInfoLoading}
              variant="featured3"
              fontWeight="bold"
            >
              {formatAmount(
                BigInt(info?.votingPower ?? '0'),
                tokens.mainnet.xOGN.decimals,
                undefined,
                { notation: 'compact', maximumSignificantDigits: 4 },
              )}
            </LoadingLabel>
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
            isLoading={isInfoLoading || isOgnInfoLoading}
            value={intl.formatMessage(
              {
                defaultMessage: '{value}',
              },
              {
                value: intl.formatNumber(votingPowerPercent ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 5,
                }),
              },
            )}
            sx={{ width: 1, alignItems: 'flex-start' }}
          />
          {/* <DelegationPanel mt={3} /> */}
        </CardContent>
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
