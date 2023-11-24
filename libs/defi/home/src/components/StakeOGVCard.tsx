import { Box, Button, Stack, Typography } from '@mui/material';
import { Chip } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { defineMessage, useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

const tags = [
  {
    label: defineMessage({ defaultMessage: 'Ethereum network' }),
    icon: tokens.mainnet.ETH.icon,
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
      direction="row"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        background: (theme) => theme.palette.background.gradientPurple,
        p: 5,
        ...props?.sx,
      }}
    >
      <Stack width={0.75} alignItems="flex-start">
        <Stack direction="row" spacing={1} pb={4}>
          {tags.map((tag) => (
            <Chip
              key={intl.formatMessage(tag.label)}
              label={intl.formatMessage(tag.label)}
              icon={tag.icon}
              borderColor="grey.200"
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
      </Stack>
      <Stack width={0.25} justifyContent="center" alignItems="center">
        <Box
          component="img"
          src={tokens.mainnet.OGV.icon}
          width={216}
          height={216}
          zIndex={1}
        />
      </Stack>
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
