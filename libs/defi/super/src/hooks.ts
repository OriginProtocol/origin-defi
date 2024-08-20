import { useMemo } from 'react';

import { tokens } from '@origin/shared/contracts';
import {
  superOETHb,
  superOETHo,
  wsuperOETHb,
  wsuperOETHo,
} from '@origin/shared/icons';
import { base, optimism } from 'viem/chains';
import { useAccount } from 'wagmi';

export const useSuper = () => {
  const { chain } = useAccount();

  const superChain = !chain
    ? base
    : [base.id.toString(), optimism.id.toString()].includes(chain.id.toString())
      ? chain
      : base;

  const superToken = {
    [base.id.toString()]: tokens.base.superOETHb,
    [optimism.id.toString()]: tokens.optimism.superOETHo,
  }[superChain.id];

  const superTokenIcon = {
    [base.id.toString()]: superOETHb,
    [optimism.id.toString()]: superOETHo,
  }[superChain.id];

  const wsuperToken = {
    [base.id.toString()]: tokens.base.wsuperOETHb,
    [optimism.id.toString()]: tokens.optimism.wsuperOETHo,
  }[superChain.id];

  const wsuperTokenIcon = {
    [base.id.toString()]: wsuperOETHb,
    [optimism.id.toString()]: wsuperOETHo,
  }[superChain.id];

  return useMemo(
    () => ({
      superChain,
      superToken,
      superTokenIcon,
      wsuperToken,
      wsuperTokenIcon,
    }),
    [superChain, superToken, superTokenIcon, wsuperToken, wsuperTokenIcon],
  );
};
