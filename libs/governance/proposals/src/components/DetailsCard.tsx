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
  Stack,
  Typography,
} from '@mui/material';
import {
  ExpandIcon,
  ExternalLink,
  LoadingLabel,
  MiddleTruncated,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useContractRead } from 'wagmi';

import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const DetailsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    { proposalId },
    { enabled: !!proposalId, select: (data) => data?.ogvProposalById },
  );

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
            pb={3}
          >
            {proposal?.description}
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
              value={intl.formatDate(new Date(proposal?.timestamp), {
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
              value={intl.formatDate(new Date(proposal?.lastUpdated), {
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
  const [expanded, setExpanded] = useState(null);
  const { data: actions, isLoading: isActionsLoading } = useContractRead({
    address: contracts.mainnet.OUSDGovernance.address,
    abi: contracts.mainnet.OUSDGovernance.abi,
    functionName: 'getActions',
    args: [BigInt(proposalId)],
    enabled: !!proposalId,
    select: (data) =>
      data?.[0]?.map((_, i) => {
        const res = /^([a-zA-Z0-9]+)\((.+)\)$/.exec(data[2][i]);

        return {
          address: data[0][i],
          functionName: res[1],
          argumentType: res[2],
          args: data[3][i],
        };
      }),
  });

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
        actions.map((a, i) => (
          <Accordion
            key={`${a.address}-${i}`}
            expanded={expanded === `${a.address}-${i}`}
            onChange={() => {
              setExpanded(
                expanded === `${a.address}-${i}` ? null : `${a.address}-${i}`,
              );
            }}
            sx={{
              px: 2,
              py: 0,
              backgroundColor: 'grey.900',
              borderRadius: 1,
              ...props?.sx,
            }}
            disableGutters
          >
            <AccordionSummary>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                width={1}
              >
                <Stack direction="row" spacing={2}>
                  <ExternalLink
                    href={`https://etherscan.io/address/${a.address}`}
                  >
                    <MiddleTruncated maxWidth={120}>
                      {a.address}
                    </MiddleTruncated>
                  </ExternalLink>
                  <Typography color="secondary">{a.functionName}</Typography>
                  <Typography>{a.argumentType}</Typography>
                </Stack>
                <ExpandIcon
                  isExpanded={expanded === `${a.address}-${i}`}
                  width={10}
                />
              </Stack>
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
