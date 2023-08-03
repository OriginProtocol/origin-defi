import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export function WidgetContainer({ children }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1.75fr' },
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
}
