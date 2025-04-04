import type { SvgIconProps } from '@mui/material';
import type { OSRoute } from '@origin/shared/routes';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type Meta = {
  icon?: ComponentType<SvgIconProps>;
  waitTime?: MessageDescriptor;
  waitTimeColor?: string;
  comingSoon?: boolean;
};

export type OSTokenRedeemAction = Extract<
  OSRoute,
  'redeem-vault-async-os' | 'swap-magpie-os'
>;

export type WithdrawalRequest = {
  id: string;
  requestId: bigint;
  timestamp: string;
  amount: bigint;
  queued: bigint;
  claimed: boolean;
  blockNumber: number;
  claimable: boolean;
  txHash: string;
  timeRemaining: number;
  delay: number;
  queueDiff: bigint;
  balanceDiff: bigint;
};
