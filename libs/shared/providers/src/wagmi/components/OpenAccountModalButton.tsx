import { ConnectButton as CustomButton } from '@origin/shared/components';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIntl } from 'react-intl';

import { AccountButton } from './AccountButton';

import type { ButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

interface OpenAccountModalButtonProps extends ButtonProps {
  connectLabel?: string;
}

export const OpenAccountModalButton = ({
  connectLabel,
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
            <CustomButton
              {...props}
              connected={false}
              onClick={handleClick(openConnectModal)}
            >
              {connectLabel ||
                intl.formatMessage({ defaultMessage: 'Connect' })}
            </CustomButton>
          );
        }

        if (chain.unsupported) {
          return (
            <CustomButton
              {...props}
              connected
              onClick={handleClick(openChainModal)}
              color="warning"
            >
              {intl.formatMessage({
                defaultMessage: 'Wrong Network',
              })}
            </CustomButton>
          );
        }

        return (
          <AccountButton
            {...props}
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
