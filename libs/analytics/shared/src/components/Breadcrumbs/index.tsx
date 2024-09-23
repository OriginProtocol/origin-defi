import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { hasKey } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatches } from 'react-router-dom';

export const Breadcrumbs = () => {
  const intl = useIntl();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const matches: Record<string, any>[] = useMatches();

  const crumbs = matches.filter(
    (match) => match.handle && hasKey(match.handle as object, 'breadcrumb'),
  );

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {crumbs.map((value) => {
        return (
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={value.pathname}
            key={value.pathname}
          >
            {intl.formatMessage(value.handle.breadcrumb)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
