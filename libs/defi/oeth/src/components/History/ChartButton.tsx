import { Button, hexToRgb, Box, ButtonProps, alpha } from '@mui/material';

interface Props extends ButtonProps {
  circle: boolean;
}

export function ChartButton({
  children,
  circle = false,
  onClick,
  sx,
  ...rest
}: Props) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.1),
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'none',
        gap: 1.5,
        borderRadius: 2.8,
        ...sx,
      }}
      {...rest}
    >
      {children}
      {circle ? <Circle /> : undefined}
    </Button>
  );
}

function Circle() {
  return (
    <Box
      sx={{ backgroundColor: (theme) => theme.palette.background.default,   
        height: '0.5rem',
        width: '0.5rem',
        borderRadius: '100%' }}
    />
  );
}
