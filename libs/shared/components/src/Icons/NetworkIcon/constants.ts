import {
  arbitrum,
  avalanche,
  base,
  bsc,
  gnosis,
  mainnet,
  optimism,
  plumeMainnet,
  polygon,
  sonic,
} from 'viem/chains';

import arbitrumMulti from './components/arbitrum_multi.svg?react';
import avalancheCc from './components/avalanche_cc.svg?react';
import baseCc from './components/base_cc.svg?react';
import bscCc from './components/bsc_cc.svg?react';
import gnosisCc from './components/gnosis_cc.svg?react';
import mainnetMulti from './components/mainnet_multi.svg?react';
import optimismCc from './components/optimism_cc.svg?react';
import plumeCc from './components/plume-cc.svg?react';
import polygonCc from './components/polygon_cc.svg?react';
import sonicWhite from './components/sonic_white.svg?react';

export const supportedIcons = {
  [arbitrum.id]: {
    icon: arbitrumMulti,
    backgroundColor: '#213147',
    sizeRatio: 0.75,
  },
  [avalanche.id]: {
    icon: avalancheCc,
    sizeRatio: 0.65,
    iconColor: '#FFFFFF',
    backgroundColor: '#E84142',
  },
  [base.id]: {
    icon: baseCc,
    sizeRatio: 0.65,
    iconColor: '#FFFFFF',
    backgroundColor: '#0052FF',
  },
  [bsc.id]: {
    icon: bscCc,
    sizeRatio: 0.75,
    iconColor: '#F8D12F',
    backgroundColor: '#0B0E11',
  },
  [gnosis.id]: {
    icon: gnosisCc,
    sizeRatio: 0.75,
    iconColor: '#EFEFEF',
    backgroundColor: '#04795B',
  },
  [mainnet.id]: {
    icon: mainnetMulti,
    sizeRatio: 0.75,
    backgroundColor: '#D9EAFF',
  },
  [optimism.id]: {
    icon: optimismCc,
    sizeRatio: 0.8,
    iconColor: '#FFFFFF',
    backgroundColor: '#FF0420',
  },
  [plumeMainnet.id]: {
    icon: plumeCc,
    sizeRatio: 0.55,
    iconColor: '#FFFFFF',
    backgroundColor: '#F53A39',
  },
  [polygon.id]: {
    icon: polygonCc,
    sizeRatio: 0.7,
    iconColor: '#FFFFFF',
    backgroundColor: '#8247E5',
  },
  [sonic.id]: {
    icon: sonicWhite,
    sizeRatio: 0.8,
    backgroundColor: '#213147',
  },
} as const;
