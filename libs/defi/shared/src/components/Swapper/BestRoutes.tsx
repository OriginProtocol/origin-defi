import { Grid } from '@mui/material';
import {
  routeEq,
  useHandleSelectSwapRoute,
  useSwapState,
} from '@origin/shared/providers';

import { SwapRouteCard } from './SwapRouteCard';

import type { GridProps } from '@mui/material';

export type BestRoutesProps = { isLoading: boolean } & GridProps;

export function BestRoutes(props: GridProps) {
  const [{ estimatedSwapRoutes, selectedSwapRoute }] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  const isOnlyRoute = estimatedSwapRoutes.length === 1;

  return (
    <Grid spacing={1} {...props} container>
      {estimatedSwapRoutes.slice(0, 2).map((route, index) => (
        <Grid key={route.action} size={isOnlyRoute ? 12 : 6}>
          <SwapRouteCard
            key={`bestRoute-${index}`}
            isSelected={routeEq(selectedSwapRoute, route)}
            isBest={index === 0 && !isOnlyRoute}
            onSelect={handleSelectSwapRoute}
            route={route}
          />
        </Grid>
      ))}
    </Grid>
  );
}
