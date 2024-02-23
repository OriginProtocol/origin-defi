import { simulateContract } from '@wagmi/core';
import { mergeDeepRight } from 'ramda';
import { toHex } from 'viem';

import type { Config, SimulateContractParameters } from '@wagmi/core';
import type { Hex } from 'viem';

interface TxTrackerValue {
  id: string;
  timestamp: number;
}

export const referrerRegex = /^[0-9A-Z]{4,42}$/i;

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
    } catch {}
  }

  return value?.id.match(/^[0-9a-f]{8}$/)
    ? (`0x${value.id}` as Hex)
    : undefined;
}

export function simulateContractWithReferral(
  config: Config,
  opts: Omit<SimulateContractParameters, 'dataSuffix'>,
) {
  const referrerId = getReferrerId() ?? '';

  return simulateContract(
    config,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergeDeepRight(opts, { dataSuffix: toHex(referrerId) }) as any,
  );
}

export function getReferrerId() {
  let value: string | undefined = undefined;
  try {
    const raw = window.localStorage.getItem(`@origin/referrer-track`);
    if (!raw) {
      return value;
    }
    const id = JSON.parse(raw).id as string;
    if (id.match(referrerRegex)) {
      value = id;
    }
  } catch {}

  return value;
}
