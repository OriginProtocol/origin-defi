import { Container, Link, Stack } from '@mui/material';
import { ExternalLink } from '@origin/shared/components';
import {
  GOVERNANCE_DISCUSSION_FORUM,
  GOVERNANCE_SNAPSHOT_VOTES,
} from '@origin/shared/constants';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { governanceRoute } from '../routes';

export const GovernanceView = () => {
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
        {governanceRoute.children.map((route) => (
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
        <ExternalLink px={3} href={GOVERNANCE_DISCUSSION_FORUM}>
          {intl.formatMessage({ defaultMessage: 'Discussion Forum' })}
        </ExternalLink>
        <ExternalLink px={3} href={GOVERNANCE_SNAPSHOT_VOTES}>
          {intl.formatMessage({ defaultMessage: 'Snapshot Vote' })}
        </ExternalLink>
      </Stack>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Stack>
  );
};
