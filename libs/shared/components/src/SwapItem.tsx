import { Box, Stack } from '@mui/material';

interface Props {
  icon: string;
  name: string;
  additionalNode?: React.ReactNode;
}

export function SwapItem({ icon, name, additionalNode: Component }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.5}
      sx={{
        borderRadius: 3,
        fontSize: (theme) => theme.typography.pxToRem(18),
        fontColor: 'primary.contrastText',
        backgroundColor: 'action.hover',
        padding: 1,
      }}
    >
      <Box
        component="img"
        src={icon}
        sx={{ width: '1.5rem', height: 'auto' }}
      />
      {name}
      {Component ? Component : undefined}
    </Stack>
  );
}
