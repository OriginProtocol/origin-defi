import '@rainbow-me/rainbowkit/styles.css';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { StateProvider } from './components/AppState';
import { App } from './pages/app';
import { Governance } from './pages/governance';
import { Staking } from './pages/staking';
import { chains, wagmiConfig } from './utils/wagmi';

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