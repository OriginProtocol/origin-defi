import { useState } from 'react';

import {
  alpha,
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
import { SliderSwitch, TooltipLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { descend, sort, take, zip } from 'ramda';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { useProposals } from '../hooks';
import { StatusBadge } from './StatusBadge';

import type { CardProps, StackProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

import type { Proposal } from '../types';

const PAGE_SIZE = 10;

export const ProposalsCard = (props: CardProps) => {
  const intl = useIntl();
  const [filter, setFilter] = useState(null);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { data: proposals, isLoading: isProposalsLoading } = useProposals({
    select: (data) => {
      if (isNilOrEmpty(filter) || isNilOrEmpty(data)) {
        return data;
      }

      return data.filter((p) => filter === p.type);
    },
  });

  const handleShowMoreClick = () => {
    setLimit(Math.min(limit + PAGE_SIZE, proposals.length));
  };

  const paginatedProposals = take(limit, proposals ?? []);
  const filterOptions: Option[] = [
    { label: intl.formatMessage({ defaultMessage: 'All' }), value: null },
    {
      label: intl.formatMessage({ defaultMessage: 'On-chain' }),
      value: 'onchain',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Snapshot' }),
      value: 'offchain',
    },
  ];

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Proposals' })}
        action={
          <SliderSwitch
            options={filterOptions}
            value={filter}
            onChange={(value) => {
              setLimit(PAGE_SIZE);
              setFilter(value);
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
  const navigate = useNavigate();

  const handleClick = () => {
    if (proposal.type === 'offchain') {
      window.open(proposal.link, '_blank');
    } else {
      navigate(proposal.id);
    }
  };

  return (
    <Stack
      role="button"
      direction="row"
      onClick={handleClick}
      p={3}
      spacing={2}
      {...rest}
      sx={{
        cursor: 'pointer',
        ':hover': {
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.01),
          '.title': {
            textDecoration: 'underline',
          },
        },
        ...rest?.sx,
      }}
    >
      <Stack width={0.7} spacing={1}>
        <Stack direction="row" spacing={2}>
          <Box component="img" src={tokens.mainnet.OETH.icon} width={24} />
          <StatusBadge proposal={proposal} />
          {proposal.type === 'offchain' && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: (theme) => `1px solid ${theme.palette.warning.main}`,
                borderRadius: 2,
                px: 0.75,
                py: 0.2,
              }}
            >
              <Box
                component="img"
                src="/images/protocols/snapshot.svg"
                width={16}
              />
              <Typography variant="body2" color="warning.main">
                {intl.formatMessage({ defaultMessage: 'Snapshot proposal' })}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Typography
          className="title"
          variant="h5"
          sx={{
            maxWidth: 1,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {proposal.title}
          {proposal.type === 'offchain' && (
            <Box
              component="img"
              src="images/icons/arrow-up-right-from-square.svg"
              width={12}
              ml={1}
            />
          )}
        </Typography>
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
  const total = scores.reduce((acc, curr) => acc + curr, 1);

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
            <TooltipLabel color="text.secondary" noWrap>
              {`${c[0]}:`}
            </TooltipLabel>
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
                  c[0] === 'For'
                    ? theme.palette.success.main
                    : c[0] === 'Against'
                      ? theme.palette.error.main
                      : theme.palette.info.main,
              },
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
}
