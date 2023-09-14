import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { StateProvider } from './components/AppState';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <StateProvider>
        <App />
      </StateProvider>
    </BrowserRouter>
  </StrictMode>,
);
