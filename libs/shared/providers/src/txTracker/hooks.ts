import { useEffect } from 'react';

import { useLocalStorageValue } from '@react-hookz/web';
import { useSearchParams } from 'react-router-dom';

/**
 * This hook is used to store any 4 byte hex string passed in a query param
 * named 'r' in local storage. This code is used later to track transaction
 * sources on-chain by appending it to the calldata of any transaction
 * originting from the dapp.
 */
export function useTxTracker() {
  const { set: setTxTrackId } = useLocalStorageValue(`@origin/tx-track`);

  const [searchParams, setSearchParams] = useSearchParams();
  const trackId = searchParams.get('r');

  useEffect(() => {
    if (!trackId) return;

    if (trackId.match(/^[0-9a-f]{8}$/)) {
      console.log(`Track ID ${trackId}`);
      setTxTrackId({ id: trackId, timestamp: Date.now() });
    } else {
      console.log(`Invalid Track ID ${trackId}`);
    }

    searchParams.delete('r');
    setSearchParams(searchParams);
  }, [trackId, setSearchParams, setTxTrackId, searchParams]);

  return null;
}
