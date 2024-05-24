import { Button, Stack } from '@mui/material';
import {
  GOVERNANCE_DISCUSSION_FORUM_URL,
  GOVERNANCE_OGN_SNAPSHOT_VOTES_URL,
  GOVERNANCE_OGV_DOCS_URL,
} from '@origin/shared/constants';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      spacing={1}
      rowGap={1}
      pt={3}
      {...props}
    >
      <Button
        variant="outlined"
        color="secondary"
        href={GOVERNANCE_OGN_SNAPSHOT_VOTES_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {intl.formatMessage({ defaultMessage: 'Snapshot proposals' })}
        <FaArrowUpRightRegular sx={{ ml: 0.75 }} />
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        href={GOVERNANCE_OGV_DOCS_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {intl.formatMessage({ defaultMessage: 'Learn about governance' })}
        <FaArrowUpRightRegular sx={{ ml: 0.75 }} />
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        href={GOVERNANCE_DISCUSSION_FORUM_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {intl.formatMessage({ defaultMessage: 'Discord forum' })}
        <FaArrowUpRightRegular sx={{ ml: 0.75 }} />
      </Button>
    </Stack>
  );
};
