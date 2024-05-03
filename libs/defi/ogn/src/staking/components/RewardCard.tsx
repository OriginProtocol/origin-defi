import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useOgnInfo } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { TxButton, useFormat, useTxButton } from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import { StakeRewardButton } from './StakeRewardModal';

import type { CardProps } from '@mui/material';

export const RewardCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const config = useConfig();
  const queryClient = useQueryClient();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const { params, callbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'collectRewards',
      args: [],
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [useOgnInfo.getKey(address, config)],
        });
      },
    },
    activity: {
      title: intl.formatMessage({ defaultMessage: 'Collect Rewards' }),
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Collect {rewards} rewards OGV',
        },
        {
          rewards: formatAmount(
            info?.xOgnRewards,
            tokens.mainnet.xOGN.decimals,
            undefined,
            { notation: 'compact', maximumSignificantDigits: 4 },
          ),
        },
      ),
    },
  });

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'OGN rewards available to claim',
        })}
      />
      <Divider />
      <CardContent>
        <Stack useFlexGap>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={3}
          >
            <LoadingLabel
              variant="featured3"
              fontWeight="bold"
              isLoading={isInfoLoading}
            >
              {formatAmount(
                info?.xOgnRewards ?? 0n,
                tokens.mainnet.OGN.decimals,
              )}
            </LoadingLabel>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 24 }} />
              <Typography variant="featured3">
                {tokens.mainnet.OGN.symbol}
              </Typography>
            </Stack>
          </Stack>
          <StakeRewardButton sx={{ mb: 1 }}>
            {intl.formatMessage({ defaultMessage: 'Add to stake' })}
          </StakeRewardButton>
          <TxButton
            params={params}
            callbacks={callbacks}
            label={intl.formatMessage({ defaultMessage: 'Claim' })}
            variant="outlined"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
