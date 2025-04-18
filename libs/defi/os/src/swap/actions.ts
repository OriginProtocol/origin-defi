import {
  magpie,
  mintOtoken,
  openOcean,
  osMetropolis,
  osShadow,
  osSwapx,
  osZapper,
  wrapOtoken,
} from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';
import type { OSRoute } from '@origin/shared/routes';

export const osSwapActions: Partial<Record<OSRoute, SwapApi>> = {
  'mint-vault-os': {
    ...mintOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'mint-zapper-os': {
    ...osZapper,
    routeLabel: defineMessage({ defaultMessage: 'Mint with Vault' }),
    buttonLabel: defineMessage({ defaultMessage: 'Mint' }),
  },
  'wrap-os-wos': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Wrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Wrap' }),
  },
  'unwrap-wos-os': {
    ...wrapOtoken,
    routeLabel: defineMessage({ defaultMessage: 'Unwrap with Origin' }),
    buttonLabel: defineMessage({ defaultMessage: 'Unwrap' }),
  },
  'swap-metropolis-os': {
    ...osMetropolis,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Metropolis' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-swapx-os': {
    ...osSwapx,
    routeLabel: defineMessage({ defaultMessage: 'Swap with SwapX' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-shadow-os': {
    ...osShadow,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Shadow' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-magpie-os': {
    ...magpie,
    routeLabel: defineMessage({ defaultMessage: 'Swap with Magpie' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-openOcean-os': {
    ...openOcean,
    routeLabel: defineMessage({ defaultMessage: 'Swap with OpenOcean' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
};
