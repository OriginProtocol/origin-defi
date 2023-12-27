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

export type WalletIconProps = {
  walletName: string;
} & SvgIconProps;

const wallets = {
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
  const Icon =
    wallets[
      Object.keys(wallets).find(
        (key) => walletName.toLowerCase().search(key) > -1,
      ) ?? 'defaultWallet'
    ];

  return <Icon {...rest} />;
};
