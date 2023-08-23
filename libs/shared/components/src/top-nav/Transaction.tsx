import { keyframes } from '@emotion/react';
import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { LinkIcon } from '../LinkIcon/LinkIcon';
import { Icon } from './Icon';
import { messages } from './utils';

import type { Approval, Rebase, Redeem, Swap, Transaction } from './types';

const spin = keyframes`
  0 {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface Props {
  transaction: Transaction;
}

export function Transaction({ transaction }: Props) {
  const intl = useIntl();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBlockEnd: '1px solid',
        borderColor: 'divider',
        padding: 2,
        '&:last-of-type': {
          borderBlockEnd: 'none',
        },
      }}
    >
      <Stack gap={0.5}>
        <Stack
          color="primary.contrastText"
          component={Typography}
          direction="row"
          gap={1}
          alignItems="center"
        >
          <Icon
            src={`/images/${transaction.status}.svg`}
            sx={{
              width: (theme) => theme.typography.pxToRem(14),
              ...(transaction.status === 'pending'
                ? {
                    animation: `${spin} 3s linear infinite`,
                  }
                : {}),
            }}
          />
          {intl.formatMessage(
            messages[`${transaction.type}-${transaction.status}`],
          )}
          <LinkIcon url={transaction.url} size="0.675rem" />
        </Stack>
        <Typography variant="body2" color="text.primary">
          {transaction.type === 'approval' && transaction.status === 'success'
            ? intl.formatMessage(messages['approval-success-message'], {
                token: transaction.token,
              })
            : transaction.type === 'approval'
            ? intl.formatMessage(messages['approval-message'], {
                token: transaction.token,
              })
            : transaction.type === 'rebase' && transaction.status === 'pending'
            ? intl.formatMessage(messages['rebase-pending-message'])
            : transaction.type === 'rebase'
            ? intl.formatMessage(messages['rebase-message'])
            : intl.formatMessage(messages['swap-message'], {
                baseTokenValue: intl.formatNumber(
                  transaction.baseTokenQuantity,
                ),
                baseToken: transaction.baseToken,
                exchangeTokenValue: intl.formatNumber(
                  transaction.exchangeTokenQuantity,
                ),
                exchangeToken: transaction.exchangeToken,
              })}
        </Typography>
      </Stack>
      <Stack
        sx={{
          p: 1,
          borderRadius: 1,
          background: (theme) => theme.palette.grey['900'],
        }}
        direction="row"
        gap={1}
        alignItems="center"
      >
        {transaction.type === 'swap' || transaction.type === 'redeem' ? (
          <>
            <Icon
              src={(transaction as Swap | Redeem).baseTokenIcon}
              sx={{
                width: (theme) => theme.typography.pxToRem(24),
              }}
            />
            <Icon
              src="/images/arrow-right.svg"
              sx={{ width: (theme) => theme.typography.pxToRem(8) }}
            />
            <Icon
              src={(transaction as Swap | Redeem).exchangeTokenIcon}
              sx={{
                width: (theme) => theme.typography.pxToRem(24),
              }}
            />
          </>
        ) : (
          <Icon
            src={(transaction as Approval | Rebase).tokenIcon}
            sx={{ width: (theme) => theme.typography.pxToRem(24) }}
          />
        )}
      </Stack>
    </Stack>
  );
}
