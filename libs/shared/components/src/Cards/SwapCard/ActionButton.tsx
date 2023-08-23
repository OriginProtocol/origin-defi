import { Button } from '@mui/material';

import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {}

export function ActionButton({ sx, children, ...rest }: Props) {
  return (
    <Button
      fullWidth
      sx={{
        background: (theme) => theme.palette.background.gradient1,
        color: 'primary.contrastText',
        paddingBlock: 2,
        fontSize: (theme) => theme.typography.pxToRem(20),
        lineHeight: '2rem',
        borderRadius: 2,
        fontFamily: 'Sailec, Inter, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontStyle: 'normal',
        boxShadow: (theme) => theme.shadows[24],
        '&:hover': {
          background: (theme) =>
            theme.palette.background.gradientHoverActionButton,
          opacity: 1,
        },
        '&:disabled': {
          background:
            'linear-gradient(90deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-dark) 100%)',
          opacity: 0.3,
          color: 'primary.contrastText',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
