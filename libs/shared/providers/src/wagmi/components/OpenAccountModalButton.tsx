import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ConnectButton as CustomButton } from '@origin/shared/components';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIntl } from 'react-intl';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import { AddressLabel } from './AddressLabel';

import type { ButtonProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';
import type { MouseEvent } from 'react';

interface OpenAccountModalButtonProps extends ButtonProps {
  connectLabel?: string;
}

export const OpenAccountModalButton = ({
  connectLabel,
  ...props
}: OpenAccountModalButtonProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address, enabled: isConnected });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: !!ensName,
  });

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
          <CustomButton
            {...props}
            connected
            onClick={(evt: MouseEvent<HTMLButtonElement>) => {
              if (props?.onClick) {
                props.onClick(evt);
              }
            }}
            sx={{
              maxWidth: '10rem',
              [theme.breakpoints.down('md')]: {
                '& > div:last-of-type': {
                  display: 'none',
                },
              },
            }}
          >
            {ensAvatar ? (
              <Box
                component={'img'}
                src={ensAvatar}
                sx={{
                  width: (theme) => theme.spacing(3),
                  height: (theme) => theme.spacing(3),
                }}
              />
            ) : (
              <Jazzicon
                diameter={24}
                paperStyles={!isSmall ? { width: '6.875rem' } : {}}
                seed={jsNumberForAddress(address)}
              />
            )}

            <AddressLabel
              address={account.address as HexAddress}
              enableEnsName
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight={500}
              fontSize="1rem"
            />
          </CustomButton>
        );
      }}
    </ConnectButton.Custom>
  );
};
