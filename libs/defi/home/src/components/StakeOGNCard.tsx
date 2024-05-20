import { Button, Card, Stack, Typography } from '@mui/material';
import { useOTokenApyQuery } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import type { CardProps } from '@mui/material';

export const StakeOGNCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: apr, isLoading: isAprLoading } = useOTokenApyQuery(
    {
      token: tokens.mainnet.OGN.address,
      chainId: tokens.mainnet.OGN.chainId,
    },
    { select: (data) => data?.oTokenApies?.[0]?.apr },
  );

  return (
    <Card
      {...props}
      sx={{
        backgroundColor: 'background.highlight',
        backgroundImage: `url(/images/stakingPattern.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center right',
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        ...props?.sx,
      }}
    >
      <Typography variant="h5" mb={4}>
        {intl.formatMessage({ defaultMessage: 'OGN' })}
      </Typography>
      <Typography variant="featured2" fontWeight="medium" mb={2}>
        {intl.formatMessage({
          defaultMessage:
            'Stack Diverse Rewards. Govern An Expansive Ecosystem.',
        })}
      </Typography>
      <Typography maxWidth={0.6} mb={4}>
        {intl.formatMessage({
          defaultMessage:
            'Earn rewards from all of Origin’s flagship products, and participate in paradigm-shifting proposals with OGN.',
        })}
      </Typography>
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={2}
        color="primary.main"
        mb={4}
      >
        <LoadingLabel isLoading={isAprLoading} variant="h6">
          {intl.formatNumber(apr ?? 0, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </LoadingLabel>
        <Typography variant="featured3">
          {intl.formatMessage({ defaultMessage: 'Max vAPR' })}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button size="large" component={RouterLink} to="/ogn/staking">
          {intl.formatMessage({ defaultMessage: 'Stake' })}
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={RouterLink}
          to="/more"
        >
          {intl.formatMessage({
            defaultMessage: 'View latest governance proposals',
          })}
        </Button>
      </Stack>
    </Card>
  );
};
