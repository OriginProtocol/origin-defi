import { Container, CssBaseline, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Stack minWidth={370}>
        <Topnav />
        <Container
          sx={{
            mt: 3,
            mb: 10,
          }}
          maxWidth="sm"
        >
          <Outlet />
        </Container>
      </Stack>
    </>
  );
};
