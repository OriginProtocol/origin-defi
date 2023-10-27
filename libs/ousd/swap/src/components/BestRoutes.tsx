import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { useHandleSelectSwapRoute } from '../hooks';
import { useSwapState } from '../state';
import { routeEq } from '../utils';
import { SwapRouteCard } from './SwapRouteCard';

import type { Grid2Props } from '@mui/material';

export type BestRoutesProps = { isLoading: boolean } & Grid2Props;

export function BestRoutes(props: Grid2Props) {
  const [{ swapRoutes, selectedSwapRoute }] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  const isOnlyRoute = swapRoutes.length === 1;

  return (
    <Grid2 spacing={1} {...props} container>
      {swapRoutes.slice(0, 2).map((route, index) => (
        <Grid2 key={route.action} xs={isOnlyRoute ? 12 : 6}>
          <SwapRouteCard
            key={`bestRoute-${index}`}
            isSelected={routeEq(selectedSwapRoute, route)}
            isBest={index === 0 && !isOnlyRoute}
            onSelect={handleSelectSwapRoute}
            route={route}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
