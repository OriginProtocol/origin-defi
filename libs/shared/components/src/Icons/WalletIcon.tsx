import { Box } from '@mui/material';

import type { BoxProps } from '@mui/material';

export type WalletIconProps = {
  walletId: string;
} & BoxProps<'img'>;

const iconPaths: Record<string, string> = {
  metamask: '/images/wallets/metamask.svg',
  walletconnect: '/images/wallets/walletconnect.svg',
  ledger: '/images/wallets/ledger.svg',
  argent: '/images/wallets/argent.svg',
  safe: '/images/wallets/safe.svg',
  rabby: '/images/wallets/rabby.svg',
  coinbase: '/images/wallets/coinbase.svg',
  brave: '/images/wallets/brave.svg',
  rainbow: '/images/wallets/rainbow.svg',
};

export const WalletIcon = ({ walletId, ...rest }: WalletIconProps) => {
  return (
    <Box
      width={20}
      {...rest}
      component="img"
      alt={`${walletId}-icon`}
      src={iconPaths[walletId?.toLowerCase()] ?? '/images/wallets/default.svg'}
    />
  );
};
