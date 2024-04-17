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
  OGVOutlined,
  OUSD,
  primeETH,
  rETH,
  sfrxETH,
  stETH,
  swETH,
  USDC,
  USDT,
  veOGV,
  VeOGVOutlined,
  WETH,
  wOETH,
  wOUSD,
  xOGN,
} from '@origin/shared/icons';

import type { SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ComponentType } from 'react';

export type TokenIconProps = {
  token?: Token;
  outlined?: boolean;
} & SvgIconProps;

const supportedSymbols = [
  'DAI',
  'ETH',
  'ETHx',
  'frxETH',
  'mETH',
  'primeETH',
  'OETH',
  'OGN',
  'OGV',
  'OUSD',
  'rETH',
  'sfrxETH',
  'stETH',
  'swETH',
  'USDC',
  'USDT',
  'veOGV',
  'WETH',
  'wOETH',
  'wOUSD',
  'xOGN',
];

const regularMap: Record<
  (typeof supportedSymbols)[number],
  ComponentType<SvgIconProps>
> = {
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
  xOGN: xOGN,
};

const outlinedMap: Record<
  (typeof supportedSymbols)[number],
  ComponentType<SvgIconProps>
> = {
  OGV: OGVOutlined,
  veOGV: VeOGVOutlined,
};

export const TokenIcon = ({ token, outlined, ...rest }: TokenIconProps) => {
  if (!token?.symbol || !supportedSymbols.includes(token.symbol)) {
    return <FaCircleDollarRegular {...rest} />;
  }

  const Icon = outlined
    ? outlinedMap[token.symbol] ?? regularMap[token.symbol]
    : regularMap[token.symbol];

  return <Icon {...rest} />;
};
