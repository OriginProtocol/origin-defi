import { Container, Stack } from '@mui/material';
import { HistoryView } from '@origin/oeth/history';
import { SwapView } from '@origin/oeth/swap';
import { Route, Routes } from 'react-router-dom';

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
        <Routes>
          <Route index element={<SwapView />} />
          <Route path="history" element={<HistoryView />} />
          <Route path="swap" element={<SwapView />} />
        </Routes>
      </Container>
    </Stack>
  );
}
