import { Box, Button, Stack, Typography } from '@mui/material';
import {
  ExternalLink,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaArrowUpRightRegular,
  FaChevronLeftRegular,
} from '@origin/shared/icons';
import { AddressLabel, UserAvatar } from '@origin/shared/providers';
import { ascend, last, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useProposalQuery } from '../queries.generated';
import { parseProposalContent } from '../utils';
import { StatusBadge } from './StatusBadge';

import type { StackProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';
export const ProposalDetailHeader = (props: StackProps) => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId: proposalId ?? '',
    },
    { enabled: !!proposalId },
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
  const { title } = parseProposalContent(
    proposal?.ogvProposalById?.description,
  );

  return (
    <Stack alignItems="flex-start" spacing={4} py={{ xs: 3, sm: 5 }} {...props}>
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
        <FaChevronLeftRegular sx={{ fontSize: 10 }} />
        {intl.formatMessage({ defaultMessage: 'Proposals' })}
      </Button>
      <Stack direction="row" spacing={2} alignItems="center">
        <TokenIcon symbol={tokens.mainnet.OETH.symbol} />
        <StatusBadge
          status={proposal?.ogvProposalById?.status}
          isLoading={isProposalLoading}
        />
      </Stack>
      <LoadingLabel
        variant="h1"
        isLoading={isProposalLoading}
        sx={{
          maxWidth: 1,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
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
          <FaArrowUpRightRegular />
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
          <FaArrowUpRightRegular />
        </Button>
      </Stack>
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
