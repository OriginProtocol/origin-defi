import { HistoryView, SwapView, WrapView } from '@origin/defi/oeth';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SwapView />} />
        <Route path="wrap" element={<WrapView />} />
        <Route path="history" element={<HistoryView />} />
        <Route path="swap" element={<SwapView />} />
      </Route>
    </Routes>
  );
}
