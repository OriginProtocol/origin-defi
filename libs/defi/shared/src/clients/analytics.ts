import { isNilOrEmpty } from '@origin/shared/utils';
import Plausible from 'plausible-tracker';
import { map } from 'ramda';
import { formatEther } from 'viem';

import type {
  RedeemTrackEvent,
  SwapTrackEvent,
} from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';

export type TrackEvent =
  | SwapTrackEvent
  | RedeemTrackEvent
  | { name: 'open_account' }
  | { name: 'change_apy'; change_apy_to: number }
  | { name: 'connect'; connect_address: HexAddress; connect_wallet: string }
  | { name: 'connect_click' }
  | { name: 'open_activity' };

const plausible = Plausible({
  domain: 'app.originprotocol.com',
  hashMode: true,
});

export const registerPlausible = () => {
  if (import.meta.env.PROD) {
    const { enableAutoPageviews, enableAutoOutboundTracking } = plausible;

    enableAutoPageviews();
    enableAutoOutboundTracking();
  }
};

export const trackEvent = ({ name, ...rest }: TrackEvent) => {
  if (import.meta.env.PROD) {
    plausible.trackEvent(name, map(formatParams, rest));
  }
};

// Should not be needed
export const trackPage = () => {
  if (import.meta.env.PROD) {
    plausible.trackPageview();
  }
};

function formatParams(param: string | number | bigint | HexAddress) {
  if (isNilOrEmpty(param)) {
    return;
  }

  if (typeof param === 'number') {
    return param.toString();
  } else if (typeof param === 'bigint') {
    return formatEther(param);
  } else if (typeof param === 'string' && /0x.*/.test(param)) {
    return param.substring(2);
  } else {
    return param;
  }
}
