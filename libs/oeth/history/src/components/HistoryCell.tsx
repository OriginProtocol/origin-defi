import { Stack, Typography } from '@mui/material';
import React from 'react';
import { TransactionIcon } from './TransactionIcon';
import { useIntl } from 'react-intl';
import { useTransaction } from 'wagmi';
import {
  decodeAbiParameters,
  getAbiItem,
  parseTransaction,
  serializeTransaction,
} from 'viem';
import { contracts, tokens } from '@origin/shared/contracts';
import { omit } from 'ramda';

interface Props {
  timestamp: string;
  type: 'Sent' | 'Received' | 'Yield' | 'Swap';
  transactionHash: string;
}

export function HistoryCell(props: Props) {
  const intl = useIntl();
  // @ts-expect-error whatever
  const { data } = useTransaction({ hash: props.transactionHash });

  return (
    <Stack direction="row" alignItems="center" gap={1.5}>
      {/* @ts-expect-error whatever */}
      <TransactionIcon type={props.type.toLowerCase()} />
      <Stack>
        <Typography color="primary.contrastText">{props.type}</Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatDate(new Date(props.timestamp))}
        </Typography>
      </Stack>
    </Stack>
  );
}
