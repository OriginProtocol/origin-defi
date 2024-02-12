import {
  DAI,
  ETH,
  ETHx,
  FaCircleDollarRegular,
  frxETH,
  mETH,
  OETH,
  OGN,
  OGV,
  OUSD,
  primeETH,
  rETH,
  sfrxETH,
  stETH,
  swETH,
  USDC,
  USDT,
  veOGV,
  WETH,
  wOETH,
  wOUSD,
} from '@origin/shared/icons';

import type { SvgIconProps } from '@mui/material';

export type TokenIconProps = {
  symbol?: string;
} & SvgIconProps;

export const supportedTokens = {
  DAI: DAI,
  ETH: ETH,
  ETHx: ETHx,
  frxETH: frxETH,
  mETH: mETH,
  primeETH: primeETH,
  OETH: OETH,
  OGN: OGN,
  OGV: OGV,
  OUSD: OUSD,
  rETH: rETH,
  sfrxETH: sfrxETH,
  stETH: stETH,
  swETH: swETH,
  USDC: USDC,
  USDT: USDT,
  veOGV: veOGV,
  WETH: WETH,
  wOETH: wOETH,
  wOUSD: wOUSD,
} as const;

export const TokenIcon = ({ symbol, ...rest }: TokenIconProps) => {
  const Icon = supportedTokens[symbol];

  return Icon ? <Icon {...rest} /> : <FaCircleDollarRegular {...rest} />;
};
