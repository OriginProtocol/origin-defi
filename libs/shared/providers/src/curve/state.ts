import { useEffect, useState } from 'react';

import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { readContract } from '@wagmi/core';
import { produce } from 'immer';
import { createContainer } from 'react-tracked';
import { mainnet, useContractReads } from 'wagmi';

import { CurveFactoryABI } from './abis/CurveFactory';
import { CurveRegistryExchangeABI } from './abis/CurveRegistryExchange';

import type { HexAddress } from '@origin/shared/utils';

import type { CurveState } from './types';

export const { Provider: CurveProvider, useTrackedState: useCurve } =
  createContainer(() => {
    const [state, setState] = useState<CurveState>({
      CurveRegistryExchange: null,
      OethPoolUnderlyings: [],
    });

    const { data } = useContractReads({
      contracts: [
        {
          address: contracts.mainnet.CurveAddressProvider.address,
          abi: contracts.mainnet.CurveAddressProvider.abi,
          functionName: 'get_address',
          args: [2n],
        },
        {
          address: contracts.mainnet.CurveAddressProvider.address,
          abi: contracts.mainnet.CurveAddressProvider.abi,
          functionName: 'get_address',
          args: [3n],
        },
      ],
    });

    useEffect(() => {
      if (!isNilOrEmpty(data?.[0]?.result)) {
        setState(
          produce((draft) => {
            draft.CurveRegistryExchange = {
              address: data[0].result,
              chainId: mainnet.id,
              abi: CurveRegistryExchangeABI,
              name: 'CurveRegistryExchange',
            } as const;
          }),
        );
        console.log('Curve registry exchange initialized', data);
      }
    }, [data]);

    useEffect(() => {
      const getUnderlyings = async () => {
        const res = await readContract({
          address: data[1].result,
          abi: CurveFactoryABI,
          functionName: 'get_coins',
          args: [contracts.mainnet.curveOethPool.address],
        });

        setState(
          produce((draft) => {
            draft.OethPoolUnderlyings = res as unknown as HexAddress[];
          }),
        );
        console.log('Curve OETH Pool initialized', res);
      };

      if (!isNilOrEmpty(data?.[1]?.result)) {
        getUnderlyings();
      }
    }, [data]);

    return [state, setState];
  });
