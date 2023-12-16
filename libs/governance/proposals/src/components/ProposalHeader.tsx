import { Box, Button, Link, Stack } from '@mui/material';
import { LoadingLabel } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { useProposalQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';

export const ProposalHeader = (props: StackProps) => {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId,
    },
    { enabled: !isNilOrEmpty(proposalId) },
  );

  return (
    <Stack alignItems="flex-start" spacing={3} py={5} {...props}>
      <Link
        component={RouterLink}
        to=".."
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          component="img"
          src="images/icons/chevron-left-light.svg"
          width={10}
        />
        {intl.formatMessage({ defaultMessage: 'Proposals' })}
      </Link>
      <LoadingLabel variant="h1" isLoading={isProposalLoading}>
        {proposal?.ogvProposalById?.description}
      </LoadingLabel>
      <Stack direction="row" spacing={2}>
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
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href="https://discord.com/channels/404673842007506945/872600469959245826"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Discord forum',
          })}
        </Button>
      </Stack>
    </Stack>
  );
};
