import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { PoweredBySafe } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import { TransactionButton } from '../../wagmi';
import { useIsRebaseBannerVisible } from '../hooks';

import type { StackProps } from '@mui/material';

export const RebaseBanner = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const visible = useIsRebaseBannerVisible(tokens.mainnet.OETH);

  if (!visible) {
    return null;
  }

  return (
    <Stack
      {...props}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.main,
        color: 'text.primary',
        p: { xs: 1.5, md: 1 },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...props?.sx,
      })}
    >
      <PoweredBySafe sx={{ height: 20 }} />
      <Typography textAlign="center" noWrap={!isSmall}>
        {intl.formatMessage({
          defaultMessage:
            'It looks like you are minting from a contract and have not opted into yield. You must opt-in to receive yield.',
        })}
      </Typography>
      <TransactionButton
        contract={tokens.mainnet.OETH}
        functionName="rebaseOptIn"
        value={0n}
        sx={{
          whiteSpace: 'nowrap',
          backgroundColor: 'common.white',
          color: 'grey.900',
          height: 32,
          ':hover': { backgroundColor: 'grey.200' },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Opt in' })}
      </TransactionButton>
    </Stack>
  );
};
