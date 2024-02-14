import { simulateContract } from '@wagmi/core';
import { mergeDeepRight } from 'ramda';

import type { Config, SimulateContractParameters } from '@wagmi/core';
import type { Hex } from 'viem';

interface TxTrackerValue {
  id: string;
  timestamp: number;
}

export function simulateContractWithTxTracker(
  config: Config,
  opts: Omit<SimulateContractParameters, 'dataSuffix'>,
) {
  const dataSuffix = getDataSuffix();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return simulateContract(config, mergeDeepRight(opts, { dataSuffix }) as any);
}

function getDataSuffix() {
  let value: TxTrackerValue | undefined;

  if (typeof window !== 'undefined') {
    try {
      const rawValue = window.localStorage.getItem(`@origin/tx-track`);
      if (rawValue) {
        value = JSON.parse(rawValue) as TxTrackerValue;
      }
    } catch (e) {
      /* Ignore */
    }
  }

  return value?.id.match(/^[0-9a-f]{8}$/)
    ? (`0x${value.id}` as Hex)
    : undefined;
}
