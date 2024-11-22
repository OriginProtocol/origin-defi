import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { ExternalLink } from '@origin/shared/components';
import { YieldNestInverted } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router';

import type { StackProps } from '@mui/material';

export const AboutView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <MigrationDisclaimer />
      <Divider />
      <Breakdown />
      <Divider />
      <Stack
        sx={{
          p: 3,
        }}
      >
        <Button
          component={RouterLink}
          to="withdraw"
          fullWidth
          sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60 }}
        >
          {intl.formatMessage({ defaultMessage: 'Get started' })}
        </Button>
      </Stack>
    </Stack>
  );
};

const MigrationDisclaimer = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      {...props}
      sx={[
        {
          alignItems: 'center',
          p: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <YieldNestInverted sx={{ fontSize: 110 }} />
      <Typography
        variant="h4"
        sx={{
          my: 2,
          textAlign: 'center',
        }}
      >
        {intl.formatMessage({
          defaultMessage: `ynLSDe migration is live!`,
        })}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
        }}
      >
        {intl.formatMessage({
          defaultMessage: `PrimeStaked is merging with YieldNest’s ynLSDe. You can now migrate primeETH to ynLSDe. The process to migrate or withdraw your funds is outlined below. `,
        })}
      </Typography>
      <ExternalLink
        sx={{ color: 'primary.main', mt: 2 }}
        href="https://www.originprotocol.com/primeeth-ynlsde-migration-guide"
      >
        {intl.formatMessage({ defaultMessage: 'Learn more' })}
      </ExternalLink>
    </Stack>
  );
};

const Breakdown = (props: StackProps) => {
  const intl = useIntl();

  const rows = [
    {
      title: intl.formatMessage({ defaultMessage: 'Initiate withdrawal' }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'Withdraw your funds from Eigenlayer. If you plan to partially migrate to ynLSDe, please initiate one withdrawal request for the amount you wish to migrate and another for the amount you wish to claim.',
      }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Wait 7 days' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Wait for EigenLayer to process the withdrawal.',
      }),
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Migrate or Claim' }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'For each withdrawal request, you will have the option to claim your funds (in the form of OETH) or migrate them to ynLSDe.',
      }),
    },
  ];

  return (
    <Stack
      {...props}
      sx={[
        {
          p: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Typography
        sx={{
          mb: 2,
          fontWeight: 'medium',
          color: 'text.secondary',
        }}
      >
        {intl.formatMessage({
          defaultMessage: `Withdrawal Process Breakdown`,
        })}
      </Typography>
      <Stack spacing={2}>
        {rows.map((row, index) => (
          <BreakDownRow
            key={`row-${index}`}
            index={index}
            title={row.title}
            subtitle={row.subtitle}
          />
        ))}
      </Stack>
    </Stack>
  );
};

type BreakDownRowProps = {
  index: number;
  title: string;
  subtitle: string;
} & StackProps;

const BreakDownRow = ({
  index,
  title,
  subtitle,
  ...rest
}: BreakDownRowProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      {...rest}
      sx={[
        {
          alignItems: 'flex-start',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid',
          borderColor: 'primary.main',
          p: 2,
          borderRadius: '50%',
          height: 32,
          width: 32,
        }}
      >
        <Typography variant="h6">{index + 1}</Typography>
      </Box>
      <Stack spacing={0.5}>
        <Typography variant="h6">{title}</Typography>
        <Typography
          sx={{
            color: 'text.secondary',
          }}
        >
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};
