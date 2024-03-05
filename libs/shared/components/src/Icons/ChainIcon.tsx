import { Arbitrum, Ethereum, FaLinkRegular } from '@origin/shared/icons';
import { arbitrum, mainnet } from 'viem/chains';

import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';

export type ChainIconProps = {
  chainId?: number;
} & SvgIconProps;

const chains: Record<number, ComponentType<SvgIconProps>> = {
  [mainnet.id]: Ethereum,
  [arbitrum.id]: Arbitrum,
  0: FaLinkRegular,
};

export const ChainIcon = ({ chainId, ...rest }: ChainIconProps) => {
  const Icon = chains[chainId ?? 0];

  return <Icon {...rest} />;
};
