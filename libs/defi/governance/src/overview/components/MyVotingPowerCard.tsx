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
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';

export const MyVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();

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
                BigInt(info?.xOgnBalance ?? '0'),
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
            isLoading={isInfoLoading}
            value={intl.formatMessage(
              {
                defaultMessage: '{value}',
              },
              {
                value: intl.formatNumber(info?.votingPowerPercent ?? 0, {
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
