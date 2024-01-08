import { SvgIcon } from '@mui/material';

import ArgentSvg from './argent.svg?react';
import BraveSvg from './brave.svg?react';
import CoinbaseSvg from './coinbase.svg?react';
import DefaultSvg from './default.svg?react';
import LedgerSvg from './ledger.svg?react';
import MetamaskSvg from './metamask.svg?react';
import RabbySvg from './rabby.svg?react';
import RainbowSvg from './rainbow.svg?react';
import SafeSvg from './safe.svg?react';
import WalletconnectSvg from './walletconnect.svg?react';

import type { SvgIconProps } from '@mui/material';

export const Argent = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ArgentSvg} viewBox="0 0 28 28" />
);
export const Brave = (props: SvgIconProps) => (
  <SvgIcon {...props} component={BraveSvg} viewBox="0 0 256 301" />
);
export const Coinbase = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CoinbaseSvg} viewBox="0 0 40 40" />
);
export const DefaultWallet = (props: SvgIconProps) => (
  <SvgIcon {...props} component={DefaultSvg} viewBox="0 0 91 78" />
);
export const Ledger = (props: SvgIconProps) => (
  <SvgIcon {...props} component={LedgerSvg} viewBox="0 0 450 450" />
);
export const Metamask = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MetamaskSvg} viewBox="0 0 256 240" />
);
export const Rabby = (props: SvgIconProps) => (
  <SvgIcon {...props} component={RabbySvg} viewBox="54.7 35.01 94.68 81.96" />
);
export const Rainbow = (props: SvgIconProps) => (
  <SvgIcon {...props} component={RainbowSvg} viewBox="0 0 120 120" />
);
export const Safe = (props: SvgIconProps) => (
  <SvgIcon {...props} component={SafeSvg} viewBox="0 0 280 280" />
);
export const WalletConnect = (props: SvgIconProps) => (
  <SvgIcon {...props} component={WalletconnectSvg} viewBox="0 0 40 25" />
);
