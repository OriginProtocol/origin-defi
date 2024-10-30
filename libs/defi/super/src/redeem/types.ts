import type { SvgIconProps } from '@mui/material';
import type { SuperOethbRoute } from '@origin/shared/routes';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type Meta = {
  icon?: ComponentType<SvgIconProps>;
  waitTime?: MessageDescriptor;
  waitTimeColor?: string;
  comingSoon?: boolean;
};

export type SuperOethRedeemAction = Extract<
  SuperOethbRoute,
  'redeem-vault-async-superOethb' | 'swap-aerodrome-superOethb'
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
