import { Box } from '@mui/material';

import {
  ApprovalNotification,
  BridgeNotification,
  RedeemNotification,
  SwapNotification,
} from '.';
import { ClaimRewardsNotification } from './ClaimRewardsNotification';
import { ExtendStakeNotification } from './ExtendStakeNotification';
import { StakeNotification } from './StakeNotification';
import { UnstakeAllNotification } from './UnstakeAllNotification';
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
  UnstakeActivity,
  UnstakeAllActivity,
  VoteActivity,
} from '..';

export const ActivityNotification = ({
  activity,
  sx,
}: {
  activity: Activity;
  sx?: StackProps['sx'];
}) => {
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
    'unstake-all': (
      <UnstakeAllNotification activity={activity as UnstakeAllActivity} />
    ),
    'claim-rewards': (
      <ClaimRewardsNotification activity={activity as ClaimRewardsActivity} />
    ),
    vote: <VoteNotification activity={activity as VoteActivity} />,
  };

  const notification = types[activity.type];
  return notification && <Box sx={sx}>{notification}</Box>;
};
