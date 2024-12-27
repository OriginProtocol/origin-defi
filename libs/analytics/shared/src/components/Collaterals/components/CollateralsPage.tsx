import { Stack } from '@mui/material';

import { useCollaterals, useStrategyAllocations } from '../hooks';
import { CollateralsCard } from './CollateralsCard';
import { StrategyAllocationsCard } from './StrategyAllocationsCard';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type CollateralsPageProps = {
  token: Token;
  currency?: 'ETH' | 'USD';
} & StackProps;

export const CollateralsPage = ({
  token,
  currency,
  ...rest
}: CollateralsPageProps) => {
  const { data: collaterals, isLoading: isLoadingCollaterals } =
    useCollaterals(token);
  const { data: strategies, isLoading: isLoadingStrategies } =
    useStrategyAllocations(token);

  return (
    <Stack spacing={3} {...rest}>
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
