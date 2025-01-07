import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { ORIGIN_DOCS_URL } from '@origin/shared/constants';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const DripperCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
            {intl.formatMessage({
              defaultMessage: 'Dripper',
            })}
          </Typography>
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: `When yield is generated, it does not immediately get distributed to users’ wallets. It first goes through the Dripper, which releases the yield steadily over time. Raw yield is often generated at irregular intervals and in unpredictable amounts. The Dripper streams this yield gradually for a smoother and more predictable APY.`,
            })}
          </Typography>
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage: `Proof of Yield is shown as two distinct categories of information. Above, yield is measured from the perspective of an OETH holder after it leaves the Dripper. Below, yield from various sources is measured for the same time period prior to entering the Dripper.`,
            })}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            href={`${ORIGIN_DOCS_URL}/protocol/oeth/dripper`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage({
              defaultMessage: 'View dripper details',
            })}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
