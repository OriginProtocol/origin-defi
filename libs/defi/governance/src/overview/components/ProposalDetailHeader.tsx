import { Box, Button, Stack, Typography } from '@mui/material';
import {
  ExternalLink,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaChevronLeftRegular } from '@origin/shared/icons';
import { AddressLabel, UserAvatar } from '@origin/shared/providers';
import { ascend, last, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useProposal } from '../hooks';
import { ProposalTypeBadge } from './ProposalTypeBadge';
import { StatusBadge } from './StatusBadge';

import type { StackProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';
export const ProposalDetailHeader = (props: StackProps) => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposal(
    proposalId,
    { enabled: !!proposalId },
  );

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('..');
    }
  };

  const lastLog = last(sort(ascend(prop('timestamp')), proposal?.events ?? []));
  const proposer = proposal?.proposer as HexAddress;

  return (
    <Stack alignItems="flex-start" py={6} useFlexGap {...props}>
      <Button
        variant="text"
        onClick={handleBack}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          mb: 5,
        }}
      >
        <FaChevronLeftRegular sx={{ fontSize: 10 }} />
        {intl.formatMessage({ defaultMessage: 'Proposals' })}
      </Button>
      <Stack direction="row" spacing={1} alignItems="center" mb={3.5}>
        <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 28 }} />
        <ProposalTypeBadge type={proposal?.type} />
        <StatusBadge status={proposal?.status} isLoading={isProposalLoading} />
      </Stack>
      <LoadingLabel
        variant="featured1"
        fontWeight="bold"
        isLoading={isProposalLoading}
        sx={{
          maxWidth: 1,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mb: 6,
        }}
      >
        {proposal?.title}
      </LoadingLabel>
      <Stack direction="row" alignItems="center" spacing={1}>
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
