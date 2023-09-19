import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { createHashRouter, RouterProvider } from 'react-router-dom';

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
      <RouterProvider router={router} />
    </StateProvider>
  </StrictMode>,
);
