import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { TokenChip, useOgnInfo } from '@origin/defi/shared';
import { InfoTooltipLabel, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useOgnUserInfoQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';

export const VotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const { data: user, isLoading: isUserLoading } = useOgnUserInfoQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data?.ognAddresses?.at?.(0) },
  );

  const percent =
    +formatUnits(
      BigInt(user?.votingPower ?? 0n),
      tokens.mainnet.xOGN.decimals,
    ) / +formatUnits(info?.xOgnTotalSupply ?? 1n, tokens.mainnet.xOGN.decimals);

  return (
    <Card {...props}>
      <CardHeader
        title={
          <InfoTooltipLabel
            labelProps={{ variant: 'inherit' }}
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The share of total Origin DAO voting power earned by your OGN lockups',
            })}
          >
            {intl.formatMessage({
              defaultMessage: 'Voting Power',
            })}
          </InfoTooltipLabel>
        }
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
      ) : (
        <CardContent>
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'Connect your wallet to see your voting power',
            })}
          </Typography>
        </CardContent>
      )}
      <CardContent sx={{ pt: 0 }}>
        <Stack useFlexGap>
          <Button
            component={RouterLink}
            to="/more"
            sx={{ mb: 1 }}
            variant="outlined"
            color="secondary"
          >
            {intl.formatMessage({ defaultMessage: 'View proposals' })}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
