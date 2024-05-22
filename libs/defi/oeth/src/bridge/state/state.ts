import { useEffect, useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount } from 'wagmi';

import type { BridgeTransfersQuery } from '@origin/defi/shared';
import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export interface BridgeState {
  amount: bigint;
  srcChain: Chain;
  srcToken: Token;
  srcTokens: Token[];
  dstChain: Chain;
  dstToken: Token;
  dstTokens: Token[];
  waitForTransfer?: BridgeTransfersQuery['bridgeTransfers'][number];
}

export const tokenPaths: Record<
  number,
  Record<number, { srcTokens: Token[]; dstTokens: Token[] }>
> = {
  [mainnet.id]: {
    [arbitrum.id]: {
      srcTokens: [tokens.mainnet.wOETH, tokens.mainnet.ETH],
      dstTokens: [tokens.arbitrum.wOETH],
    },
  },
  [arbitrum.id]: {
    [mainnet.id]: {
      srcTokens: [tokens.arbitrum.wOETH],
      dstTokens: [tokens.mainnet.wOETH],
    },
  },
};

export const defaultState: BridgeState = {
  amount: 0n,
  srcChain: mainnet,
  srcToken: tokens.mainnet.wOETH,
  srcTokens: tokenPaths[mainnet.id][arbitrum.id].srcTokens,
  dstChain: arbitrum,
  dstToken: tokens.arbitrum.wOETH,
  dstTokens: tokenPaths[mainnet.id][arbitrum.id].dstTokens,
  waitForTransfer: undefined,
};

export const { Provider: BridgeProvider, useTracked: useBridgeState } =
  createContainer(() => {
    const { address } = useAccount();
    const [state, setState] = useState(defaultState);

    // Reset `waitForTransfer` when the wallet changes.
    useEffect(() => {
      setState((state) => ({ ...state, waitForTransfer: undefined }));
    }, [address]);

    return [state, setState] as const;
  });
