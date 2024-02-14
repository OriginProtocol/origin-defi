/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ...props
}: OpenAccountModalButtonProps) => {
  const intl = useIntl();

  const handleClick =
    (handler: () => void) => (evt: MouseEvent<HTMLButtonElement>) => {
      if (props?.onClick) {
        props.onClick(evt);
      }
      handler();
    };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        if (!mounted || !account || !chain) {
          return (
            <Button
              {...(disconnectedProps
                ? (mergeDeepRight(props, disconnectedProps) as any)
                : props)}
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
              {...props}
              onClick={handleClick(openChainModal)}
              color="warning"
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
              ? (mergeDeepRight(props, connectedProps) as any)
              : props)}
            onClick={(evt: MouseEvent<HTMLButtonElement>) => {
              if (props?.onClick) {
                props.onClick(evt);
              }
            }}
          />
        );
      }}
    </ConnectButton.Custom>
  );
};
