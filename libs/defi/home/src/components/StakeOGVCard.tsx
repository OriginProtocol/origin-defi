import { Box, Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Chip, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { defineMessage, useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

const tags = [
  {
    label: defineMessage({ defaultMessage: 'Ethereum network' }),
    token: tokens.mainnet.ETH,
  },
  {
    label: defineMessage({ defaultMessage: 'Governance' }),
  },
  {
    label: defineMessage({ defaultMessage: 'Staking' }),
  },
];

export const StakeOGVCard = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        background: (theme) => theme.palette.background.gradientPurple,
        p: 5,
        ...props?.sx,
      }}
    >
      <Grid2 container spacing={5}>
        <Grid2
          xs={12}
          sm={9}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            order: { xs: 1, sm: 0 },
          }}
        >
          <Stack
            direction="row"
            pb={4}
            sx={{ flexWrap: 'wrap', rowGap: 1, columnGap: 1 }}
          >
            {tags.map((tag) => (
              <Chip
                key={intl.formatMessage(tag.label)}
                label={intl.formatMessage(tag.label)}
                token={tag.token}
                borderColor="grey.200"
                labelProps={{ noWrap: true }}
              />
            ))}
          </Stack>
          <Typography variant="h1">
            {intl.formatMessage({ defaultMessage: 'Stake OGV' })}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              background:
                'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              pb: 2,
            }}
          >
            {intl.formatMessage(
              { defaultMessage: 'Earn {apy} APY' },
              {
                apy: intl.formatNumber(0.5683, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                }),
              },
            )}
          </Typography>
          <Typography pb={3}>
            {intl.formatMessage({
              defaultMessage: `Fees and voting rights accrue to OGV stakers.<br></br>Control the future of Origin products and profit from its growth.`,
            })}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'secondary.main',
              borderWidth: 2,
              height: 56,
              fontSize: 16,
              px: 5,
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Get OGV' })}
          </Button>
        </Grid2>
        <Grid2
          xs={12}
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            order: { xs: 0, sm: 1 },
          }}
        >
          <Stack justifyContent="center" alignItems="center">
            <TokenIcon
              token={tokens.mainnet.OGV}
              sx={{
                zIndex: 1,
                width: { xs: 160, md: 216 },
                height: { xs: 160, md: 216 },
              }}
            />
          </Stack>
        </Grid2>
      </Grid2>

      <Box
        component="img"
        src="images/splines21.webp"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 0.35,
          zIndex: 0,
        }}
      />
    </Stack>
  );
};
