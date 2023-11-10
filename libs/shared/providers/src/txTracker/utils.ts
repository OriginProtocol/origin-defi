/* eslint-disable react-hooks/rules-of-hooks */
import { prepareWriteContract as prepareWriteContractOrig } from '@wagmi/core';
import { keccak256, toBytes } from 'viem';

const defaultSuffix = keccak256(toBytes('oeth.com')).slice(2, 10); // 9fed593b

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
  opts: Parameters<typeof prepareWriteContractOrig>[0],
) {
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

  const dataSuffix = value?.id.match(/^[0-9a-f]{8}$/)
    ? value.id
    : defaultSuffix;

  return prepareWriteContractOrig({ ...opts, dataSuffix: `0x${dataSuffix}` });
}
