import { mintOtoken, osZapper, wrapOtoken } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';
import type { OSTokenRoute } from '@origin/shared/routes';

export const osSwapActions: Partial<Record<OSTokenRoute, SwapApi>> = {
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
};
