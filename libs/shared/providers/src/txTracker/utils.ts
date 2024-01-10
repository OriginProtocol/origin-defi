import { simulateContract } from '@wagmi/core';
import { useSimulateContract } from 'wagmi';

import type { Config, SimulateContractParameters } from '@wagmi/core';
import type { UseSimulateContractParameters } from 'wagmi';

interface TxTrackerValue {
  id: string;
  timestamp: number;
}

/**
 * This function wraps the original `simulateContract` function from wagmi,
 * appending 4 bytes to the calldata which can be used on chain for tracking
 * transaction sources.
 */
export function simulateContractWithTxTracker(
  config: Config,
  opts: Omit<SimulateContractParameters, 'dataSuffix'>,
) {
  const dataSuffix = getDataSuffix();

  return simulateContract(config, {
    ...opts,
    dataSuffix,
  });
}

export function useSimulateContractWithTxTracker(
  opts: Omit<UseSimulateContractParameters, 'dataSuffix'>,
) {
  const dataSuffix = getDataSuffix();

  return useSimulateContract({
    ...opts,
    dataSuffix,
  });
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

  return value?.id.match(/^[0-9a-f]{8}$/) ? `0x${value.id}` : undefined;
}
