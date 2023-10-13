import { Container, Stack } from '@mui/material';
import { ErrorBoundary, ErrorPage } from '@origin/shared/components';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <ErrorBoundary ErrorComponent={<ErrorPage height={1} width={1} />}>
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
    </ErrorBoundary>
  );
};
