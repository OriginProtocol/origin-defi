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
            mt: 3,
            mb: 10,
            pt: (theme) => ({
              xs: `${Number(theme.mixins.toolbar.height) * 2}px`,
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
