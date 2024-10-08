import { depositARMLido, depositARMZapper } from '@origin/shared/routes';
import { defineMessage } from 'react-intl';

import type { SwapApi } from '@origin/shared/providers';

import type { DepositARMAction } from './types';

export const depositARMActions: Record<DepositARMAction, SwapApi> = {
  'deposit-arm-lido': {
    ...depositARMLido,
    routeLabel: defineMessage({ defaultMessage: 'Deposit' }),
    buttonLabel: defineMessage({ defaultMessage: 'Deposit' }),
  },
  'deposit-arm-zapper': {
    ...depositARMZapper,
    routeLabel: defineMessage({ defaultMessage: 'Deposit' }),
    buttonLabel: defineMessage({ defaultMessage: 'Deposit' }),
  },
};
