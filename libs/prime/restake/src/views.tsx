import { Card, Divider, Link, Stack, Typography } from '@mui/material';
import { trackEvent } from '@origin/prime/shared';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, Outlet, useMatch } from 'react-router-dom';

import { restakeActions } from './actions';
import { Swapper } from './components/Swapper';
import { restakeRoutes } from './constants';
import { restakeRoute } from './routes';

import type { RouteObject } from 'react-router-dom';

export const RestakeView = () => {
  return (
    <Stack alignItems="center">
      <Card sx={{ maxWidth: 520 }}>
        <Stack sx={{ p: 2, alignItems: 'center' }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              border: (theme) => `1px solid ${theme.palette.divider}`,
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
    </Stack>
  );
};

export const StakeView = () => {
  return (
    <Swapper
      swapRoutes={restakeRoutes}
      swapActions={restakeActions}
      trackEvent={trackEvent}
    />
  );
};

export const UnstakeView = () => {
  return <ComingSoon />;
};

export const WithdrawView = () => {
  return <ComingSoon />;
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
        px: 3,
        py: 1.25,
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

const ComingSoon = () => {
  const intl = useIntl();

  return (
    <Stack
      spacing={3}
      sx={{ height: 300, p: 3, alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography fontStyle="italic" variant="h3">
        {intl.formatMessage({ defaultMessage: 'Still cooking...' })}
      </Typography>
      <Typography variant="h4">
        {intl.formatMessage(
          { defaultMessage: 'You can always {link}' },
          {
            link: (
              <Link
                href="https://app.uniswap.org/swap?inputCurrency=0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615&outputCurrency=ETH"
                target="_blank"
                rel="noopener noreferrer nofollow"
                sx={{ color: 'primary.main' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'sell primeETH on Uniswap.',
                })}
              </Link>
            ),
          },
        )}
      </Typography>
    </Stack>
  );
};
