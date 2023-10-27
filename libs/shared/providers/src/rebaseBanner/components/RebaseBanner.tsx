import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { contracts } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { useIsRebaseBannerVisible } from '../hooks';

import type { StackProps } from '@mui/material';

export const RebaseBanner = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const visible = useIsRebaseBannerVisible();
  const { config } = usePrepareContractWrite({
    address: contracts.mainnet.OETH.address,
    abi: contracts.mainnet.OETH.abi,
    functionName: 'rebaseOptIn',
    value: 0n,
    enabled: visible,
  });
  const { write } = useContractWrite(config);

  if (!visible) {
    return null;
  }

  const handleOptInClick = () => {
    write?.();
  };

  return (
    <Stack
      {...props}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: 'text.primary',
        p: { xs: 1.5, md: 1 },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...props?.sx,
      }}
    >
      <Box
        component="img"
        src="/images/poweredBySafe.svg"
        sx={{ height: 20 }}
      />
      <Typography textAlign="center" noWrap={!isSmall}>
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
          height: 32,
          ':hover': { backgroundColor: 'grey.200' },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Opt in' })}
      </Button>
    </Stack>
  );
};
