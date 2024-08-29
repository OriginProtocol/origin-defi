import { Stack, Typography } from '@mui/material';
import { DefaultWallet } from '@origin/shared/icons';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { ButtonProps, StackProps } from '@mui/material';

export type ConnectPageProps = {
  title?: string;
  subtitle?: string;
  buttonProps?: ButtonProps;
} & StackProps;

export const ConnectPage = ({
  title,
  subtitle,
  buttonProps,
  ...rest
}: ConnectPageProps) => {
  const intl = useIntl();

  return (
    <Stack
      {...rest}
      sx={{
        backgroundColor: 'background.highlight',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        p: 8,
        ...rest?.sx,
      }}
    >
      <Stack
        spacing={0.75}
        useFlexGap
        sx={{
          alignItems: 'center',
        }}
      >
        <DefaultWallet sx={{ fontSize: 64, color: 'primary.main' }} />
        <Typography
          variant="featured2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {title ??
            intl.formatMessage({
              defaultMessage: 'Connect your wallet to get started',
            })}
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
          {subtitle ??
            intl.formatMessage({
              defaultMessage: 'Start using this app by connecting your wallet.',
            })}
        </Typography>
        <ConnectedButton {...buttonProps} sx={{ mt: 6, minWidth: 300 }} />
      </Stack>
    </Stack>
  );
};
