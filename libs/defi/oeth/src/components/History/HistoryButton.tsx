import { alpha, Box, Button } from '@mui/material';

import type { ButtonProps, SxProps } from '@mui/material';
import type { Theme } from '@origin/shared/theme';

interface Props extends ButtonProps {
  circle?: boolean;
  selected?: boolean;
}

export function HistoryFilterButton({
  children,
  circle = false,
  onClick,
  selected = false,
  sx,
  ...rest
}: Props) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        color: selected ? 'primary.contrastText' : 'text.primary',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'none',
        gap: 1.5,
        borderRadius: 14,
        paddingInline: 2,
        paddingBlock: 0.5,
        fontSize: (theme) => theme.typography.pxToRem(12),
        '&:hover': {
          background: (theme) => alpha(theme.palette.common.white, 0.1),
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
      {circle ? (
        <Circle
          // @ts-expect-error theme types
          sx={{
            background: (theme: Theme) =>
              selected
                ? theme.palette.background.gradient3
                : theme.palette.background.paper,
          }}
        />
      ) : undefined}
    </Button>
  );
}

function Circle({ sx }: { sx: SxProps }) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        height: '0.5rem',
        width: '0.5rem',
        borderRadius: '100%',
        ...sx,
      }}
    />
  );
}
