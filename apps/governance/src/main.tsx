import '@rainbow-me/rainbowkit/styles.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { chains, wagmiConfig } from '@origin/oeth/shared';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { App, Governance, Staking } from './app/app';
import { StateProvider } from './components/AppState';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Staking />,
        index: true,
      },
      {
        element: <Governance />,
        path: '/governance',
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <StateProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </WagmiConfig>
    </StateProvider>
  </StrictMode>,
);
