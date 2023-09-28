import { Container, CssBaseline, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Stack>
        <Topnav />
        <Container
          sx={{
            mt: { xs: 3.25, md: 3 },
            mb: 10,
            pt: (theme) => ({
              xs: '112px',
              md: `${theme.mixins.toolbar.height}px`,
            }),
          }}
          maxWidth="sm"
        >
          <Outlet />
        </Container>
      </Stack>
    </>
  );
};
