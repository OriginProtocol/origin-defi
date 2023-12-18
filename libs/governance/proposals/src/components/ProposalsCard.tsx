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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { SliderSwitch, TooltipLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { descend, sort, take, zip } from 'ramda';
import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useProposals } from '../hooks';
import { StatusBadge } from './StatusBadge';

import type { CardProps, StackProps } from '@mui/material';
import type { Option } from '@origin/shared/components';

import type { Proposal } from '../types';

const PAGE_SIZE = 10;

export const ProposalsCard = (props: CardProps) => {
  const intl = useIntl();
  const [search, setSearch] = useSearchParams({
    filter: '',
    limit: PAGE_SIZE.toString(),
  });
  const limit = search.get('limit') ? Number(search.get('limit')) : PAGE_SIZE;
  const filter = search.get('filter') ?? '';
  const { data: proposals, isLoading: isProposalsLoading } = useProposals({
    select: (data) => {
      if (isNilOrEmpty(filter) || isNilOrEmpty(data)) {
        return data;
      }

      return data.filter((p) => filter === p.type);
    },
  });

  const handleFilterChange = (newVal: string | number) => {
    setSearch((params) => {
      if (isNilOrEmpty(newVal)) {
        params.delete('filter');
      } else {
        params.set('filter', newVal.toString());
      }
      return params;
    });
  };

  const handleShowMoreClick = () => {
    setSearch((params) => {
      params.set(
        'limit',
        Math.min(Number(limit) + PAGE_SIZE, proposals.length).toString(),
      );
      return params;
    });
  };

  const paginatedProposals = take(limit, proposals ?? []);
  const filterOptions: Option[] = [
    { label: intl.formatMessage({ defaultMessage: 'All' }), value: '' },
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
            onChange={handleFilterChange}
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
      onClick={handleClick}
      p={3}
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
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={8}>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={2}>
              <Box component="img" src={tokens.mainnet.OETH.icon} width={24} />
              <StatusBadge status={proposal?.status} />
              {proposal.type === 'offchain' && (
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    border: (theme) =>
                      `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                    borderRadius: 1,
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
                    {intl.formatMessage({
                      defaultMessage: 'Snapshot proposal',
                    })}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <TooltipLabel
              className="title"
              variant="h5"
              maxChars={150}
              sx={{
                maxWidth: 1,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              tooltipProps={{ placement: 'top' }}
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
            </TooltipLabel>
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
        </Grid2>
        <Grid2 xs={12} sm={4}>
          <VotesGauge choices={proposal.choices} scores={proposal.scores} />
        </Grid2>
      </Grid2>
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
            <TooltipLabel
              color="text.secondary"
              noWrap
              tooltipProps={{ placement: 'top' }}
            >
              {`${c[0]}:`}
            </TooltipLabel>
            <Typography>
              {formatAmount(c[1], tokens.mainnet.veOGV.decimals, undefined, {
                notation: 'compact',
                maximumSignificantDigits: 4,
              })}
              &nbsp;{tokens.mainnet.veOGV.symbol}
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
