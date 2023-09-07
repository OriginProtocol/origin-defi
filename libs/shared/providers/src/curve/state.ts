/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import curve from '@curvefi/api';
import { isNilOrEmpty } from '@origin/shared/utils';
import { createContainer } from 'react-tracked';
import { mainnet, useAccount, useNetwork } from 'wagmi';

import { useEthersProvider, useEthersSigner } from '../wagmi';

export type CurveProviderProps = {
  alchemyApiKey: string;
  customRpcUrl?: string;
};

export const { Provider: CurveProvider, useTrackedState: useCurve } =
  createContainer(({ alchemyApiKey, customRpcUrl }: CurveProviderProps) => {
    const [state, setState] = useState(null);
    const { isConnected } = useAccount();
    const { chain } = useNetwork();
    const provider = useEthersProvider();
    const signer = useEthersSigner();

    useEffect(() => {
      const initPools = async () => {
        await Promise.allSettled([
          curve.factory.fetchPools(),
          curve.crvUSDFactory.fetchPools(),
          curve.EYWAFactory.fetchPools(),
          curve.cryptoFactory.fetchPools(),
          curve.tricryptoFactory.fetchPools(),
        ]);
      };

      const initPublic = async () => {
        if (isNilOrEmpty(customRpcUrl)) {
          await curve.init(
            'Alchemy',
            {
              externalProvider: provider as any,
              apiKey: alchemyApiKey,
            },
            { chainId: chain?.id ?? mainnet.id },
          );
        } else {
          await curve.init(
            'JsonRpc',
            {
              externalProvider: provider as any,
              url: customRpcUrl,
            },
            {
              chainId: chain?.id ?? mainnet.id,
            },
          );
        }

        await initPools();
        setState(curve);
        console.log('CURVE-JS public provider initialized');
      };

      const initWallet = async () => {
        if (isNilOrEmpty(customRpcUrl)) {
          await curve.init(
            'Alchemy',
            {
              externalProvider: signer as any,
              apiKey: alchemyApiKey,
            },
            { chainId: chain?.id ?? mainnet.id },
          );
        } else {
          await curve.init(
            'JsonRpc',
            {
              externalProvider: signer as any,
              url: customRpcUrl,
            },
            {
              chainId: chain?.id ?? mainnet.id,
            },
          );
        }
        await initPools();
        setState(curve);
        console.log('CURVE-JS WALLET PROVIDER INITIALIZED');
      };

      if (isConnected) {
        initWallet();
      } else {
        initPublic();
      }
    }, [alchemyApiKey, chain?.id, customRpcUrl, isConnected, provider, signer]);

    return [state, setState];
  });
