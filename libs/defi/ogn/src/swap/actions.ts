import { magpie, openOcean } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { OgnSwapAction } from './types';

export const ognSwapActions: Record<OgnSwapAction, SwapApi> = {
  'swap-magpie-ogn': {
    ...magpie,
    routeLabel: defineMessage({ defaultMessage: 'Swap via Magpie' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
  'swap-openOcean-ogn': {
    ...openOcean,
    routeLabel: defineMessage({ defaultMessage: 'Swap via OpenOcean' }),
    buttonLabel: defineMessage({ defaultMessage: 'Swap' }),
  },
};
