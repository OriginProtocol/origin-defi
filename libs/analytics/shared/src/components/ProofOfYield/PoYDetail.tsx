import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import type { StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type PoYDetailProps = { token: Token; from?: string } & StackProps;

export const PoYDetail = ({ token, from, ...rest }: PoYDetailProps) => {
  const params = useParams();

  return (
    <Stack {...rest}>
      <Typography>Proof of yield {params.id}</Typography>
    </Stack>
  );
};
