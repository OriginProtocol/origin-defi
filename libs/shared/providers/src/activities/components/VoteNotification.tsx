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

import type { StackProps } from '@mui/material';
import type { MessageDescriptor } from 'react-intl';

import type { ActivityStatus, VoteActivity } from '../types';

type VoteNotificationProps = {
  activity: VoteActivity;
  sx?: StackProps['sx'];
};

const title: Record<ActivityStatus, MessageDescriptor> = {
  pending: defineMessage({ defaultMessage: 'Casting vote' }),
  signed: defineMessage({ defaultMessage: 'Casting vote' }),
  success: defineMessage({ defaultMessage: 'Casted vote' }),
  error: defineMessage({ defaultMessage: 'Error while casting vote' }),
  idle: defineMessage({ defaultMessage: 'Cast vote' }),
};

export const VoteNotification = ({
  activity: { status, tokenIdIn, choice, proposalId, txHash, error },
  sx,
}: VoteNotificationProps) => {
  const intl = useIntl();
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
                defaultMessage: 'Vote {choice} on proposal {proposalId}',
              },
              {
                choice,
                proposalId,
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
