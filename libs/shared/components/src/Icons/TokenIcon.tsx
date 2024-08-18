import {
  DAI,
  ETH,
  ETHOutlined,
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
  superOETH,
  swETH,
  USDC,
  USDT,
  veOGV,
  VeOGVOutlined,
  WETH,
  wOETH,
  wOUSD,
  xOGN,
  xOGNOutlined,
} from '@origin/shared/icons';

import { BadgeIcon } from './BadgeIcon';
import { NetworkIcon } from './NetworkIcon';

import type { SvgIconProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ComponentType } from 'react';

export type TokenIconProps = {
  token?: Token;
  outlined?: boolean;
  showNetwork?: boolean;
  networkIconSize?: number;
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
  'superOETHb',
  'superOETHo',
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
  superOETHb: superOETH,
  superOETHo: superOETH,
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
  ETH: ETHOutlined,
  OGV: OGVOutlined,
  veOGV: VeOGVOutlined,
  xOGN: xOGNOutlined,
};

export const TokenIcon = ({
  token,
  outlined,
  showNetwork,
  networkIconSize = 14,
  ...rest
}: TokenIconProps) => {
  if (!token?.symbol || !supportedSymbols.includes(token.symbol)) {
    return <FaCircleDollarRegular {...rest} />;
  }

  const Icon = outlined
    ? (outlinedMap[token.symbol] ?? regularMap[token.symbol])
    : regularMap[token.symbol];

  if (showNetwork) {
    return (
      <BadgeIcon
        badgeContent={
          <NetworkIcon
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chainId={token.chainId as any}
            outlined
            size={networkIconSize}
          />
        }
      >
        <Icon {...rest} />
      </BadgeIcon>
    );
  }

  return <Icon {...rest} />;
};
