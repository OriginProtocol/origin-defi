import { createContext } from 'react';

import createCache from '@emotion/cache';

export const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

export type ClientStyleContextData = {
  reset: () => void;
};

export const ClientStyleContext = createContext<ClientStyleContextData>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset: () => {},
});
