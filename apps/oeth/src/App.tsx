import { Container, Stack } from '@mui/material';
import { HistoryView } from '@origin/oeth/history';
import { SwapView } from '@origin/oeth/swap';
import { WrapView } from '@origin/oeth/wrap';
import { Route, Routes } from 'react-router-dom';

import { ApyHeader } from './components/ApyHeader';
import { Topnav } from './components/Topnav';

export function App() {
  return (
    <Stack>
      <Topnav />
      <Container
        sx={{
          mt: {
            xs: 3,
            md: 5,
            paddingInline: {
              xs: 2,
              md: 0,
            },
          },
        }}
        maxWidth="sm"
      >
        <ApyHeader />
        <Stack mt={3}>
          <Routes>
            <Route index element={<SwapView />} />
            <Route path="wrap" element={<WrapView />} />
            <Route path="history" element={<HistoryView />} />
            <Route path="swap" element={<SwapView />} />
          </Routes>
        </Stack>
      </Container>
    </Stack>
  );
}
