import { Card, Divider, Link, Stack } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, Outlet, useMatch } from 'react-router-dom';

import { PastClaimsCard } from '../components/PastClaimsCard';
import { restakeRoute } from '../routes';

import type { RouteObject } from 'react-router-dom';

export const RestakeView = () => {
  return (
    <Stack alignItems="center" spacing={3}>
      <Card sx={{ maxWidth: { xs: 1, md: 540 }, width: 1 }}>
        <Stack sx={{ p: 2, alignItems: 'center' }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              boxShadow: (theme) =>
                `inset 0px 0px 0px 1px ${theme.palette.divider}`,
              borderRadius: 25,
            }}
          >
            {restakeRoute?.children?.map((r) => (
              <NavLink key={r?.path ?? 'index'} route={r} />
            ))}
          </Stack>
        </Stack>
        <Divider />
        <Outlet />
      </Card>
      <PastClaimsCard sx={{ maxWidth: { xs: 1, md: 540 }, width: 1 }} />
    </Stack>
  );
};

type NavLinkProps = {
  route: RouteObject;
};

const NavLink = ({ route }: NavLinkProps) => {
  const intl = useIntl();
  const match = useMatch(
    `${restakeRoute.path}/${route.index ? '' : route.path}`,
  );

  return (
    <Link
      component={RouterLink}
      to={`${restakeRoute.path}/${route.index ? '' : route.path}`}
      sx={{
        px: { xs: 1.5, md: 3 },
        py: 1,
        lineHeight: '1.625',
        color: 'text.secondary',
        fontWeight: 'medium',
        ...(!isNilOrEmpty(match) && {
          color: 'primary.contrastText',
          backgroundColor: 'primary.main',
          borderRadius: 25,
        }),
      }}
    >
      {intl.formatMessage(route.handle.label)}
    </Link>
  );
};
