import { useIntl } from 'react-intl';

import {
  ApprovalNotification,
  BridgeNotification,
  RedeemNotification,
  SwapNotification,
  TransactionNotification,
} from '.';
import { ClaimRewardsNotification } from './ClaimRewardsNotification';
import { ExtendStakeNotification } from './ExtendStakeNotification';
import { StakeNotification } from './StakeNotification';
import { UnstakeNotification } from './UnstakeNotification';
import { VoteNotification } from './VoteNotification';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

import type {
  Activity,
  ActivityType,
  ApprovalActivity,
  BridgeActivity,
  ClaimRewardsActivity,
  ExtendStakeActivity,
  RedeemActivity,
  StakeActivity,
  SwapActivity,
  TransactionActivity,
  UnstakeActivity,
  VoteActivity,
} from '..';

export const ActivityNotification = (
  activity: Activity & { sx?: StackProps['sx'] },
) => {
  const intl = useIntl();
  const types: Record<ActivityType, ReactNode> = {
    approval: <ApprovalNotification activity={activity as ApprovalActivity} />,
    bridge: <BridgeNotification activity={activity as BridgeActivity} />,
    redeem: <RedeemNotification activity={activity as RedeemActivity} />,
    swap: <SwapNotification activity={activity as SwapActivity} />,
    stake: <StakeNotification activity={activity as StakeActivity} />,
    'extend-stake': (
      <ExtendStakeNotification activity={activity as ExtendStakeActivity} />
    ),
    unstake: <UnstakeNotification activity={activity as UnstakeActivity} />,
    'claim-rewards': (
      <ClaimRewardsNotification activity={activity as ClaimRewardsActivity} />
    ),
    vote: <VoteNotification activity={activity as VoteActivity} />,
    transaction: (
      <TransactionNotification
        {...(activity as TransactionActivity)}
        title={
          (activity as TransactionActivity)?.title ??
          intl.formatMessage({
            defaultMessage: 'New transaction',
          })
        }
        subtitle={(activity as TransactionActivity)?.subtitle ?? ''}
      />
    ),
  };

  return types[activity.type] ?? null;
};
