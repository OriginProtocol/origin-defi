import { Button, Stack, Typography } from '@mui/material';
import { GOVERNANCE_SNAPSHOT_VOTES } from '@origin/shared/constants';
import { GoArrowUpRight } from 'react-icons/go';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const ProposalListHeader = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="center"
      spacing={3}
      py={{ xs: 3, sm: 5 }}
      {...props}
    >
      <Typography variant="h1">
        {intl.formatMessage({
          defaultMessage: 'Origin DeFi Governance',
        })}
      </Typography>
      <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
        <Button
          href={GOVERNANCE_SNAPSHOT_VOTES}
          target="_blank"
          rel="noopener noreferrer nofollow"
          sx={{
            backgroundColor: 'secondary.main',
            ':hover': { backgroundColor: 'secondary.dark' },
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'New Snapshot Proposal',
          })}
          &nbsp;
          <GoArrowUpRight />
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href="https://docs.oeth.com/governance/admin-privileges"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Learn about Governance',
          })}
          &nbsp;
          <GoArrowUpRight />
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href="https://discord.com/channels/404673842007506945/872600469959245826"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Discord Forum',
          })}
          &nbsp;
          <GoArrowUpRight />
        </Button>
      </Stack>
    </Stack>
  );
};
