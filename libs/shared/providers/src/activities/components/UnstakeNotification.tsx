import { Stack, Typography } from '@mui/material';
import {
  ActivityIcon,
  ErrorTooltipLabel,
  MiddleTruncatedLabel,
  NotificationSnack,
  TokenIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, UnstakeActivity } from '../types';

type UnstakeNotificationProps = {
  activity: UnstakeActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Unstaking' }),
  signed: defineMessage({ defaultMessage: 'Unstaking' }),
  success: defineMessage({ defaultMessage: 'Unstaked' }),
  error: defineMessage({ defaultMessage: 'Error while unstaking' }),
  idle: defineMessage({ defaultMessage: 'Unstake' }),
};

export const UnstakeNotification = ({
  activity: {
    status,
    tokenIdIn,
    tokenIdOut,
    amountIn,
    amountOut,
    lockupId,
    txHash,
    error,
  },
  sx,
}: UnstakeNotificationProps) => {
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
                defaultMessage: 'Unstake lockup {lockup}',
              },
              {
                lockup: (
                  <MiddleTruncatedLabel maxWidth={60}>
                    {lockupId.toString()}
                  </MiddleTruncatedLabel>
                ),
              },
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
