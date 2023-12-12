import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { descend, sort, take, zip } from 'ramda';
import { useIntl } from 'react-intl';

import { useProposals } from '../hooks';
import { ProposalsFilters } from './ProposalsFilters';
import { StatusBadge } from './StatusBadge';

import type { CardProps, StackProps } from '@mui/material';

import type { Proposal } from '../types';

const PAGE_SIZE = 10;

export const ProposalsCard = (props: CardProps) => {
  const intl = useIntl();
  const [filters, setFilters] = useState([]);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { data: proposals, isLoading: isProposalsLoading } = useProposals({
    select: (data) => {
      if (isNilOrEmpty(filters) || isNilOrEmpty(data)) {
        return data;
      }

      return data.filter((p) => filters.includes(p.type));
    },
    placeholderData: [],
  });

  const handleShowMoreClick = () => {
    setLimit(Math.min(limit + PAGE_SIZE, proposals.length));
  };

  const paginatedProposals = take(limit, proposals);

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Proposals' })}
        action={
          <ProposalsFilters
            filters={filters}
            setFilters={(filters) => {
              setLimit(PAGE_SIZE);
              setFilters(filters);
            }}
          />
        }
      />
      {isProposalsLoading ? (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '15rem',
            width: 1,
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack divider={<Divider />}>
          {paginatedProposals?.map((proposal) => (
            <ProposalRow key={proposal.id} proposal={proposal} />
          ))}
        </Stack>
      )}
      <Stack justifyContent="center" alignItems="center" py={2}>
        <Button
          variant="outlined"
          color="primary"
          sx={{ minWidth: 120 }}
          onClick={handleShowMoreClick}
          disabled={limit >= (proposals?.length ?? 0)}
        >
          {intl.formatMessage({ defaultMessage: 'Show more' })}
        </Button>
      </Stack>
    </Card>
  );
};

type ProposalRowProps = { proposal: Proposal } & StackProps;

function ProposalRow({ proposal, ...rest }: ProposalRowProps) {
  const intl = useIntl();

  return (
    <Stack direction="row" p={3} {...rest}>
      <Stack width={0.7} spacing={1}>
        <Stack direction="row" spacing={2}>
          <Box component="img" src={tokens.mainnet.OETH.icon} width={24} />
          <StatusBadge proposal={proposal} />
          {proposal.type === 'offchain' && <SnapshotBadge />}
        </Stack>
        <Typography variant="h5">{proposal.title}</Typography>
        <Stack
          direction="row"
          divider={
            <Box
              sx={{
                backgroundColor: 'grey.600',
                borderRadius: '50%',
                width: 4,
                height: 4,
              }}
            />
          }
        >
          <Typography variant="body2" color="text.secondary">
            {intl.formatDate(new Date(proposal.created), {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Typography>
        </Stack>
      </Stack>
      <Stack width={0.3}>
        <VotesGauge choices={proposal.choices} scores={proposal.scores} />
      </Stack>
    </Stack>
  );
}

function SnapshotBadge() {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.75}
      sx={{
        border: (theme) => `1px solid ${theme.palette.warning.main}`,
        px: 0.75,
        py: 0.2,
        borderRadius: 2,
      }}
    >
      <Box component="img" src="/images/protocols/snapshot.svg" width={16} />
      <Typography variant="body2" color="warning.main">
        {intl.formatMessage({ defaultMessage: 'Snapshot proposal' })}
      </Typography>
    </Stack>
  );
}

type VotesGaugeProps = {
  choices: string[];
  scores: number[];
} & StackProps;

function VotesGauge({ choices, scores, ...rest }: VotesGaugeProps) {
  const { formatAmount } = useFormat();

  const scoreVote = sort(
    descend((i) => i[1]),
    zip(choices, scores),
  );
  const total = scores.reduce((acc, curr) => acc + curr, 0);

  return (
    <Stack {...rest} spacing={3}>
      {take(2, scoreVote).map((c, i) => (
        <Stack key={c[0]} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography color="text.secondary" noWrap>
              {c[0]}:
            </Typography>
            <Typography>
              {formatAmount(c[1])}&nbsp;{tokens.mainnet.veOGV.symbol}
            </Typography>
          </Stack>
          <LinearProgress
            value={(c[1] / total) * 100}
            variant="determinate"
            sx={{
              borderRadius: 1,
              backgroundColor: 'grey.600',
              '.MuiLinearProgress-bar': {
                backgroundColor: (theme) =>
                  i === 0
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              },
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
}
