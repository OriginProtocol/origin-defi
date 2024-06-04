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
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, StakeActivity } from '../types';

type StakeNotificationProps = {
  activity: StakeActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Staking' }),
  signed: defineMessage({ defaultMessage: 'Staking' }),
  success: defineMessage({ defaultMessage: 'Staked' }),
  error: defineMessage({ defaultMessage: 'Error while staking' }),
  idle: defineMessage({ defaultMessage: 'Stake' }),
};

export const StakeNotification = ({
  activity: {
    status,
    tokenIdIn,
    tokenIdOut,
    amountIn,
    amountOut,
    duration,
    txHash,
    error,
  },
  sx,
}: StakeNotificationProps) => {
  const intl = useIntl();

  const tokenIn = getTokenById(tokenIdIn);
  const tokenOut = getTokenById(tokenIdOut);

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
                defaultMessage:
                  'Lock {amount} OGN for {duration,plural,=1{# month} other{# months}}',
              },
              {
                amount: intl.formatNumber(
                  +formatUnits(amountIn, tokenIn.decimals),
                  {
                    notation: 'compact',
                    maximumSignificantDigits: 4,
                  },
                ),
                duration,
              },
            )}
          </Typography>
        ) : (
          <ErrorTooltipLabel>{error}</ErrorTooltipLabel>
        )
      }
      endIcon={<TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />}
    />
  );
};
