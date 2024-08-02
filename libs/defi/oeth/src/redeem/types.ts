import type { SvgIconProps } from '@mui/material';
import type { OethRoute } from '@origin/shared/routes';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type Meta = {
  icon?: ComponentType<SvgIconProps>;
  waitTime?: MessageDescriptor;
  waitTimeColor?: string;
  comingSoon?: boolean;
};

export type OethRedeemAction = Extract<
  OethRoute,
  'redeem-arm-oeth' | 'redeem-vault-async-oeth'
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
};
