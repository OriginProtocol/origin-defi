import { Card, CardContent, CardHeader } from '@mui/material';

export const BalancesCard = (params: { title: string }) => {
  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <CardHeader title={params.title} />
      <CardContent>Test 123</CardContent>
    </Card>
  );
};
