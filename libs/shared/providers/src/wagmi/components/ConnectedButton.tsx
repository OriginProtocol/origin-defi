import { Button, CircularProgress } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { ButtonProps } from '@mui/material';

export type ConnectedButtonProps = ButtonProps &
  Omit<
    HTMLButtonElement,
    'form' | 'translate' | 'contentEditable' | 'inputMode'
  >;

export const ConnectedButton = (props: ButtonProps) => {
  const intl = useIntl();
  const { isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    const { children, onClick, disabled, ...rest } = props;

    return (
      <Button
        {...rest}
        onClick={() => {
          openConnectModal();
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Connect Wallet' })}
      </Button>
    );
  }

  if (isConnecting) {
    const { children, onClick, disabled, ...rest } = props;

    return (
      <Button {...rest} disabled>
        <CircularProgress sx={{ color: 'primary.contrastText' }} />
      </Button>
    );
  }

  return <Button {...props} />;
};
