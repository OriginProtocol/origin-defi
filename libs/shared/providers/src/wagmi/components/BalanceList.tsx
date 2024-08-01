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
    <Stack px={2} py={3} spacing={2} {...rest}>
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
    <Stack direction="row" alignItems="center" gap={1} {...rest}>
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
