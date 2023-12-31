import { prepareWriteContract as prepareWriteContractOrig } from '@wagmi/core';
import { usePrepareContractWrite as usePrepareContractWriteOrig } from 'wagmi';

import type { PrepareWriteContractConfig } from '@wagmi/core';
import type { UsePrepareContractWriteConfig } from 'wagmi';

interface TxTrackerValue {
  id: string;
  timestamp: number;
}

/**
 * This function wraps the original `prepareWriteContract` function from wagmi,
 * appending 4 bytes to the calldata which can be used on chain for tracking
 * transaction sources.
 */
export function prepareWriteContractWithTxTracker(
  opts: Omit<PrepareWriteContractConfig, 'dataSuffix'>,
) {
  const dataSuffix = getDataSuffix();

  return prepareWriteContractOrig({
    ...opts,
    dataSuffix,
  });
}

export function usePrepareContractWriteWithTxTracker(
  opts: Omit<UsePrepareContractWriteConfig, 'dataSuffix'>,
) {
  const dataSuffix = getDataSuffix();

  return usePrepareContractWriteOrig({
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
