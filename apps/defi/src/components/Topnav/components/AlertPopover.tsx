import { Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTxButton } from '@origin/defi/shared';
import { ClickAwayPopover, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
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
      <Stack
        spacing={2}
        sx={{
          p: 3,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => {
            props?.onClose();
          }}
          sx={(theme) => ({
            position: 'absolute',
            top: 8,
            right: 8,
            width: 36,
            height: 36,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          <FaXmarkRegular sx={{ fontSize: 16 }} />
        </IconButton>
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
      spacing={0.5}
      {...rest}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
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
