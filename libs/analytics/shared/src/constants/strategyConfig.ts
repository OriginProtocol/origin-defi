import {
  AaveStrategy,
  BalancerFull,
  CompoundStrategy,
  ConvexStrategy,
  CurveFullColor,
  MakerStrategy,
  MorphoStrategy,
  OriginLabel,
} from '@origin/shared/icons';
import { defineMessage } from 'react-intl';

import type { SvgIconProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type StrategyConfig = {
  id: keyof typeof strategiesConfig;
  icon: ComponentType<SvgIconProps>;
  color: string;
  title: MessageDescriptor;
  description: MessageDescriptor;
  addresses: HexAddress[];
};

export const strategiesConfig: Record<string, StrategyConfig> = {
  aave: {
    id: 'aave',
    icon: AaveStrategy,
    color: '#9896FF',
    title: defineMessage({ defaultMessage: 'AAVE' }),
    description: defineMessage({
      defaultMessage: `Aave is a liquidity protocol where users can participate as suppliers or borrowers. Each loan is over-collateralized to ensure repayment. OUSD deploys stablecoins to three of the Aave V2 markets and earns interest approximately every 12 seconds. Additional yield is generated from protocol token incentives (AAVE), which are regularly sold for USDT on Uniswap and compounded.`,
    }),
    addresses: ['0x5e3646a1db86993f73e6b74a57d8640b69f7e259'],
  },
  balancer: {
    id: 'balancer',
    icon: BalancerFull,
    color: '#E5D3BE',
    title: defineMessage({ defaultMessage: 'Balancer' }),
    description: defineMessage({
      defaultMessage: `Balancer meta stable pool`,
    }),
    addresses: ['0x49109629ac1deb03f2e9b2fe2ac4a623e0e7dfdc'],
  },
  compound: {
    id: 'compound',
    icon: CompoundStrategy,
    color: '##00D395',
    title: defineMessage({ defaultMessage: 'Compound' }),
    description: defineMessage({
      defaultMessage: `Compound is an interest rate protocol allowing lenders to earn yield on digital assets by supplying them to borrowers. Each loan is over-collateralized to ensure repayment. OUSD deploys stablecoins to three of the Compound V2 markets and earns interest approximately every 12 seconds. Additional yield is generated from protocol token incentives (COMP), which are regularly sold for USDT on Uniswap and compounded.`,
    }),
    addresses: [],
  },
  convex: {
    id: 'convex',
    icon: ConvexStrategy,
    color: '#3A3A3A',
    title: defineMessage({ defaultMessage: 'Convex' }),
    description: defineMessage({
      defaultMessage: `Convex allows liquidity providers and stakers to earn greater rewards from Curve, a stablecoin-centric automated market maker (AMM). OUSD earns trading fees and protocol token incentives (both CRV and CVX). This strategy employs base pools and metapools, including the Origin Dollar factory pool, which enables OUSD to safely leverage its own deposits to multiply returns and maintain the pool's balance.`,
    }),
    addresses: ['0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90'],
  },
  curveAMO: {
    id: 'curveAMO',
    icon: CurveFullColor,
    color: '#0074F0',
    title: defineMessage({ defaultMessage: 'Curve AMO' }),
    description: defineMessage({
      defaultMessage: `Curve is a stableswap AMM that offers efficient trading of stablecoins and volatile assets. The AMO strategy on Curve automates liquidity management and maximizes rewards by balancing assets in the pool. It deploys additional OETH or ETH to maintain the peg and doubles liquidity to increase earnings. Convex enhances this by boosting rewards from Curve pools. The LP tokens are staked on Convex to earn higher CRV and CVX rewards, which are then converted to OETH and distributed to holders, increasing their balances automatically through rebasing.`,
    }),
    addresses: ['0x1827f9ea98e0bf96550b2fc20f7233277fcd7e63'],
  },
  fraxStaking: {
    id: 'fraxStaking',
    icon: OriginLabel,
    color: '#0074F0',
    title: defineMessage({ defaultMessage: 'Frax Staking' }),
    description: defineMessage({
      defaultMessage: `OETH Frax Staking`,
    }),
    addresses: ['0x3ff8654d633d4ea0fae24c52aec73b4a20d0d0e5'],
  },
  maker: {
    id: 'maker',
    icon: MakerStrategy,
    color: '#1aab9b',
    title: defineMessage({ defaultMessage: 'Maker' }),
    description: defineMessage({
      defaultMessage: `MakerDAO is the decentralized organization responsible for issuing DAI. The Dai Savings Rate (DSR) is a key mechanism of the Maker protocol designed to stabilize the value and supply of DAI by incentivizing users to hold and save it. OUSD utilizes the DSR as its base strategy for earning yield from DAI holdings.`,
    }),
    addresses: ['0x6b69b755c629590ed59618a2712d8a2957ca98fc'],
  },
  metamorpho: {
    id: 'metamorpho',
    icon: MorphoStrategy,
    color: '#0B43CB',
    title: defineMessage({ defaultMessage: 'Morpho' }),
    description: defineMessage({
      defaultMessage: `Morpho Vaults (formerly MetaMorpho) is an open-source protocol for permissionless risk management on top of Morpho, a decentralized platform for overcollateralized lending and borrowing of ERC20 and ERC4626 tokens on Ethereum. The MetaMorpho Factory deploys ERC4626-compliant vaults that allocate deposits across multiple Morpho markets. These noncustodial, immutable vaults let users earn interest passively while the vault actively manages risk. Users retain full control and can withdraw anytime. Morpho Vaults offer tailored risk options, unlike traditional pools exposed to the riskiest assets.`,
    }),
    addresses: ['0x603cdeaec82a60e3c4a10da6ab546459e5f64fa0'],
  },
  morpho: {
    id: 'morpho',
    icon: MorphoStrategy,
    color: '#9bc3e9',
    title: defineMessage({ defaultMessage: 'Morpho' }),
    description: defineMessage({
      defaultMessage: `Morpho adds a peer-to-peer layer on top of Compound and Aave allowing lenders and borrowers to be matched more efficiently with better interest rates. When no matching opportunity exists, funds flow directly through to the underlying protocol. OUSD supplies stablecoins to three of Morpho's Compound markets to earn interest. Additional yield is generated from protocol token incentives, including both COMP (regularly sold for USDT) and MORPHO (currently locked).`,
    }),
    addresses: [
      '0x5a4eee58744d1430876d5ca93cab5ccb763c037d',
      '0x79f2188ef9350a1dc11a062cca0abe90684b0197',
      '0xc1fc9e5ec3058921ea5025d703cbe31764756319',
    ],
  },
  nativeStaking: {
    id: 'nativeStaking',
    icon: OriginLabel,
    color: '#0074F0',
    title: defineMessage({ defaultMessage: 'Native staking' }),
    description: defineMessage({
      defaultMessage: `SSV network acts as our native staking solution and is a decentralized, open-source ETH staking platform using Secret Shared Validator (SSV) technology, also known as Distributed Validator Technology (DVT). It splits a validator key into multiple KeyShares to run an Ethereum validator across multiple non-trusting nodes. This setup provides active-active redundancy, enhances validator key security, and supports the Ethereum network, staking pools, services, and solo stakers.`,
    }),
    addresses: [
      '0x34edb2ee25751ee67f68a45813b22811687c0238',
      '0x4685db8bf2df743c861d71e6cfb5347222992076',
    ],
  },
  origin: {
    id: 'origin',
    icon: OriginLabel,
    color: '#0074F0',
    title: defineMessage({ defaultMessage: 'Origin Vault' }),
    description: defineMessage({
      defaultMessage: `OETH Vault (WETH)`,
    }),
    addresses: ['0x39254033945aa2e4809cc2977e7087bee48bd7ab'],
  },
};
