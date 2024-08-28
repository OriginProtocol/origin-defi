import { Button, Card, CardContent, Typography } from '@mui/material';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type AnalyticsCardProps = {
  token: Token;
  title?: string;
  href: string;
} & CardProps;

export const AnalyticsCard = ({
  token,
  href,
  title,
  ...rest
}: AnalyticsCardProps) => {
  const intl = useIntl();

  return (
    <Card {...rest}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography mb={1} fontWeight="medium">
          {intl.formatMessage(
            { defaultMessage: '{symbol} analytics' },
            { symbol: title ?? token.symbol },
          )}
        </Typography>
        <Typography variant="caption1" mb={3}>
          {intl.formatMessage({
            defaultMessage: 'Detailed analytics on Origin products',
          })}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Analytics',
          })}
          &nbsp;
          <FaArrowUpRightRegular />
        </Button>
      </CardContent>
    </Card>
  );
};
