import { Skeleton, Stack, Typography } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import { useWatchBalances } from '../hooks';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type BalanceListProps = { balanceTokens?: Token[] } & StackProps;

export const BalanceList = ({ balanceTokens, ...rest }: BalanceListProps) => {
  const { data: balances, isLoading: balancesLoading } = useWatchBalances({
    tokens: balanceTokens ?? [],
  });

  return (
    <Stack
      spacing={2}
      {...rest}
      sx={[
        {
          px: 2,
          py: 3,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {!!balanceTokens &&
        balanceTokens.map((tok) => (
          <BalanceRow
            key={tok.symbol}
            token={tok}
            balance={+formatUnits(balances?.[tok.id] ?? 0n, tok.decimals)}
            isBalanceLoading={balancesLoading}
          />
        ))}
    </Stack>
  );
};

type BalanceRowProps = {
  token: Token;
  balance: number;
  isBalanceLoading: boolean;
} & StackProps;

function BalanceRow({
  token,
  balance,
  isBalanceLoading,
  ...rest
}: BalanceRowProps) {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      {...rest}
      sx={[
        {
          alignItems: 'center',
          gap: 1,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <TokenIcon token={token} sx={{ width: 20, height: 20 }} />
      <Typography>
        {isBalanceLoading ? (
          <Skeleton width={38} />
        ) : (
          intl.formatNumber(balance ?? 0, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          })
        )}
      </Typography>
      <Typography>{token.symbol}</Typography>
    </Stack>
  );
}
