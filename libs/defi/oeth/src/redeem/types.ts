import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type Meta = {
  icon?: ComponentType<SvgIconProps>;
  waitTime?: MessageDescriptor;
  comingSoon?: boolean;
};

export type OethRedeemAction =
  | 'arm'
  | 'redeem-vault'
  | 'redeem-vault-async'
  | 'swap-curve';

export type WithdrawalRequest = {
  id: string;
  requestId: bigint;
  timestamp: string;
  amount: bigint;
  queued: bigint;
  claimed: boolean;
  blockNumber: number;
  claimable: boolean;
};
