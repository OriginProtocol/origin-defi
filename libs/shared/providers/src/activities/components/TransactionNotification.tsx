import { Typography } from '@mui/material';
import { ActivityIcon, NotificationSnack } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';

import type { NotificationSnackProps } from '@origin/shared/components';
import type { TransactionReceipt } from 'viem';

import type { GlobalActivityStatus } from '../types';

type TransactionNotificationProps = {
  status: GlobalActivityStatus;
  txReceipt?: TransactionReceipt;
  error?: string;
} & NotificationSnackProps;

export const TransactionNotification = ({
  status,
  txReceipt,
  error,
  ...rest
}: TransactionNotificationProps) => {
  return (
    <NotificationSnack
      {...rest}
      icon={<ActivityIcon status={status} sx={{ width: 20, height: 20 }} />}
      href={
        isNilOrEmpty(txReceipt?.transactionHash)
          ? null
          : `https://etherscan.io/tx/${txReceipt.transactionHash}`
      }
      subtitle={
        isNilOrEmpty(error) ? (
          rest?.subtitle
        ) : (
          <Typography color="error">{error}</Typography>
        )
      }
    />
  );
};
