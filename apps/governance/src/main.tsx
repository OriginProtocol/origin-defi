import '@rainbow-me/rainbowkit/styles.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { chains, wagmiConfig } from '@origin/oeth/shared';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { StateProvider } from './components/AppState';
import { App } from './pages/app';
import { Governance } from './pages/governance';
import { Spinner } from './pages/Spinner';
import { Staking } from './pages/staking';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Staking /> },
      { path: '/governance', element: <Governance /> },
      { path: '/spinner', element: <Spinner /> },
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
