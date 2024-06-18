import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { TxButton, useIsRebaseBannerVisible } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useTxButton } from '../TxButton';

export const RebasingBanner = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isBannerVisible = useIsRebaseBannerVisible();
  const { params, callbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.OETH,
      functionName: 'rebaseOptIn',
      value: 0n,
    },
    activity: {
      type: 'rebasing',
      status: 'idle',
      tokenIdIn: tokens.mainnet.OETH.id,
    },
  });

  if (!isBannerVisible) {
    return null;
  }

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      sx={{
        p: { xs: 1.5, md: 1 },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'primary.faded',
      }}
    >
      <Typography textAlign="center" noWrap={!isSmall}>
        {intl.formatMessage({
          defaultMessage:
            'It looks like you are minting from a contract and have not opted into yield. You must opt-in to receive yield.',
        })}
      </Typography>
      <TxButton
        params={params}
        callbacks={callbacks}
        label={intl.formatMessage({ defaultMessage: 'Opt in' })}
      />
    </Stack>
  );
};
