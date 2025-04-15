import { SvgIcon } from '@mui/material';
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
  OS,
  OUSD,
  PLUME,
  primeETH,
  rETH,
  S,
  sfrxETH,
  stETH,
  superOETH,
  superOETHb,
  superOETHo,
  superOETHp,
  swETH,
  USDC,
  USDS,
  USDT,
  veOGV,
  VeOGVOutlined,
  WETH,
  wOETH,
  wOS,
  wOUSD,
  wS,
  wsuperOETH,
  wsuperOETHb,
  wsuperOETHo,
  wsuperOETHp,
  xOGN,
  xOGNOutlined,
} from '@origin/shared/icons';
import { getTokenLogoUrl } from '@origin/shared/utils';

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
  'OS',
  'OUSD',
  'PLUME',
  'rETH',
  'S',
  'sfrxETH',
  'stETH',
  'superOETH',
  'superOETHb',
  'superOETHo',
  'superOETHp',
  'swETH',
  'USDC',
  'USDS',
  'USDT',
  'veOGV',
  'WETH',
  'wOETH',
  'wOS',
  'wOUSD',
  'wS',
  'wsuperOETH',
  'wsuperOETHb',
  'wsuperOETHo',
  'wsuperOETHp',
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
  OS: OS,
  OUSD: OUSD,
  PLUME: PLUME,
  rETH: rETH,
  S: S,
  sfrxETH: sfrxETH,
  stETH: stETH,
  superOETH: superOETH,
  superOETHb: superOETHb,
  superOETHo: superOETHo,
  superOETHp: superOETHp,
  swETH: swETH,
  USDC: USDC,
  USDS: USDS,
  USDT: USDT,
  veOGV: veOGV,
  WETH: WETH,
  wOETH: wOETH,
  wOS: wOS,
  wOUSD: wOUSD,
  wS: wS,
  wsuperOETH: wsuperOETH,
  wsuperOETHb: wsuperOETHb,
  wsuperOETHo: wsuperOETHo,
  wsuperOETHp: wsuperOETHp,
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

const networkAlreadyIncludedTokenIds = [
  '8453:superOETHb',
  '8453:wsuperOETHb',
  '10:superOETHo',
  '10:wsuperOETHo',
  '98865:superOETHp',
  '98865:wsuperOETHp',
];

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

  if (!supportedSymbols.includes(token.symbol)) {
    return (
      <SvgIcon {...rest} viewBox="0 0 128 128">
        <image
          href={getTokenLogoUrl(
            token.address?.toLowerCase(),
            token.chainId,
            'png128',
          )}
          width="128"
          height="128"
        />
      </SvgIcon>
    );
  }

  const Icon = outlined
    ? (outlinedMap[token.symbol] ?? regularMap[token.symbol])
    : regularMap[token.symbol];

  if (showNetwork && !networkAlreadyIncludedTokenIds.includes(token.id)) {
    return (
      <BadgeIcon
        badgeSize={networkIconSize}
        overlap="rectangular"
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
