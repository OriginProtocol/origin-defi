import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from '@mui/material';
import { useOgvInfo, useOgvUserInfoQuery } from '@origin/defi/shared';
import {
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { cardContentProps } from '../styles';

import type { CardProps } from '@mui/material';

export const VotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();
  const { data: user, isLoading: isUserLoading } = useOgvUserInfoQuery(
    { address: address ?? ZERO_ADDRESS },
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
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'My voting power',
        })}
      />
      <CardContent {...cardContentProps}>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <TokenIcon token={tokens.mainnet.veOGV} sx={{ fontSize: 28 }} />
          <LoadingLabel
            sWidth={60}
            isLoading={isInfoLoading || isUserLoading}
            sx={{ fontSize: 16 }}
          >
            {formatAmount(
              BigInt(user?.votingPower ?? '0'),
              tokens.mainnet.veOGV.decimals,
              undefined,
              { notation: 'compact', maximumSignificantDigits: 4 },
            )}
          </LoadingLabel>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <LoadingLabel
            sWidth={60}
            isLoading={isInfoLoading || isUserLoading}
            sx={{ fontSize: 16 }}
          >
            {percent <= 1e-6 && percent > 0 && `~ `}
            {intl.formatNumber(percent, {
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            })}
          </LoadingLabel>
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'Percentage of total votes',
            })}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardContent
        {...cardContentProps}
        sx={{ ...cardContentProps?.sx, justifyContent: 'flex-end' }}
      >
        <Button variant="outlined" color="secondary" size="small">
          {intl.formatMessage({ defaultMessage: 'View proposals' })}
        </Button>
      </CardContent>
    </Card>
  );
};
