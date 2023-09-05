import { useEffect, useState } from 'react';

import curve from '@curvefi/api';
import { createContainer } from 'react-tracked';
import { mainnet, useAccount, useNetwork } from 'wagmi';

import { getEthersProvider, getEthersSigner } from '../wagmi';

export type CurveProviderProps = { alchemyApiKey: string };

export const { Provider: CurveProvider, useTrackedState: useCurve } =
  createContainer(({ alchemyApiKey }: CurveProviderProps) => {
    const [state, setState] = useState(null);
    const { isConnected } = useAccount();
    const { chain } = useNetwork();

    useEffect(() => {
      const initPools = async () => {
        await Promise.allSettled([
          curve.factory.fetchPools(),
          curve.crvUSDFactory.fetchPools(),
          curve.EYWAFactory.fetchPools(),
          curve.cryptoFactory.fetchPools(),
          curve.tricryptoFactory.fetchPools(),
        ]);
        console.log('CURVE-JS POOLS INITIALIZED');
      };

      const initPublic = async () => {
        const ethersProvider = getEthersProvider({
          chainId: chain?.id ?? mainnet.id,
        });
        await curve.init(
          'Alchemy',
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            externalProvider: ethersProvider as any,
            apiKey: alchemyApiKey,
          },
          { chainId: chain?.id ?? mainnet.id },
        );
        await initPools();
        setState(curve);
      };

      const initWallet = async () => {
        const ethersSigner = await getEthersSigner({
          chainId: chain.id,
        });

        await curve.init(
          'Alchemy',
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            externalProvider: ethersSigner as any,
            apiKey: alchemyApiKey,
          },
          {
            chainId: chain.id,
          },
        );
        await initPools();
        setState(curve);
      };

      if (isConnected) {
        initWallet();
      } else {
        initPublic();
      }
    }, [alchemyApiKey, chain?.id, isConnected]);

    return [state, setState];
  });