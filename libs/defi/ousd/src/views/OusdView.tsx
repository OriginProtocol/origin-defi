import { Container, Link, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { ousdRoute } from '../routes';

export const OusdView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Stack
        component="nav"
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        py={{ xs: 2, md: 4 }}
        px={2}
      >
        {ousdRoute.children.map((route) => (
          <Link
            key={`gov-${route?.path}`}
            component={NavLink}
            to={route?.path ?? '.'}
            end
            sx={{
              px: 3,
              py: 1,
              borderRadius: 19,
              ':hover': { backgroundColor: 'primary.main' },
              '&.active': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            {intl.formatMessage(route?.handle?.label)}
          </Link>
        ))}
      </Stack>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Stack>
  );
};
