import {
  Collapse,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { TxButton, useIsRebaseBannerVisible } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useTxButton } from '../TxButton';

import type { StackProps } from '@mui/material';
import type { Contract, Token } from '@origin/shared/contracts';

export type RebasingBannerProps = { token: Token } & StackProps;

export const RebasingBanner = ({ token, ...rest }: RebasingBannerProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isBannerVisible = useIsRebaseBannerVisible(token);
  const { params, callbacks } = useTxButton({
    params: {
      contract: token as Contract,
      functionName: 'rebaseOptIn',
      value: 0n,
    },
    activity: {
      type: 'rebasing',
      status: 'idle',
      tokenIdIn: token.id,
    },
  });

  return (
    <Collapse in={isBannerVisible}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1, md: 3 }}
        {...rest}
        sx={{
          p: { xs: 1.5, md: 1 },
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'primary.faded',
          ...rest?.sx,
        }}
      >
        <TokenIcon token={token} sx={{ fontSize: 36 }} />
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
    </Collapse>
  );
};
