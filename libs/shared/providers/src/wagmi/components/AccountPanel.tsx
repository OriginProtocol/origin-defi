import { Button, Divider, Stack, Typography } from '@mui/material';
import { ExternalLink, WalletIcon } from '@origin/shared/components';
import { addressLink } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useDisconnect } from 'wagmi';

import { AddressLabel } from './AddressLabel';

import type { ButtonProps, StackProps } from '@mui/material';

export type AccountPanelProps = {
  disconnectButtonProps?: Omit<ButtonProps, 'onClick'>;
  onDisconnect?: () => void;
  px?: number;
} & Omit<StackProps, 'px'>;

export const AccountPanel = ({
  disconnectButtonProps,
  onDisconnect,
  px = 2,
  ...rest
}: AccountPanelProps) => {
  const intl = useIntl();
  const { address, connector, chain } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Stack {...rest}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
          px: px,
        }}
      >
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Account' })}
        </Typography>
        <Button
          {...disconnectButtonProps}
          onClick={() => {
            disconnect();
            onDisconnect?.();
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Disconnect' })}
        </Button>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          px: px,
          py: 3,
        }}
      >
        <WalletIcon
          walletName={connector?.name}
          sx={{ width: 20, height: 20, mr: 1.5 }}
        />
        <ExternalLink href={addressLink(chain, address)}>
          <AddressLabel address={address} short />
        </ExternalLink>
      </Stack>
    </Stack>
  );
};
