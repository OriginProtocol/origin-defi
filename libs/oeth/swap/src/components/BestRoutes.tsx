import { Box } from '@mui/material';

import { useHandleSelectSwapRoute } from '../hooks';
import { useSwapState } from '../state';
import { routeEq } from '../utils';
import { SwapRouteCard } from './SwapRouteCard';

import type { BoxProps } from '@mui/material';

export function BestRoutes(props: BoxProps) {
  const [{ swapRoutes, selectedSwapRoute }] = useSwapState();
  const handleSelectSwapRoute = useHandleSelectSwapRoute();

  return (
    <Box
      sx={{
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 1,
        display: 'grid',
      }}
    >
      {swapRoutes.slice(0, 2).map((route, index) => (
        <SwapRouteCard
          key={`bestRoute-${index}`}
          isSelected={routeEq(selectedSwapRoute, route)}
          isBest={index === 0}
          onSelect={handleSelectSwapRoute}
          route={route}
        />
      ))}
    </Box>
  );
}
