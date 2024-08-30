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
  Divider,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import { SectionCard } from '@origin/defi/shared';
import {
  ExternalLink,
  LoadingLabel,
  MiddleTruncatedLabel,
  TooltipLabel,
  ValueLabel,
} from '@origin/shared/components';
import { contracts } from '@origin/shared/contracts';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useReadContract } from 'wagmi';

import { useProposal } from '../hooks';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

import type { Proposal } from '../types';

export const DetailsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposal(
    proposalId,
    { enabled: !!proposalId },
  );

  const createdOn = proposal?.created ? new Date(proposal.created) : new Date();
  const lastUpdated = proposal?.updated
    ? new Date(proposal.updated)
    : new Date();

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Details' })} />
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <SectionCard
            title={intl.formatMessage({ defaultMessage: 'Description' })}
          >
            <CardContent>
              <LoadingLabel isLoading={isProposalLoading} sWidth={200}>
                {isNilOrEmpty(proposal?.description)
                  ? intl.formatMessage({ defaultMessage: 'No description' })
                  : proposal?.description}
              </LoadingLabel>
            </CardContent>
          </SectionCard>
          <SectionCard
            title={intl.formatMessage({ defaultMessage: 'Details' })}
          >
            <CardContent>
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
                        proposal?.quorum ?? 0n,
                        proposal?.token?.decimals ?? 18,
                        undefined,
                        { notation: 'compact', maximumSignificantDigits: 5 },
                      ),
                      symbol: proposal?.token.symbol ?? '',
                    },
                  )}
                  isLoading={isProposalLoading}
                />
              </Stack>
            </CardContent>
          </SectionCard>
          <SectionCard
            title={intl.formatMessage({ defaultMessage: 'Actions' })}
          >
            <Actions proposal={proposal} />
          </SectionCard>
        </Stack>
      </CardContent>
    </Card>
  );
};

const vl: Partial<ValueLabelProps> = {
  direction: 'row',
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', width: 0.25 },
  },
  valueProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', width: 1 },
  },
};

type ActionsProps = { proposal?: Proposal } & StackProps;

function Actions({ proposal, ...rest }: ActionsProps) {
  const intl = useIntl();
  const [expanded, setExpanded] = useState<string[]>([]);
  const { data: ogvActions, isLoading: isOgvActionsLoading } = useReadContract({
    address: contracts.mainnet.OUSDGovernance.address,
    abi: contracts.mainnet.OUSDGovernance.abi,
    functionName: 'getActions',
    args: [proposal?.proposalId ?? 0n],
    chainId: contracts.mainnet.OUSDGovernance.chainId,
    query: {
      enabled: !!proposal && proposal?.type === 'onchain_ogv',
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
  const { data: xOgnActions, isLoading: isxOgnActionsLoading } =
    useReadContract({
      address: contracts.mainnet.xOGNGovernance.address,
      abi: contracts.mainnet.xOGNGovernance.abi,
      functionName: 'getActions',
      args: [proposal?.proposalId ?? 0n],
      chainId: contracts.mainnet.xOGNGovernance.chainId,
      query: {
        enabled: !!proposal && proposal?.type === 'onchain',
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

  const isActionsLoading = isOgvActionsLoading || isxOgnActionsLoading;
  const actions = xOgnActions ?? ogvActions ?? [];

  return (
    <Stack {...rest} divider={<Divider />}>
      {isActionsLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '5rem',
          }}
        >
          <CircularProgress size={20} />
        </Box>
      ) : isNilOrEmpty(actions) ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '5rem',
          }}
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
                border: 'none',
                ...rest?.sx,
              }}
              disableGutters
            >
              <AccordionSummary
                sx={{ px: 2, py: 2 }}
                expandIcon={<FaChevronDownRegular />}
              >
                <Grid2
                  container
                  spacing={2}
                  sx={{
                    width: 1,
                  }}
                >
                  <Grid2 size={4}>
                    <ExternalLink
                      href={`https://etherscan.io/address/${a.address}`}
                      sx={{ maxWidth: 150, color: 'text.secondary' }}
                    >
                      <MiddleTruncatedLabel>{a.address}</MiddleTruncatedLabel>
                    </ExternalLink>
                  </Grid2>
                  <Grid2 size={4}>
                    <TooltipLabel maxChars={23} noWrap>
                      {a.functionName}
                    </TooltipLabel>
                  </Grid2>
                </Grid2>
              </AccordionSummary>
              <AccordionDetails>
                <Divider />
                <Stack
                  spacing={2}
                  sx={{
                    py: 2,
                  }}
                >
                  <ValueLabel
                    {...valueLabelProps}
                    label={intl.formatMessage({
                      defaultMessage: 'Address',
                    })}
                    value={a.address}
                  />
                  <ValueLabel
                    {...valueLabelProps}
                    label={intl.formatMessage({
                      defaultMessage: 'Function name',
                    })}
                    value={a.functionName}
                  />
                  <ValueLabel
                    {...valueLabelProps}
                    label={intl.formatMessage({
                      defaultMessage: 'Argument type',
                    })}
                    value={
                      isNilOrEmpty(a.argumentType)
                        ? intl.formatMessage({ defaultMessage: 'No arguments' })
                        : `[${a.argumentType}]`
                    }
                  />
                  <ValueLabel
                    {...valueLabelProps}
                    label={intl.formatMessage({
                      defaultMessage: 'Calldata',
                    })}
                    value={
                      a.args === '0x' ? (
                        intl.formatMessage({ defaultMessage: 'No calldata' })
                      ) : (
                        <Typography
                          component="pre"
                          variant="mono"
                          sx={{
                            fontSize: 14,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                          }}
                        >
                          {a.args}
                        </Typography>
                      )
                    }
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))
      )}
    </Stack>
  );
}

const valueLabelProps: Partial<ValueLabelProps> = {
  sx: { alignItems: 'flex-start' },
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', color: 'text.secondary', minWidth: 120 },
  },
  valueProps: { variant: 'mono' },
};

function getKey(address: string, index: number) {
  return `${address}-${index}`;
}
