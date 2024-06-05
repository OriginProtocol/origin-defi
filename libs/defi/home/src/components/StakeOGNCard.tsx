import { Button, Card, Stack, Typography } from '@mui/material';
import { useXOgnStakingApy } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import type { CardProps } from '@mui/material';

export const StakeOGNCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    undefined,
    12,
  );

  return (
    <Card
      {...props}
      sx={{
        backgroundColor: 'background.highlight',
        backgroundImage: `url(/images/stakingPattern.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundPosition: {
          xs: 'center right -550px',
          sm: 'center right -300px',
          md: 'center right -100px',
          lg: 'center right',
        },
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        ...props?.sx,
      }}
    >
      <Typography variant="h5" mb={2}>
        {intl.formatMessage({ defaultMessage: 'OGN' })}
      </Typography>
      <Typography variant="featured3" fontWeight="medium" mb={1}>
        {intl.formatMessage({
          defaultMessage:
            'Stake OGN to participate in governance and earn rewards.',
        })}
      </Typography>
      <Typography maxWidth={{ xs: 1, sm: 0.6 }} mb={2}>
        {intl.formatMessage({
          defaultMessage: `Own a stake in the network and benefit from the growth of Origin's products.`,
        })}
      </Typography>
      <Stack
        direction="row"
        alignItems="baseline"
        spacing={2}
        color="primary.main"
        mb={4}
      >
        <LoadingLabel
          isLoading={isStakingLoading}
          variant="featured1"
          fontWeight="bold"
        >
          {intl.formatNumber(staking?.xOgnApyPercentage ?? 0, {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </LoadingLabel>
        <Typography variant="body2">
          {intl.formatMessage({ defaultMessage: 'Max vAPY' })}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
        rowGap={1}
        gap={1}
      >
        <Button
          size="large"
          component={RouterLink}
          to="/ogn/staking"
          sx={{ minWidth: 100 }}
        >
          {intl.formatMessage({ defaultMessage: 'Stake' })}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          component={RouterLink}
          to="/more"
          sx={{ textWrap: 'nowrap' }}
        >
          {intl.formatMessage({
            defaultMessage: 'View latest governance proposals',
          })}
        </Button>
      </Stack>
    </Card>
  );
};
