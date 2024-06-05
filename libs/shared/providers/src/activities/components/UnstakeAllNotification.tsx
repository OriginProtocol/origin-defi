/**
 * title: intl.formatMessage({ defaultMessage: 'Unlock all' }),
 *       subtitle: intl.formatMessage(
 *         {
 *           defaultMessage:
 *             '{count,plural, =1{# position} other{# positions}} unlocked',
 *         },
 *         { count: lockups?.length ?? 0 },
 *       ),
 */

import { Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  ErrorTooltipLabel,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, UnstakeAllActivity } from '../types';

type UnstakeAllNotificationProps = {
  activity: UnstakeAllActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Unlocking' }),
  signed: defineMessage({ defaultMessage: 'Unlocking' }),
  success: defineMessage({ defaultMessage: 'Unlocked' }),
  error: defineMessage({ defaultMessage: 'Error while unlocking' }),
  idle: defineMessage({ defaultMessage: 'Unlock' }),
};

export const UnstakeAllNotification = ({
  activity: {
    status,
    tokenIdIn,
    tokenIdOut,
    amountIn,
    amountOut,
    lockupIds,
    txHash,
    error,
  },
  sx,
}: UnstakeAllNotificationProps) => {
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
                  '{count,plural, =1{# position} other{# positions}} unlocked',
              },
              { count: lockupIds?.length ?? 0 },
            )}
          </Typography>
        ) : (
          <ErrorTooltipLabel>{error}</ErrorTooltipLabel>
        )
      }
      endIcon={
        <Stack direction="row" alignItems="center" spacing={1}>
          <TokenIcon token={tokenIn} sx={{ fontSize: 20 }} />
          <FaArrowRightRegular sx={{ fontSize: 14 }} />
          <TokenIcon token={tokenOut} sx={{ fontSize: 20 }} />
        </Stack>
      }
    />
  );
};
