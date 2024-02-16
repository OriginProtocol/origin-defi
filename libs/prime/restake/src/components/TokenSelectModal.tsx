import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { BoostChip } from '@origin/prime/shared';
import { TokenIcon } from '@origin/shared/components';
import { FaCheckRegular } from '@origin/shared/icons';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { TokenOption } from '@origin/shared/providers';

import type { Meta } from '../types';

export type TokenSelectModalProps = {
  tokens: TokenOption<Meta>[];
  onSelectToken: (value: Token) => void;
} & DialogProps;

export const TokenSelectModal = ({
  tokens,
  onSelectToken,
  onClose,
  ...rest
}: TokenSelectModalProps) => {
  const intl = useIntl();

  return (
    <Dialog maxWidth="sm" fullWidth {...rest} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Select a token' })}
      </DialogTitle>
      <MenuList>
        {tokens.map((token, i) => (
          <TokenListItem
            key={`token-${token.address || 'eth'}-${i}`}
            token={token}
            onClick={() => {
              onClose?.({}, 'backdropClick');
              onSelectToken(token);
            }}
            sx={{
              opacity: token.isSwappable ? 1 : 0.5,
            }}
          />
        ))}
      </MenuList>
      <DialogContent>
        <Typography fontWeight="medium">
          {intl.formatMessage({
            defaultMessage: 'More EigenLayer assets coming soon...',
          })}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

type TokenListItemProps = {
  token: TokenOption<Meta>;
} & MenuItemProps;

function TokenListItem({ token, ...rest }: TokenListItemProps) {
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    address,
    token: token.address,
  });

  return (
    <MenuItem
      {...rest}
      sx={{
        display: 'flex',
        px: 3,
        py: 1.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 1.5,
        alignItems: 'center',
        background: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        '&:hover': {
          background: (theme) => theme.palette.action.hover,
        },
        ...rest?.sx,
      }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <TokenIcon symbol={token?.symbol} sx={{ width: 28, height: 28 }} />
        <Stack spacing={0.25}>
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography fontWeight="medium">{token?.name}</Typography>
            <Typography color="text.secondary">{token.symbol}</Typography>
          </Stack>
          {token?.meta?.boost && <BoostChip boost={token.meta.boost} />}
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        {token?.isSelected && (
          <Stack display="flex" justifyContent="center" alignItems="center">
            <FaCheckRegular sx={{ color: '#fff', fontSize: 16 }} />
          </Stack>
        )}
        <Box sx={{ textAlign: 'right' }}>
          <Typography fontWeight={500}>
            {isBalanceLoading ? (
              <Skeleton width={30} />
            ) : (
              formatAmount(balance, token?.decimals)
            )}
          </Typography>
        </Box>
      </Stack>
    </MenuItem>
  );
}
