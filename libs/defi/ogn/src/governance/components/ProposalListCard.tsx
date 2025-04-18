import {
  alpha,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  SliderSwitch,
  TokenIcon,
  TooltipLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightFromSquareRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { descend, sort, take, zip } from 'ramda';
import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router';

import { useProposals } from '../hooks';
import { ProposalTypeBadge } from './ProposalTypeBadge';
import { StatusBadge } from './StatusBadge';

import type { CardProps, StackProps } from '@mui/material';
import type { Option } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

import type { Proposal, ProposalType } from '../types';

const PAGE_SIZE = 10;

export const ProposalListCard = (props: CardProps) => {
  const intl = useIntl();
  const [search, setSearch] = useSearchParams({
    filter: '',
    limit: PAGE_SIZE.toString(),
  });
  const limit = search.get('limit') ? Number(search.get('limit')) : PAGE_SIZE;
  const filter = search.get('filter') ?? '';
  const { data: proposals, isLoading: isProposalsLoading } = useProposals({
    select: (data) => {
      if (!filter || isNilOrEmpty(data)) {
        return data;
      }

      return data.filter((p) => {
        return (
          (filter === 'snapshot' &&
            ['snapshot', 'snapshot_ogv'].includes(p.type)) ||
          (filter === 'onchain' && ['onchain', 'onchain_ogv'].includes(p.type))
        );
      });
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
        Math.min(Number(limit) + PAGE_SIZE, proposals?.length ?? 0).toString(),
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
      value: 'snapshot',
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
            sx={{ borderRadius: 2, backgroundColor: 'background.default' }}
            selectedSx={{
              borderRadius: 2,
              backgroundColor: 'background.highlight',
              boxShadow: (theme) =>
                `inset 0 0 0 2px ${theme.palette.background.default},inset 0 0 0 3px ${theme.palette.divider}`,
            }}
          />
        }
      />
      <Divider />
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
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
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
    if (['snapshot', 'snapshot_ogv'].includes(proposal.type)) {
      window.open(proposal.link, '_blank');
    } else {
      navigate(`/ogn/governance/${proposal.id}`);
    }
  };

  return (
    <Stack
      role="button"
      onClick={handleClick}
      {...rest}
      sx={[
        {
          p: 3,
          cursor: 'pointer',
          ':hover': {
            background: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.hoverOpacity,
              ),
            '.title': {
              textDecoration: 'underline',
            },
          },
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            sm: 8,
          }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1}>
              <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 24 }} />
              <ProposalTypeBadge type={proposal.type} />
              <StatusBadge status={proposal?.status} />
            </Stack>
            <TooltipLabel
              className="title"
              maxChars={60}
              sx={{
                fontWeight: 'medium',
                maxWidth: 1,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                svg: { ml: 0.75 },
              }}
            >
              {proposal.title}
              {proposal.type === 'snapshot' && (
                <FaArrowUpRightFromSquareRegular sx={{ fontSize: 12 }} />
              )}
            </TooltipLabel>
            <TooltipLabel
              variant="body3"
              color="text.secondary"
              maxChars={150}
              sx={{
                maxWidth: 1,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {proposal?.description}
            </TooltipLabel>
            <Stack
              direction="row"
              divider={
                <Box
                  sx={{
                    backgroundColor: 'text.secondary',
                    borderRadius: '50%',
                    width: 4,
                    height: 4,
                  }}
                />
              }
            >
              <Typography
                variant="caption1"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatDate(new Date(proposal.created), {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <VotesGauge
            token={proposal?.token}
            choices={proposal?.choices ?? []}
            scores={proposal?.scores ?? []}
            type={proposal?.type}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

type VotesGaugeProps = {
  token?: Token;
  choices: string[];
  scores: number[];
  type: ProposalType;
} & StackProps;

function VotesGauge({
  choices,
  scores,
  type,
  token,
  ...rest
}: VotesGaugeProps) {
  const intl = useIntl();
  const theme = useTheme();
  const { formatAmount } = useFormat();

  const scoreVote = sort(
    descend((i: [string, number]) => i[1]),
    zip(choices, scores),
  );
  const total = scores.reduce((acc, curr) => acc + curr, 1);

  return (
    <Stack {...rest} spacing={3}>
      {take(2, scoreVote).map((c) => {
        const progressColor =
          {
            For: theme.palette.success.main,
            Against: theme.palette.error.main,
          }[c[0] as string] ?? theme.palette.primary.main;

        return (
          <Stack key={c[0]} spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TooltipLabel color="text.secondary" noWrap>
                {`${c[0]}:`}
              </TooltipLabel>
              <Typography>
                {formatAmount(c[1], token?.decimals ?? 18, undefined, {
                  notation: 'compact',
                  maximumSignificantDigits: 4,
                })}
                &nbsp;{token?.symbol ?? ''}
              </Typography>
            </Stack>
            <LinearProgress
              value={(c[1] / total) * 100}
              variant="determinate"
              sx={[
                {
                  borderRadius: 1,
                  backgroundColor: 'divider',
                  '.MuiLinearProgress-bar': {
                    backgroundColor: progressColor,
                  },
                },
              ]}
            />
          </Stack>
        );
      })}
      {scoreVote.length > 2 && (
        <Typography
          variant="caption1"
          sx={{
            color: 'text.secondary',
          }}
        >
          {intl.formatMessage(
            {
              defaultMessage:
                'Plus {count,plural, =1{# more option} other{# more options}}...',
            },
            { count: scoreVote.length - 2 },
          )}
        </Typography>
      )}
    </Stack>
  );
}
