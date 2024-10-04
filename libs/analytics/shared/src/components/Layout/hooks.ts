import { useCallback } from 'react';

import { ORIGIN_DAPP_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { produce } from 'immer';
import { useMatch } from 'react-router-dom';

import { oTokenConfig } from '../../constants';
import { useLayoutState } from './state';

export const useLayout = () => {
  const [state, setState] = useLayoutState();

  return [
    state,
    {
      handleSetDrawer: useCallback(
        (open: boolean) => {
          setState(
            produce((draft) => {
              draft.isDrawerOpen = open;
            }),
          );
        },
        [setState],
      ),
      handleToggleDrawer: useCallback(() => {
        setState(
          produce((draft) => {
            draft.isDrawerOpen = !draft.isDrawerOpen;
          }),
        );
      }, [setState]),
    },
  ] as const;
};

export const useDappHref = () => {
  const isOeth = useMatch('oeth/*');
  const isOusd = useMatch('ousd/*');
  const isSuper = useMatch('super/*');

  if (isOeth) {
    return oTokenConfig[tokens.mainnet.OETH.id]?.dappHref ?? ORIGIN_DAPP_URL;
  }
  if (isOusd) {
    return oTokenConfig[tokens.mainnet.OUSD.id]?.dappHref ?? ORIGIN_DAPP_URL;
  }
  if (isSuper) {
    return oTokenConfig[tokens.base.superOETHb.id]?.dappHref ?? ORIGIN_DAPP_URL;
  }

  return ORIGIN_DAPP_URL;
};
