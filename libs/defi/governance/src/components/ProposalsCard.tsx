import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Collapse,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ExpandIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { not, splitAt } from 'ramda';
import { useIntl } from 'react-intl';

import { proposals } from '../constants';

import type { CardProps, StackProps, TypographyProps } from '@mui/material';

import type { Proposal } from '../types';

export const ProposalsCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Proposals' })}
        action={
          <Button variant="outlined" color="secondary" size="small">
            {intl.formatMessage({ defaultMessage: 'All proposals' })}
            <ExpandIcon isExpanded={false} width={8} ml={1} />
          </Button>
        }
      />
      <Stack divider={<Divider />}>
        {proposals.map((p) => (
          <ProposalCard key={p.id} proposal={p} />
        ))}
      </Stack>
    </Card>
  );
};

type ProposalCardProps = { proposal: Proposal } & StackProps;

function ProposalCard({ proposal, ...rest }: ProposalCardProps) {
  const { id, title, token, outcomes } = proposal;
  const intl = useIntl();
  const theme = useTheme();
  const [showMore, setShowMore] = useState(false);

  const totalVotes = outcomes.reduce((acc, curr) => acc + curr.votes, 0n);
  const [first, last] = splitAt(2, outcomes);

  return (
    <Stack {...rest}>
      <Stack direction="row" p={3} spacing={1.5}>
        <Stack width={0.5} spacing={1.5} alignItems="flex-start">
          <Stack direction="row" spacing={1.5}>
            <Box component="img" src={token.icon} width={28} />
            <StatusBadge proposal={proposal} />
          </Stack>
          <Link
            href={`https://vote.ousd.com/#/proposal/${id}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {title}
          </Link>
          {!isNilOrEmpty(last) && (
            <Button
              variant="text"
              onClick={() => {
                setShowMore(not);
              }}
              sx={{ fontSize: 12 }}
            >
              {showMore
                ? intl.formatMessage({ defaultMessage: 'Show less' })
                : intl.formatMessage({ defaultMessage: 'Show more' })}
            </Button>
          )}
        </Stack>
        <Stack width={0.5} spacing={2}>
          {first.map((o, i) => (
            <OutcomeRow
              key={o.title}
              outcome={o}
              total={totalVotes}
              color={
                i === 0 ? theme.palette.success.main : theme.palette.error.main
              }
            />
          ))}
        </Stack>
      </Stack>
      <Collapse in={showMore}>
        <Stack direction="row" justifyContent="flex-end" px={3} pb={3}>
          <Stack width={0.49} spacing={1.5}>
            {last.map((o) => (
              <OutcomeRow
                key={o.title}
                outcome={o}
                total={totalVotes}
                color={theme.palette.error.main}
              />
            ))}
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
}

type StatusBadgeProps = { proposal: Proposal } & TypographyProps;

function StatusBadge({ proposal, ...rest }: StatusBadgeProps) {
  const intl = useIntl();
  const theme = useTheme();

  const label = {
    active: intl.formatMessage({ defaultMessage: 'Active' }),
    cancelled: intl.formatMessage({ defaultMessage: 'Cancelled' }),
    closed: intl.formatMessage({ defaultMessage: 'Closed' }),
  }[proposal.status];
  const color = {
    active: theme.palette.secondary.main,
    cancelled: theme.palette.text.secondary,
    closed: theme.palette.success.main,
  }[proposal.status];

  return (
    <Typography
      {...rest}
      sx={{
        color,
        border: `1px solid ${color}`,
        px: 1.5,
        py: 0.5,
        fontWeight: 500,
        borderRadius: 2,
        ...rest?.sx,
      }}
    >
      {label}
    </Typography>
  );
}

type OutcomeRowProps = {
  outcome: Proposal['outcomes'][0];
  total: bigint;
  color: string;
} & StackProps;

function OutcomeRow({ outcome, total, color, ...rest }: OutcomeRowProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} spacing={1}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{outcome.title}</Typography>
        <Typography>
          {intl.formatNumber(outcome.votes, {
            notation: 'compact',
          })}
          &nbsp;
          {tokens.mainnet.veOGV.symbol}
        </Typography>
      </Stack>
      <VoteGauge votes={outcome.votes} total={total} color={color} />
    </Stack>
  );
}

type VoteGaugeProps = {
  votes: bigint;
  total: bigint;
  color: string;
} & StackProps;

function VoteGauge({ votes, total, color, ...rest }: VoteGaugeProps) {
  const width = Number(votes) / Number(total);

  return (
    <Stack
      {...rest}
      sx={{
        width: 1,
        height: 4,
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: 'divider',
        ...rest?.sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 1,
          width,
          backgroundColor: color,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          borderTopRightRadius: width === 1 ? 8 : 0,
          borderBottomRightRadius: width === 1 ? 8 : 0,
        }}
      />
    </Stack>
  );
}
