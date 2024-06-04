import { Typography } from '@mui/material';
import {
  ActivityIcon,
  BadgeIcon,
  ErrorTooltipLabel,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { FaCircleCheckRegular } from '@origin/shared/icons';
import { formatAmount, isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, ApprovalActivity } from '../types';

type ApprovalNotificationProps = {
  activity: ApprovalActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Approving' }),
  signed: defineMessage({ defaultMessage: 'Approving' }),
  success: defineMessage({ defaultMessage: 'Approved' }),
  error: defineMessage({ defaultMessage: 'Error while approving' }),
  idle: defineMessage({ defaultMessage: 'Approve' }),
};

export const ApprovalNotification = ({
  activity: { status, tokenIdIn, amountIn, txHash, error },
  sx,
}: ApprovalNotificationProps) => {
  const tokenIn = getTokenById(tokenIdIn);
  const intl = useIntl();
  const amount = +formatUnits(amountIn ?? 0n, tokenIn?.decimals ?? 18);

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
                defaultMessage: '{amountIn} {symbolIn}',
              },
              {
                amountIn: formatAmount(amount),
                symbolIn: tokenIn?.symbol,
              },
            )}
          </Typography>
        ) : (
          <ErrorTooltipLabel>{error}</ErrorTooltipLabel>
        )
      }
      endIcon={
        <BadgeIcon
          badgeContent={
            <FaCircleCheckRegular color="primary" sx={{ fontSize: 10 }} />
          }
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      }
    />
  );
};
