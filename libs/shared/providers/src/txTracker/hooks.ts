import { useEffect } from 'react';

import { useLocalStorageValue } from '@react-hookz/web';
import { useSearchParams } from 'react-router';
import { keccak256, toBytes } from 'viem';

import { referrerRegex } from './utils';

/**
 * This hook is used to store any 4 byte hex string passed in a query param
 * named 'r' in local storage. This code is used later to track transaction
 * sources on-chain by appending it to the calldata of any transaction
 * originting from the dapp.
 *
 * @param defaultTrackId The unhashed track ID to use if one is not found in localStorage. Eg 'oeth.com'
 */
export function useTxTracker(defaultTrackId: string) {
  const { value: storedTxTrackId, set: setTxTrackId } = useLocalStorageValue(
    `@originprotocol/tx-track`,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const trackId = searchParams.get('r');

  useEffect(() => {
    if (!trackId) {
      if (!storedTxTrackId) {
        const hashedId = keccak256(toBytes(defaultTrackId)).slice(2, 10);
        console.log(`Track ID ${hashedId}`);
        setTxTrackId({ id: hashedId, timestamp: Date.now() });
      }
      return;
    }

    if (trackId.match(/^[0-9a-f]{8}$/)) {
      console.log(`Track ID ${trackId}`);
      setTxTrackId({ id: trackId, timestamp: Date.now() });
    } else {
      console.log(`Invalid Track ID ${trackId}`);
    }

    searchParams.delete('r');
    setSearchParams(searchParams);
  }, [
    trackId,
    setSearchParams,
    setTxTrackId,
    storedTxTrackId,
    searchParams,
    defaultTrackId,
  ]);

  return null;
}

export const useReferrerTracker = (defaultReferrerId: string) => {
  const { value: storedTxReferrerId, set: setTxReferrerId } =
    useLocalStorageValue(`@originprotocol/referrer-track`);
  const [searchParams, setSearchParams] = useSearchParams();
  const referrerId = searchParams.get('r');

  useEffect(() => {
    if (!referrerId) {
      if (!storedTxReferrerId) {
        setTxReferrerId({ id: defaultReferrerId, timestamp: Date.now() });
      }
      return;
    }

    if (referrerId.match(referrerRegex)) {
      console.log(`Referrer ID ${referrerId}`);
      setTxReferrerId({ id: referrerId, timestamp: Date.now() });
    } else {
      console.log(`Invalid Referrer ID ${referrerId}`);
    }

    searchParams.delete('r');
    setSearchParams(searchParams);
  }, [
    referrerId,
    setSearchParams,
    setTxReferrerId,
    storedTxReferrerId,
    searchParams,
    defaultReferrerId,
  ]);

  return null;
};
