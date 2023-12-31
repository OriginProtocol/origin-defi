import { SvgIcon } from '@mui/material';
import {
  DAI,
  ETH,
  frxETH,
  OETH,
  OGN,
  OGV,
  OUSD,
  rETH,
  sfrxETH,
  stETH,
  USDC,
  USDT,
  veOGV,
  WETH,
  wOETH,
  wOUSD,
} from '@origin/shared/icons';
import { AiOutlineDollar } from 'react-icons/ai';

import type { SvgIconProps } from '@mui/material';

export type TokenIconProps = {
  symbol?: string;
} & SvgIconProps;

export const supportedTokens = {
  DAI: DAI,
  ETH: ETH,
  frxETH: frxETH,
  OETH: OETH,
  OGN: OGN,
  OGV: OGV,
  OUSD: OUSD,
  rETH: rETH,
  sfrxETH: sfrxETH,
  stETH: stETH,
  USDC: USDC,
  USDT: USDT,
  veOGV: veOGV,
  WETH: WETH,
  wOETH: wOETH,
  wOUSD: wOUSD,
} as const;

export const TokenIcon = ({ symbol, ...rest }: TokenIconProps) => {
  const Icon = supportedTokens[symbol];

  return Icon ? (
    <Icon {...rest} />
  ) : (
    <SvgIcon {...rest} sx={{ fontSize: 24, ...rest?.sx }}>
      <AiOutlineDollar />
    </SvgIcon>
  );
};
