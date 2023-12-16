import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const MyVotingHistoryCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Voting History' })}
      />
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Box component="img" src={tokens.mainnet.OETH.icon} width={24} />
        </Stack>
      </CardContent>
    </Card>
  );
};
