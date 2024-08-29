import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import {
  ExpandIcon,
  ExternalLink,
  LoadingLabel,
  MiddleTruncatedLabel,
  TooltipLabel,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useReadContract } from 'wagmi';

import { useProposalQuery } from '../queries.generated';
import { parseProposalContent } from '../utils';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const DetailsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    { proposalId: proposalId ?? '' },
    { enabled: !!proposalId, select: (data) => data?.ogvProposalById },
  );

  const { description } = parseProposalContent(proposal?.description);
  const createdOn = proposal?.timestamp
    ? new Date(proposal.timestamp)
    : new Date();
  const lastUpdated = proposal?.lastUpdated
    ? new Date(proposal.lastUpdated)
    : new Date();

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Details' })} />
      <Stack>
        <CardContent>
          <Typography variant="h5" pb={3}>
            {intl.formatMessage({ defaultMessage: 'Description' })}
          </Typography>
          <LoadingLabel
            isLoading={isProposalLoading}
            sWidth={200}
            color="text.secondary"
          >
            {isNilOrEmpty(description)
              ? intl.formatMessage({ defaultMessage: 'No description' })
              : description}
          </LoadingLabel>
        </CardContent>
        <CardContent>
          <Typography variant="h5" pb={3}>
            {intl.formatMessage({ defaultMessage: 'Details' })}
          </Typography>
          <Stack spacing={1}>
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Created' })}
              value={intl.formatDate(createdOn, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
              })}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Last updated' })}
              value={intl.formatDate(lastUpdated, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
              })}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Start block' })}
              value={proposal?.startBlock}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'End block' })}
              value={proposal?.endBlock}
            />
            <ValueLabel
              {...vl}
              label={intl.formatMessage({ defaultMessage: 'Quorum' })}
              value={intl.formatMessage(
                {
                  defaultMessage: '{balance} {symbol}',
                },
                {
                  balance: formatAmount(
                    BigInt(proposal?.quorum ?? 0),
                    tokens.mainnet.veOGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 5 },
                  ),
                  symbol: tokens.mainnet.veOGV.symbol,
                },
              )}
            />
          </Stack>
        </CardContent>
        <CardContent>
          <Typography variant="h5" pb={3}>
            {intl.formatMessage({ defaultMessage: 'Actions' })}
          </Typography>
          <Actions />
        </CardContent>
      </Stack>
    </Card>
  );
};

const vl: Partial<ValueLabelProps> = {
  direction: 'row',
  labelProps: {
    fontSize: 14,
    width: 1,
  },
  valueProps: {
    fontSize: 14,
    width: 1,
  },
};

function Actions(props: StackProps) {
  const intl = useIntl();
  const { proposalId } = useParams();
  const [expanded, setExpanded] = useState<string[]>([]);
  const { data: actions, isLoading: isActionsLoading } = useReadContract({
    address: contracts.mainnet.OUSDGovernance.address,
    abi: contracts.mainnet.OUSDGovernance.abi,
    functionName: 'getActions',
    args: [BigInt(proposalId ?? '')],
    query: {
      enabled: !!proposalId,
      select: (data) =>
        data?.[0]?.map((_, i) => {
          const res = /^([a-zA-Z0-9]+)\((.*)\)$/.exec(data[2][i]);

          return {
            address: data[0][i],
            functionName: res?.[1],
            argumentType: res?.[2],
            args: data[3][i],
          };
        }),
    },
  });

  const handleToggleActionRow = (actionKey: string) => () => {
    const idx = expanded.findIndex((a) => a === actionKey);
    if (idx > -1) {
      setExpanded((prev) => remove(idx, 1, prev));
    } else {
      setExpanded((prev) => [...prev, actionKey]);
    }
  };

  return (
    <Stack {...props}>
      {isActionsLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5rem"
        >
          <CircularProgress size={20} />
        </Box>
      ) : isNilOrEmpty(actions) ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5rem"
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'No actions' })}
          </Typography>
        </Box>
      ) : (
        actions
          ?.filter((a) => !isNilOrEmpty(a.functionName))
          .map((a, i) => (
            <Accordion
              key={getKey(a.address, i)}
              expanded={expanded.includes(getKey(a.address, i))}
              onChange={handleToggleActionRow(getKey(a.address, i))}
              sx={{
                p: 0,
                background: 'transparent',
                borderTop: (theme) =>
                  i === 0 ? 'none' : `1px solid ${theme.palette.divider}`,
                borderBottom: (theme) =>
                  i === actions.length - 1
                    ? 'none'
                    : `1px solid ${theme.palette.divider}`,
                borderRight: 'none',
                borderLeft: 'none',
                borderColor: 'divider',
                ...props?.sx,
              }}
              disableGutters
            >
              <AccordionSummary sx={{ px: 0 }}>
                <Grid2 container width={1} spacing={2}>
                  <Grid2 size={3}>
                    <ExternalLink
                      href={`https://etherscan.io/address/${a.address}`}
                      sx={{ maxWidth: 120, color: 'secondary.main' }}
                    >
                      <MiddleTruncatedLabel>{a.address}</MiddleTruncatedLabel>
                    </ExternalLink>
                  </Grid2>
                  <Grid2 size={4}>
                    <TooltipLabel maxChars={23} noWrap>
                      {a.functionName}
                    </TooltipLabel>
                  </Grid2>
                  <Grid2 size={4}>
                    <TooltipLabel maxChars={30} noWrap>
                      {a.argumentType}
                    </TooltipLabel>
                  </Grid2>
                  <Grid2
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    size={1}
                  >
                    <ExpandIcon
                      isExpanded={expanded.includes(getKey(a.address, i))}
                      sx={{ width: 12 }}
                    />
                  </Grid2>
                </Grid2>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                >
                  {a.args}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
      )}
    </Stack>
  );
}

function getKey(address: string, index: number) {
  return `${address}-${index}`;
}
