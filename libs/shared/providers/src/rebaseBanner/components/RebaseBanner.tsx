import { Box, Button, Stack, Typography } from '@mui/material';
import { contracts } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

import type { StackProps } from '@mui/material';

export const RebaseBanner = (props: StackProps) => {
  const intl = useIntl();
  const { address, isConnected, connector } = useAccount();
  const { data, isLoading } = useContractRead({
    address: contracts.mainnet.OETH.address,
    abi: contracts.mainnet.OETH.abi,
    functionName: 'rebaseState',
    args: [address],
  });
  const { config } = usePrepareContractWrite({
    address: contracts.mainnet.OETH.address,
    abi: contracts.mainnet.OETH.abi,
    functionName: 'rebaseOptIn',
    value: 0n,
  });
  const { write } = useContractWrite(config);

  if (!isConnected || isLoading || data !== 0 || connector?.id !== 'safe') {
    return null;
  }

  const handleOptInClick = () => {
    write?.();
  };

  return (
    <Stack
      {...props}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={3}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: 'text.primary',
        p: { xs: 3, sm: 4 },
        alignItems: 'center',
        justifyContent: 'center',
        ...props?.sx,
      }}
    >
      <Box component="img" src="/images/poweredBySafe.svg" />
      <Typography textAlign="center">
        {intl.formatMessage({
          defaultMessage:
            'It looks like you are minting from a contract and have not opted into yield. You must opt-in to receive yield.',
        })}
      </Typography>
      <Button
        onClick={handleOptInClick}
        sx={{
          whiteSpace: 'nowrap',
          backgroundColor: 'common.white',
          color: 'grey.900',
          ':hover': { backgroundColor: 'grey.200' },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Opt in' })}
      </Button>
    </Stack>
  );
};
