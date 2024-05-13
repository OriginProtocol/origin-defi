import { useIntl } from 'react-intl';

import {
  ApprovalNotification,
  BridgeNotification,
  RedeemNotification,
  SwapNotification,
  TransactionNotification,
} from '.';

import type { StackProps } from '@mui/material';

import type {
  Activity,
  BridgeActivity,
  RedeemActivity,
  SwapActivity,
  TransactionActivity,
} from '..';

export const ActivityNotification = (
  activity: Activity & { sx: StackProps['sx'] },
) => {
  const intl = useIntl();
  if (activity.type === 'approval') {
    return <ApprovalNotification key={activity.id} {...activity} />;
  }
  if (activity.type === 'bridge') {
    return (
      <BridgeNotification key={activity.id} {...(activity as BridgeActivity)} />
    );
  }
  if (activity.type === 'redeem') {
    return (
      <RedeemNotification key={activity.id} {...(activity as RedeemActivity)} />
    );
  }
  if (activity.type === 'swap') {
    return (
      <SwapNotification key={activity.id} {...(activity as SwapActivity)} />
    );
  }
  if (activity.type === 'transaction') {
    return (
      <TransactionNotification
        key={activity.id}
        {...(activity as TransactionActivity)}
        title={
          (activity as TransactionActivity)?.title ??
          intl.formatMessage({
            defaultMessage: 'New transaction',
          })
        }
        subtitle={(activity as TransactionActivity)?.subtitle ?? ''}
      />
    );
  }
  return null;
};
