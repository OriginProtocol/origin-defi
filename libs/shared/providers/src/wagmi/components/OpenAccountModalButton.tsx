import { forwardRef } from 'react';

import { Box, Button } from '@mui/material';
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
  hideAddress?: boolean;
  hideWrongNetwork?: boolean;
}

export const OpenAccountModalButton = forwardRef<
  HTMLDivElement,
  OpenAccountModalButtonProps
>(
  (
    {
      connectLabel,
      connectedProps,
      disconnectedProps,
      hideAddress,
      hideWrongNetwork,
      children,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    const handleClick =
      (handler: () => void) => (evt: MouseEvent<HTMLButtonElement>) => {
        rest?.onClick?.(evt);
        handler();
      };

    return (
      <Box ref={ref}>
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

            if (!hideWrongNetwork && chain.unsupported) {
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
                hideAddress={hideAddress}
                {...(connectedProps
                  ? (mergeDeepRight(rest, connectedProps) as ButtonProps)
                  : rest)}
                onClick={(evt: MouseEvent<HTMLButtonElement>) => {
                  rest?.onClick?.(evt);
                }}
              >
                {children}
              </AccountButton>
            );
          }}
        </ConnectButton.Custom>
      </Box>
    );
  },
);
OpenAccountModalButton.displayName = 'OpenAccountModalButton';
