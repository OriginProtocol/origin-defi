import { Typography } from '@mui/material';
import {
  ActivityIcon,
  ErrorTooltipLabel,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';

import { useFormat } from '../..';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, ClaimRewardsActivity } from '../types';

type ClaimRewardsNotificationProps = {
  activity: ClaimRewardsActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Claiming Rewards' }),
  signed: defineMessage({ defaultMessage: 'Claiming Rewards' }),
  success: defineMessage({ defaultMessage: 'Claimed Rewards' }),
  error: defineMessage({ defaultMessage: 'Error while claiming rewards' }),
  idle: defineMessage({ defaultMessage: 'Claim Rewards' }),
};

export const ClaimRewardsNotification = ({
  activity: { status, tokenIdIn, amountIn, txHash, error },
  sx,
}: ClaimRewardsNotificationProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();

  const tokenIn = getTokenById(tokenIdIn);

  return (
    <NotificationSnack
      sx={sx}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      title={intl.formatMessage(title[status])}
      href={
        isNilOrEmpty(txHash) ? undefined : `https://etherscan.io/tx/${txHash}`
      }
      subtitle={
        isNilOrEmpty(error) ? (
          <Typography color="text.secondary">
            {intl.formatMessage(
              {
                defaultMessage: 'Collect {rewards} rewards',
              },
              {
                rewards: formatAmount(amountIn, tokenIn.decimals, undefined, {
                  notation: 'compact',
                  maximumSignificantDigits: 4,
                }),
              },
            )}
          </Typography>
        ) : (
          <ErrorTooltipLabel>{error}</ErrorTooltipLabel>
        )
      }
      endIcon={<TokenIcon token={tokenIn} />}
    />
  );
};
