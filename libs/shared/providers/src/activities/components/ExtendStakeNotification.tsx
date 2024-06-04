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

import type { ActivityStatus, ExtendStakeActivity } from '../types';

type ExtendStakeNotificationProps = {
  activity: ExtendStakeActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Extending Stake' }),
  signed: defineMessage({ defaultMessage: 'Extending Stake' }),
  success: defineMessage({ defaultMessage: 'Extended Stake' }),
  error: defineMessage({ defaultMessage: 'Error while extending staking' }),
  idle: defineMessage({ defaultMessage: 'Extend Stake' }),
};

export const ExtendStakeNotification = ({
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
}: ExtendStakeNotificationProps) => {
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
