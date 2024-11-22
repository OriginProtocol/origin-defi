import { useState } from 'react';

import {
  Button,
  Card,
  CardHeader,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { ExternalLink, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { AddressLabel, useFormat, UserAvatar } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { groupBy, prop, take } from 'ramda';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { formatUnits } from 'viem';

import { governanceChoices } from '../constants';
import { useProposalQuery } from '../queries.generated';

import type { CardProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

const DEFAULT_VISIBLE = 3;

export const VoteCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const theme = useTheme();
  const [limit, setLimit] = useState<number | null>(DEFAULT_VISIBLE);
  const [filter, setFilter] = useState(governanceChoices[0]);
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId: proposalId?.toLowerCase() ?? '',
    },
    {
      enabled: !!proposalId,
      select: (data) => groupBy(prop('type'), data?.ogvProposalVotes ?? []),
    },
  );

  const handleToggleShow = () => {
    setLimit((prev) => (isNilOrEmpty(prev) ? DEFAULT_VISIBLE : null));
  };

  const votes = proposal?.[filter] ?? [];
  const visibileVotes = !limit ? votes : take(limit, votes);
  const totalVotes = votes.reduce(
    (acc, curr) =>
      acc + +formatUnits(BigInt(curr.weight), tokens.mainnet.veOGV.decimals),
    0,
  );
  const indicatorColor = {
    For: theme.palette.success.main,
    Against: theme.palette.error.main,
    Abstain: theme.palette.warning.main,
  }[filter];

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Votes' })} />
      <Stack divider={<Divider />}>
        <Tabs
          value={filter}
          onChange={(_, value) => {
            setFilter(value);
          }}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              background: indicatorColor,
            },
          }}
        >
          {governanceChoices.map((c) => (
            <Tab
              key={c}
              label={c}
              value={c}
              sx={[
                {
                  py: 1.5,
                },
                c === filter && {
                  '&.MuiButtonBase-root.MuiButtonBase-root': {
                    color: indicatorColor,
                  },
                },
              ]}
            />
          ))}
        </Tabs>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
          }}
        >
          <LoadingLabel
            isLoading={isProposalLoading}
            sx={{ color: 'text.secondary' }}
          >
            {intl.formatMessage(
              {
                defaultMessage:
                  '{count,plural,=0{No address} =1{# address} other{# addresses}}',
              },
              { count: votes.length },
            )}
          </LoadingLabel>
          <LoadingLabel
            isLoading={isProposalLoading}
            sx={{ color: 'text.secondary' }}
          >
            {intl.formatMessage(
              {
                defaultMessage: '{count} {symbol}',
              },
              {
                count:
                  totalVotes === 0
                    ? '-'
                    : formatAmount(totalVotes, undefined, undefined, {
                        notation: 'compact',
                        maximumSignificantDigits: 4,
                      }),
                symbol: tokens.mainnet.veOGV.symbol,
              },
            )}
          </LoadingLabel>
        </Stack>
        {isNilOrEmpty(votes) ? (
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'No one voted for this choice',
              })}
            </Typography>
          </Stack>
        ) : (
          visibileVotes.map((v) => (
            <Stack
              key={v.id}
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 3,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <UserAvatar address={v.voter.id as HexAddress} width={20} />
                <ExternalLink
                  href={`https://etherscan.io/address/${v.voter.id}`}
                >
                  <AddressLabel
                    address={v.voter.id as HexAddress}
                    maxWidth={60}
                  />
                </ExternalLink>
              </Stack>
              <LoadingLabel isLoading={isProposalLoading} noWrap>
                {intl.formatMessage(
                  {
                    defaultMessage: '{count} {symbol}',
                  },
                  {
                    count: formatAmount(
                      BigInt(v.weight),
                      tokens.mainnet.veOGV.decimals,
                      undefined,
                      {
                        notation: 'compact',
                        maximumSignificantDigits: 4,
                      },
                    ),
                    symbol: tokens.mainnet.veOGV.symbol,
                  },
                )}
              </LoadingLabel>
            </Stack>
          ))
        )}
        {votes.length > DEFAULT_VISIBLE && (
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              p: 1.5,
            }}
          >
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={handleToggleShow}
            >
              {intl.formatMessage(
                { defaultMessage: '{label}' },
                { label: isNilOrEmpty(limit) ? 'Show less' : 'Show more' },
              )}
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};
