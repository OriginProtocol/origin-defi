import { Box } from '@mui/material';

import { SwapRouteCard } from './SwapRouteCard';

import type { Route } from './SwapRoute';

interface Props {
  routes: Route[];
  selected: number;
  onSelect: (index: number) => void;
}

export function BestRoutes({ routes, selected, onSelect }: Props) {
  return (
    <Box
      sx={{
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 1,
        display: 'grid',
      }}
    >
      {routes.slice(0, 2).map((route, index) => (
        <SwapRouteCard
          index={index}
          key={index}
          selected={selected}
          onSelect={(index) => onSelect(index)}
          route={route}
        />
      ))}
    </Box>
  );
}
