import { Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { mergeDeepRight } from 'ramda';
import { useIntl } from 'react-intl';

import { AccountButton } from './AccountButton';

import type { ButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

interface OpenAccountModalButtonProps extends ButtonProps {
  connectLabel?: string;
  connectedProps?: ButtonProps;
  disconnectedProps?: ButtonProps;
}

export const OpenAccountModalButton = ({
  connectLabel,
  connectedProps,
  disconnectedProps,
  ...rest
}: OpenAccountModalButtonProps) => {
  const intl = useIntl();

  const handleClick =
    (handler: () => void) => (evt: MouseEvent<HTMLButtonElement>) => {
      rest?.onClick?.(evt);
      handler();
    };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        if (!mounted || !account || !chain) {
          return (
            <Button
              {...(disconnectedProps
                ? (mergeDeepRight(rest, disconnectedProps) as ButtonProps)
                : rest)}
              onClick={handleClick(openConnectModal)}
            >
              {connectLabel ||
                intl.formatMessage({ defaultMessage: 'Connect' })}
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button
              color="warning"
              {...rest}
              onClick={handleClick(openChainModal)}
            >
              {intl.formatMessage({
                defaultMessage: 'Wrong Network',
              })}
            </Button>
          );
        }

        return (
          <AccountButton
            {...(connectedProps
              ? (mergeDeepRight(rest, connectedProps) as ButtonProps)
              : rest)}
            onClick={(evt: MouseEvent<HTMLButtonElement>) => {
              rest?.onClick?.(evt);
            }}
          />
        );
      }}
    </ConnectButton.Custom>
  );
};
