import googleTagManager from '@analytics/google-tag-manager';
import { isNilOrEmpty } from '@origin/shared/utils';
import { Analytics } from 'analytics';
import { map } from 'ramda';
import { formatEther } from 'viem';

import type { SwapTrackEvent } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';

export type TrackEvent =
  | SwapTrackEvent
  | { name: 'redeem_started'; redeem_amount: bigint }
  | { name: 'redeem_complete'; redeem_amount: bigint }
  | { name: 'redeem_failed'; redeem_amount: bigint; redeem_error: string }
  | { name: 'redeem_rejected'; redeem_amount: bigint }
  | { name: 'open_account' }
  | { name: 'change_apy'; change_apy_to: number }
  | { name: 'connect'; connect_address: HexAddress; connect_wallet: string }
  | { name: 'connect_click' }
  | { name: 'open_activity' };

const analytics = Analytics({
  app: 'ousd-dapp',
  plugins: [
    ...(isNilOrEmpty(import.meta.env.VITE_GTM_CONTAINER_ID)
      ? []
      : [
          googleTagManager({
            containerId: import.meta.env.VITE_GTM_CONTAINER_ID,
          }),
        ]),
  ],
});

export const registerGoogleTagManager = () => {
  analytics.ready(() => {
    console.log('Analytics enabled');
  });
};

export const trackEvent = ({ name, ...rest }: TrackEvent) => {
  if (analytics.ready /*&& import.meta.env.PROD */) {
    analytics.track(name, map(formatParams, rest));
  }
};

export const trackPage = () => {
  if (analytics.ready /*&& import.meta.env.PROD */) {
    analytics.page();
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
