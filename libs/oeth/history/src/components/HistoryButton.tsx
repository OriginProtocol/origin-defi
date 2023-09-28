import { alpha, Button } from '@mui/material';

import type { ButtonProps } from '@mui/material';

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
      disableRipple
      sx={{
        background: (theme) => alpha(theme.palette.common.white, 0.1),
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'none',
        gap: 1,
        borderRadius: 8,
        paddingInline: 2,
        paddingBlock: 0.5,
        fontSize: 12,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: 1.6,
        ':hover': {
          background: (theme) => alpha(theme.palette.common.white, 0.04),
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
