import { useEffect, useState } from 'react';

import curve from '@curvefi/api';
import { createContainer } from 'react-tracked';
import { useAccount, useNetwork } from 'wagmi';

import { getEthersSigner } from '../wagmi';

export const { Provider: CurveProvider, useTrackedState: useCurve } =
  createContainer(() => {
    const [state, setState] = useState(null);
    const { isConnected } = useAccount();
    const { chain } = useNetwork();

    useEffect(() => {
      const initPublic = async () => {
        await curve.init('JsonRpc', {}, {});
        setState(curve);
      };

      const initWallet = async () => {
        const ethersSigner = await getEthersSigner({
          chainId: chain.id,
        });

        await curve.init(
          'Web3',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { externalProvider: ethersSigner.provider as any },
          {},
        );
        setState(curve);
      };

      if (isConnected) {
        initWallet();
      } else {
        initPublic();
      }
    }, [chain?.id, isConnected]);

    return [state, setState];
  });
