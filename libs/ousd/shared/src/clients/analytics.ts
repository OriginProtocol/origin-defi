import googleTagManager from '@analytics/google-tag-manager';
import { isNilOrEmpty } from '@origin/shared/utils';
import { Analytics } from 'analytics';
import { map } from 'ramda';
import { formatEther } from 'viem';

import type { HexAddress } from '@origin/shared/utils';

export type TrackEvent =
  | { name: 'approve_started'; approval_token: string }
  | { name: 'approve_complete'; approval_token: string }
  | { name: 'approve_failed'; approval_token: string; approve_error: string }
  | { name: 'approve_rejected'; approval_token: string }
  | { name: 'redeem_started'; redeem_amount: bigint }
  | { name: 'redeem_complete'; redeem_amount: bigint }
  | { name: 'redeem_failed'; redeem_amount: bigint; redeem_error: string }
  | { name: 'redeem_rejected'; redeem_amount: bigint }
  | {
      name: 'swap_started';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
    }
  | {
      name: 'swap_complete';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
    }
  | {
      name: 'swap_failed';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
      swap_error: string;
    }
  | {
      name: 'swap_rejected';
      swap_route: string;
      swap_token: string;
      swap_to: string;
      swap_amount: bigint;
    }
  | { name: 'change_input_amount'; change_amount_to: bigint }
  | { name: 'change_input_currency'; change_input_to: string }
  | { name: 'change_output_currency'; change_output_to: string }
  | { name: 'change_swap_route'; change_route_to: string }
  | { name: 'change_input_output' }
  | { name: 'open_account' }
  | { name: 'open_settings' }
  | { name: 'change_apy'; change_apy_to: number }
  | { name: 'show_swap_routes' }
  | { name: 'connect'; connect_address: HexAddress; connect_wallet: string }
  | { name: 'connect_click' }
  | { name: 'open_activity' }
  | { name: 'change_price_tolerance'; price_tolerance: number };

const analytics = Analytics({
  app: 'oeth-dapp',
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
