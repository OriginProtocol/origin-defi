import { Box } from '@mui/material';

import type { BoxProps } from '@mui/material';

export type WalletIconProps = {
  walletName: string;
} & BoxProps<'img'>;

const iconPaths: Record<string, string> = {
  metamask: '/images/wallets/metamask.svg',
  ledger: '/images/wallets/ledger.svg',
  argent: '/images/wallets/argent.svg',
  safe: '/images/wallets/safe.svg',
  rabby: '/images/wallets/rabby.svg',
  coinbase: '/images/wallets/coinbase.svg',
  brave: '/images/wallets/brave.svg',
  rainbow: '/images/wallets/rainbow.svg',
  connect: '/images/wallets/walletconnect.svg',
};

export const WalletIcon = ({ walletName, ...rest }: WalletIconProps) => {
  return (
    <Box
      width={20}
      {...rest}
      component="img"
      alt={`${walletName}-icon`}
      src={
        iconPaths[
          Object.keys(iconPaths).find(
            (key) => walletName.toLowerCase().search(key) > -1,
          )
        ] ?? '/images/wallets/default.svg'
      }
    />
  );
};
