import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Stack,
} from '@mui/material';
import { TokenChip, useTxButton } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  TxButton,
  useFormat,
  useWatchContract,
} from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { StakeRewardButton } from './StakeRewardModal';

import type { CardProps } from '@mui/material';

export const RewardCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const { data: rewards, isLoading: isRewardsLoading } = useWatchContract({
    address: tokens.mainnet.xOGN.address,
    abi: tokens.mainnet.xOGN.abi,
    functionName: 'previewRewards',
    args: [address ?? ZERO_ADDRESS],
    chainId: tokens.mainnet.xOGN.chainId,
  });
  const { params, callbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'collectRewards',
      args: [],
    },
    activity: {
      endIcon: <TokenIcon token={tokens.mainnet.OGN} />,
      title: intl.formatMessage({ defaultMessage: 'Collect Rewards' }),
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Collect {rewards} rewards',
        },
        {
          rewards: formatAmount(
            rewards,
            tokens.mainnet.xOGN.decimals,
            undefined,
            { notation: 'compact', maximumSignificantDigits: 4 },
          ),
        },
      ),
    },
  });

  const hasRewards = !isRewardsLoading && !!rewards && rewards > 0n;

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Rewards available',
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
          >
            <LoadingLabel
              variant="featured3"
              fontWeight="bold"
              isLoading={isRewardsLoading}
            >
              {formatAmount(rewards ?? 0n, tokens.mainnet.OGN.decimals)}
            </LoadingLabel>
            <TokenChip
              token={tokens.mainnet.OGN}
              iconProps={{ sx: { fontSize: 24 } }}
              labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
            />
          </Stack>
          <Collapse in={hasRewards}>
            <Stack useFlexGap>
              <StakeRewardButton sx={{ mt: 3, mb: 1 }} variant="outlined">
                {intl.formatMessage({ defaultMessage: 'Add to stake' })}
              </StakeRewardButton>
              <TxButton
                params={params}
                callbacks={callbacks}
                label={intl.formatMessage({ defaultMessage: 'Claim' })}
                variant="outlined"
              />
            </Stack>
          </Collapse>
        </Stack>
      </CardContent>
    </Card>
  );
};
