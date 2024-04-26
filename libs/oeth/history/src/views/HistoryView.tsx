import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { ViewTabs } from '../components/ViewTabs';

export function HistoryView() {
  return (
    <Container
      sx={{
        mt: 3,
        mb: 10,
      }}
      maxWidth="sm"
    >
      <ViewTabs />
      <Stack spacing={3}>
        <Outlet />
      </Stack>
    </Container>
  );
}
