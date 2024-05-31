import { emphasize, IconButton } from '@mui/material';
import { ArrowDown } from '@origin/shared/icons';

import type { IconButtonProps } from '@mui/material';

export function ArrowButton(props: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: { md: 40, xs: 36 },
        height: { md: 40, xs: 36 },
        margin: 'auto',
        zIndex: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '1px solid',
        borderColor: 'divider',
        svg: {
          transition: (theme) => theme.transitions.create('transform'),
        },
        '&:hover': {
          backgroundColor: (theme) =>
            emphasize(theme.palette.background.paper, 0.1),
          svg: {
            transform: 'rotate(-180deg)',
          },
        },
        ...props?.sx,
      }}
    >
      <ArrowDown
        sx={{
          width: { md: 20, xs: 18 },
          height: { md: 20, xs: 18 },
        }}
      />
    </IconButton>
  );
}
