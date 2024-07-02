import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTxButton } from '@origin/defi/shared';
import { ClickAwayPopover, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaXmarkRegular, PoweredBySafe } from '@origin/shared/icons';
import { TxButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { ClickAwayPopoverProps } from '@origin/shared/components';
import type { Contract, Token } from '@origin/shared/contracts';

export const AlertPopover = (
  props: Omit<ClickAwayPopoverProps, 'children'>,
) => {
  const intl = useIntl();

  return (
    <ClickAwayPopover
      {...props}
      paperProps={{
        sx: {
          minWidth: 350,
          maxWidth: 370,
          mt: 1,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.highlight',
        },
      }}
    >
      <Stack p={3} spacing={2} position="relative">
        <IconButton
          onClick={() => {
            props?.onClose();
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 36,
            height: 36,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 16 }} />
        </IconButton>
        <PoweredBySafe sx={{ width: 1, height: 24, color: 'text.primary' }} />
        <Typography>
          {intl.formatMessage({
            defaultMessage:
              'It looks like you are minting from a contract and have not opted into yield. Contracts must opt-in to receive yield.',
          })}
        </Typography>
      </Stack>
      <Divider />
      <Stack divider={<Divider />}>
        <RebaseRow token={tokens.mainnet.OETH} px={3} py={1.5} />
        <RebaseRow token={tokens.mainnet.OUSD} px={3} py={1.5} />
      </Stack>
    </ClickAwayPopover>
  );
};

type RebaseRowProps = { token: Token } & StackProps;

const RebaseRow = ({ token, ...rest }: RebaseRowProps) => {
  const intl = useIntl();
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
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={0.5}
      {...rest}
    >
      <TokenIcon token={token} sx={{ fontSize: 36 }} />
      <Typography>
        {intl.formatMessage(
          { defaultMessage: 'Enable rebasing for {symbol}' },
          { symbol: token.symbol },
        )}
      </Typography>
      <TxButton
        params={params}
        callbacks={callbacks}
        label={intl.formatMessage({ defaultMessage: 'Opt in' })}
        waitingSignatureLabel={intl.formatMessage({
          defaultMessage: 'Signing',
        })}
      />
    </Stack>
  );
};
