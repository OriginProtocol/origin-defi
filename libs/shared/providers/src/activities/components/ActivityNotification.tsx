import { useIntl } from 'react-intl';

import {
  ApprovalNotification,
  BridgeNotification,
  RedeemNotification,
  SwapNotification,
  TransactionNotification,
} from '.';

import type {
  Activity,
  BridgeActivity,
  RedeemActivity,
  SwapActivity,
  TransactionActivity,
} from '.';

export const ActivityNotification = (activity: Activity) => {
  const intl = useIntl();
  if (activity.type === 'approval') {
    return (
      <ApprovalNotification
        key={activity.id}
        {...activity}
        sx={{ px: 3, py: 2 }}
      />
    );
  }
  if (activity.type === 'bridge') {
    return (
      <BridgeNotification
        key={activity.id}
        {...(activity as BridgeActivity)}
        sx={{ px: 3, py: 2 }}
      />
    );
  }
  if (activity.type === 'redeem') {
    return (
      <RedeemNotification
        key={activity.id}
        {...(activity as RedeemActivity)}
        sx={{ px: 3, py: 2 }}
      />
    );
  }
  if (activity.type === 'swap') {
    return (
      <SwapNotification
        key={activity.id}
        {...(activity as SwapActivity)}
        sx={{ px: 3, py: 2 }}
      />
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
        sx={{ px: 3, py: 2 }}
      />
    );
  }
  return null;
};
