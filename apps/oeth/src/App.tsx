import { Container, CssBaseline, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Stack>
        <Topnav
          sx={(theme) => ({
            position: 'fixed',
            top: 0,
            left: 0,
            width: 1,
            height: theme.mixins.toolbar.height,
          })}
        />
        <Container sx={{ my: 3 }} maxWidth="sm">
          <Outlet />
        </Container>
      </Stack>
    </>
  );
};
