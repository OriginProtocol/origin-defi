import type { SvgIconProps } from '@mui/material';
import type { SuperOethRoute } from '@origin/shared/routes';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type Meta = {
  icon?: ComponentType<SvgIconProps>;
  waitTime?: MessageDescriptor;
  waitTimeColor?: string;
  comingSoon?: boolean;
};

export type SuperOethRedeemAction = Extract<
  SuperOethRoute,
  'redeem-vault-async-superOeth' | 'swap-aerodrome-superOeth'
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
