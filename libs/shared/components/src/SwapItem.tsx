import { Stack } from '@mui/material';

interface Props {
  icon: string;
  name: string;
  additionalNode?: React.ReactNode;
}

export function SwapItem({ icon, name }: Props) {
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
      <img src={icon} />
      {name}
    </Stack>
  );
}
