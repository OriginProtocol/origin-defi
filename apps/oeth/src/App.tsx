import { Container, CssBaseline, Stack } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  registerables,
} from 'chart.js';
import { Outlet } from 'react-router-dom';

import { Topnav } from './components/Topnav';

ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
);

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
          <Stack mt={3}>
            <Outlet />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};
