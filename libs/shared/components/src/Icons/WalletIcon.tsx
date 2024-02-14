import {
  Argent,
  Brave,
  Coinbase,
  DefaultWallet,
  Ledger,
  Metamask,
  Rabby,
  Rainbow,
  Safe,
  WalletConnect,
} from '@origin/shared/icons';

import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

export type WalletIconProps = {
  walletName?: string;
} & SvgIconProps;

const wallets: Record<string, ComponentType<SvgIconProps>> = {
  metamask: Metamask,
  ledger: Ledger,
  argent: Argent,
  safe: Safe,
  rabby: Rabby,
  coinbase: Coinbase,
  brave: Brave,
  rainbow: Rainbow,
  connect: WalletConnect,
  defaultWallet: DefaultWallet,
};

export const WalletIcon = ({ walletName, ...rest }: WalletIconProps) => {
  const key = walletName
    ? Object.keys(wallets).find(
        (key) => walletName.toLowerCase().search(key) > -1,
      )
    : undefined;
  const Icon = wallets[key ?? 'defaultWallet'];

  return <Icon {...rest} />;
};
