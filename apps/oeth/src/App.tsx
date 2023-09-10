import { Container, CssBaseline, Stack } from '@mui/material';
import { ApyHeader } from '@origin/oeth/shared';
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
            <Outlet />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
