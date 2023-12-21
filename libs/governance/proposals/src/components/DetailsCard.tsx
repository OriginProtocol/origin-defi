import { useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { LoadingLabel, ValueLabel } from '@origin/shared/components';
import { contracts } from '@origin/shared/contracts';
import { jsonStringifyReplacer } from '@origin/shared/utils';
import { defineMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useContractRead } from 'wagmi';

import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

const tabs = [
  {
    label: defineMessage({ defaultMessage: 'Description' }),
    value: 'description',
  },
  {
    label: defineMessage({ defaultMessage: 'Actions' }),
    value: 'actions',
  },
] as const;

export const DetailsCard = (props: CardProps) => {
  const intl = useIntl();
  const [tab, setTab] = useState(tabs[0].value);

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Details' })} />

      <Tabs
        value={tab}
        onChange={(_, val) => {
          setTab(val);
        }}
        sx={{
          '& .MuiTabs-indicator': {
            background: (theme) => theme.palette.text.primary,
          },
        }}
      >
        {tabs.map((t) => (
          <Tab
            key={t.value}
            label={intl.formatMessage(t.label)}
            value={t.value}
            sx={{
              fontSize: 12,
              color: 'text.secondary',
              py: 1.5,
              ':nth-of-type(1)': { pl: 3 },
            }}
          />
        ))}
      </Tabs>
      <Divider />
      <CardContent>
        {tab === 'description' ? <Description /> : <Actions />}
      </CardContent>
    </Card>
  );
};

const vl: Partial<ValueLabelProps> = {
  direction: 'row',
  labelProps: {
    fontSize: 14,
    minWidth: 90,
  },
  valueProps: {
    fontSize: 14,
  },
};

function Description(props: StackProps) {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    { proposalId },
    { enabled: !!proposalId, select: (data) => data?.ogvProposalById },
  );

  return (
    <Stack {...props}>
      <LoadingLabel isLoading={isProposalLoading} sWidth={200} pb={3}>
        {proposal?.description}
      </LoadingLabel>
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
    </Stack>
  );
}

function Actions(props: StackProps) {
  const { proposalId } = useParams();
  const { data: actions, isLoading: isActionsLoading } = useContractRead({
    address: contracts.mainnet.OUSDGovernance.address,
    abi: contracts.mainnet.OUSDGovernance.abi,
    functionName: 'getActions',
    args: [BigInt(proposalId)],
    enabled: !!proposalId,
  });

  return (
    <Stack
      {...props}
      sx={{
        backgroundColor: 'grey.900',
        borderRadius: 2,
        p: 3,
        width: '100%',
        overflow: 'hidden',
        ...props?.sx,
      }}
    >
      {isActionsLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="5rem"
        >
          <CircularProgress size={20} />
        </Box>
      ) : (
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
          {JSON.stringify(actions ?? '', jsonStringifyReplacer, 2)}
        </Typography>
      )}
    </Stack>
  );
}
