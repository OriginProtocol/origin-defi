import { Box, Button, Stack, Typography } from '@mui/material';
import { ExternalLink, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { AddressLabel, UserAvatar } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { ascend, last, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useProposalQuery } from '../queries.generated';
import { StatusBadge } from './StatusBadge';

import type { StackProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

export const ProposalHeader = (props: StackProps) => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId,
    },
    { enabled: !isNilOrEmpty(proposalId) },
  );

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('..');
    }
  };

  const lastLog = last(
    sort(ascend(prop('timestamp')), proposal?.ogvProposalById?.logs ?? []),
  );
  const proposer = proposal?.ogvProposalById?.proposer?.id as HexAddress;

  return (
    <Stack alignItems="flex-start" spacing={4} py={5} {...props}>
      <Button
        variant="text"
        onClick={handleBack}
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
      </Button>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box component="img" src={tokens.mainnet.OETH.icon} width={24} />
        <StatusBadge
          status={proposal?.ogvProposalById?.status}
          isLoading={isProposalLoading}
        />
      </Stack>
      <LoadingLabel variant="h1" isLoading={isProposalLoading}>
        {proposal?.ogvProposalById?.description}
      </LoadingLabel>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          color="secondary"
          href=""
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Snapshot post',
          })}
          &nbsp;
          <Box
            component="img"
            src="images/icons/arrow-up-right-light.svg"
            width={10}
            ml={1}
          />
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href=""
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Discord discussion',
          })}
          &nbsp;
          <Box
            component="img"
            src="images/icons/arrow-up-right-light.svg"
            width={10}
            ml={1}
          />
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography color="text.secondary">019</Typography>
        <Box
          sx={{
            borderRadius: '50%',
            width: 5,
            height: 5,
            backgroundColor: 'text.secondary',
          }}
        />
        <Typography color="text.secondary">
          {intl.formatMessage(
            { defaultMessage: '{event} {date}' },
            {
              event: lastLog?.event,
              date: intl.formatDate(lastLog?.timestamp),
            },
          )}
        </Typography>
        <Box
          sx={{
            height: 18,
            width: '1px',
            backgroundColor: 'text.secondary',
            ml: 2,
          }}
        />
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Proposed by' })}
        </Typography>
        <UserAvatar address={proposer} width={20} />
        <ExternalLink href={`https://etherscan.io/address/${proposer}`}>
          <AddressLabel address={proposer} maxWidth={60} />
        </ExternalLink>
      </Stack>
    </Stack>
  );
};
