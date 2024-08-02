import { Card, CardContent } from '@mui/material';

import { ClaimForm } from '../components/ClaimForm';
import { ClaimHeader } from '../components/ClaimHeader';

export const ClaimView = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ClaimHeader />
        <ClaimForm />
      </CardContent>
    </Card>
  );
};
