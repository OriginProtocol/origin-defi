import { Box, Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const ProposalListHeader = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="center"
      spacing={3}
      py={{ xs: 3, sm: 5 }}
      {...props}
    >
      <Typography variant="h1">
        {intl.formatMessage({
          defaultMessage: 'Origin DeFi Governance',
        })}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          href="https://docs.oeth.com/governance/admin-privileges"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Learn about Governance',
          })}
          <Box
            component="img"
            src="images/icons/arrow-up-right-light.svg"
            width={8}
            ml={1}
          />
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href="https://discord.com/channels/404673842007506945/872600469959245826"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({
            defaultMessage: 'Discord Forum',
          })}
          <Box
            component="img"
            src="images/icons/arrow-up-right-light.svg"
            width={8}
            ml={1}
          />
        </Button>
      </Stack>
    </Stack>
  );
};
