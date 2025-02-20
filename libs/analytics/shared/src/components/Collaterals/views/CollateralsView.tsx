import { Stack } from '@mui/material';

import { CollateralsCard } from '../components/CollateralsCard';
import { StrategyAllocationsCard } from '../components/StrategyAllocationsCard';
import { useCollaterals, useStrategyAllocations } from '../hooks';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type CollateralsViewProps = {
  token: Token;
  currency?: 'ETH' | 'USD';
} & StackProps;

export const CollateralsView = ({
  token,
  currency,
  ...rest
}: CollateralsViewProps) => {
  const { data: collaterals, isLoading: isLoadingCollaterals } =
    useCollaterals(token);
  const { data: strategies, isLoading: isLoadingStrategies } =
    useStrategyAllocations(token);

  return (
    <Stack spacing={3} {...rest} key={token.id}>
      <CollateralsCard
        token={token}
        collaterals={collaterals}
        isLoading={isLoadingCollaterals}
      />
      <StrategyAllocationsCard
        token={token}
        strategies={strategies}
        isLoading={isLoadingStrategies}
        currency={currency}
      />
    </Stack>
  );
};
