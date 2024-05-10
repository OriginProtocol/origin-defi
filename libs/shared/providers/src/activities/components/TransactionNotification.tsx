import { Typography } from '@mui/material';
import { ActivityIcon, NotificationSnack } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { NotificationSnackProps } from '@origin/shared/components';
import type { Hex } from 'viem';

import type { ActivityStatus } from '../types';

type TransactionNotificationProps = {
  status: ActivityStatus;
  txHash?: Hex;
  error?: string;
} & NotificationSnackProps;

export const TransactionNotification = ({
  status,
  title,
  subtitle,
  txHash,
  error,
  ...rest
}: TransactionNotificationProps) => {
  return (
    <NotificationSnack
      {...rest}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      href={
        isNilOrEmpty(txHash) ? undefined : `https://etherscan.io/tx/${txHash}`
      }
      title={title}
      subtitle={
        isNilOrEmpty(error) ? (
          subtitle
        ) : (
          <Typography
            color="error"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
            }}
          >
            {error}
          </Typography>
        )
      }
    />
  );
};
