import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const VoteDelegationCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Vote Delegation' })}
      />
      <CardContent>
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Delegated to' })}&nbsp;
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'veOGV holders may delegate their voting power for off-chain votes to themselves or to another wallet address. The delegatee receives the extra voting power only on proposals the delegator has not voted on.',
            })}
          />
        </Typography>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Self' })}
        </Typography>
        <Button>
          {intl.formatMessage({ defaultMessage: 'Delegate my voting power' })}
        </Button>
      </CardContent>
      <CardContent>
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Delegated by others' })}&nbsp;
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'veOGV holders may delegate their voting power for off-chain votes to themselves or to another wallet address. The delegatee receives the extra voting power only on proposals the delegator has not voted on.',
            })}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};
