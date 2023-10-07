import googleTagManager from '@analytics/google-tag-manager';
import { Analytics } from 'analytics';

export type TrackEvent =
  | { name: 'approve_started'; approval_type: string; approval_token: string }
  | { name: 'approve_complete'; approval_type: string; approval_token: string }
  | { name: 'approve_failed'; approval_type: string; approval_token: string }
  | { name: 'approve_rejected'; approval_type: string; approval_token: string }
  | {
      name: 'swap_started';
      swap_route: string;
      swap_token: string;
      swap_amount: string;
    }
  | {
      name: 'swap_complete';
      swap_type: string;
      swap_route: string;
      swap_token: string;
      swap_amount: string;
    }
  | {
      name: 'swap_failed';
      swap_type: string;
      swap_token: string;
      swap_amount: string;
    }
  | {
      name: 'swap_rejected';
      swap_type: string;
      swap_token: string;
      swap_amount: string;
    }
  | { name: 'wrap_started'; wrap_token: string; wrap_amount: string }
  | {
      name: 'wrap_complete';
      wrap_type: string;
      wrap_token: string;
      wrap_amount: string;
    }
  | {
      name: 'wrap_failed';
      wrap_type: string;
      wrap_token: string;
      wrap_amount: string;
    }
  | {
      name: 'wrap_rejected';
      wrap_type: string;
      wrap_token: string;
      wrap_amount: string;
    }
  | { name: 'change_input_amount'; change_amount_to: string }
  | { name: 'change_input_currency'; change_input_to: string }
  | { name: 'change_output_currency'; change_output_to: string }
  | { name: 'change_swap_route'; change_route_to: string }
  | { name: 'open_account' }
  | { name: 'open_settings' }
  | { name: 'change_apy'; change_apy_to: string }
  | { name: 'show_swap_routes' }
  | { name: 'connect'; connect_address: string; connect_wallet: string }
  | { name: 'connect_click' };

const analytics = Analytics({
  app: 'oeth-dapp',
  plugins: [
    googleTagManager({
      containerId: import.meta.env.VITE_GTM_CONTAINER_ID,
    }),
  ],
});

export const registerGoogleTagManager = () => {
  analytics.ready(() => {
    console.log('Analytics enabled');
  });
};

export const trackEvent = ({ name, ...rest }: TrackEvent) => {
  if (analytics.ready /*&& import.meta.env.PROD */) {
    analytics.track(name, rest);
  }
};

export const trackPage = () => {
  if (analytics.ready /*&& import.meta.env.PROD */) {
    analytics.page();
  }
};
