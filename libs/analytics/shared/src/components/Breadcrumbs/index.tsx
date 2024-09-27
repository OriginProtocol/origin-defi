import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Stack,
  SvgIcon,
} from '@mui/material';
import { hasKey } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatches } from 'react-router-dom';

import type { BreadcrumbsProps } from '@mui/material';

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const intl = useIntl();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matches: Record<string, any>[] = useMatches();

  const crumbs = matches.filter(
    (match) => match.handle && hasKey(match.handle as object, 'breadcrumb'),
  );

  return (
    <MuiBreadcrumbs {...props}>
      {crumbs.map((value, i) => {
        return i === 0 ? (
          <Stack
            key={value.pathname}
            direction="row"
            sx={{ alignItems: 'center' }}
          >
            <SvgIcon
              component={value.handle.icon}
              sx={{ fontSize: 24, mr: 1 }}
            />
            <Link
              component={RouterLink}
              underline="hover"
              variant="body1"
              to={value.pathname}
              key={value.pathname}
              sx={{ fontWeight: 'medium' }}
            >
              {intl.formatMessage(value.handle.breadcrumb)}
            </Link>
          </Stack>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            variant="body1"
            to={value.pathname}
            key={value.pathname}
            sx={{ fontWeight: 'medium' }}
          >
            {intl.formatMessage(value.handle.breadcrumb)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
